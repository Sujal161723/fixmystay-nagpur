/**
 * Cloudinary Upload Utility
 * 
 * This module provides secure image upload functionality using Cloudinary's
 * unsigned upload API. The upload preset must be configured in Cloudinary
 * dashboard with unsigned mode enabled.
 * 
 * SECURITY NOTES:
 * - Uses unsigned upload (no API secret required on frontend)
 * - Upload preset must be configured in Cloudinary dashboard
 * - Validation rules should be set in Cloudinary dashboard
 * - Never expose Cloudinary API secret on frontend
 */

// Cloudinary configuration from environment variables
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

// Validation
if (!CLOUDINARY_CLOUD_NAME) {
  console.warn('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not configured');
}
if (!CLOUDINARY_UPLOAD_PRESET) {
  console.warn('NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is not configured');
}

export interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

/**
 * Upload an image to Cloudinary using unsigned upload
 * @param file - The image file to upload
 * @param onProgress - Optional callback for upload progress
 * @returns Upload result with URL and public ID
 */
export async function uploadImage(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  // Validate configuration
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    return {
      success: false,
      error: 'Cloudinary configuration is missing. Please configure environment variables.',
    };
  }

  // Validate file
  if (!file) {
    return {
      success: false,
      error: 'No file provided',
    };
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return {
      success: false,
      error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.',
    };
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      success: false,
      error: 'File size exceeds 10MB limit.',
    };
  }

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    // Optional: Add folder and tags for organization
    formData.append('folder', 'fixmystay/listings');
    formData.append('tags', 'property,image');

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error?.message || 'Upload failed',
      };
    }

    const data = await response.json();

    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of image files
 * @param onFileProgress - Optional callback for individual file progress
 * @returns Array of upload results
 */
export async function uploadMultipleImages(
  files: File[],
  onFileProgress?: (index: number, progress: UploadProgress) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const result = await uploadImage(files[i], (progress) => {
      onFileProgress?.(i, progress);
    });
    results.push(result);
  }

  return results;
}

/**
 * Generate Cloudinary image URL with transformations
 * @param publicId - The public ID of the uploaded image
 * @param transformations - Optional transformation parameters
 * @returns Transformed image URL
 */
export function getTransformedUrl(
  publicId: string,
  transformations: {
    width?: number;
    height?: number;
    quality?: string;
    crop?: string;
  } = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    return '';
  }

  const transforms: string[] = [];

  if (transformations.width) transforms.push(`w_${transformations.width}`);
  if (transformations.height) transforms.push(`h_${transformations.height}`);
  if (transformations.quality) transforms.push(`q_${transformations.quality}`);
  if (transformations.crop) transforms.push(`c_${transformations.crop}`);

  const transformationString = transforms.length > 0 
    ? transforms.join(',') + '/' 
    : '';

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformationString}${publicId}`;
}

/**
 * Delete an image from Cloudinary
 * NOTE: This requires server-side implementation with API secret
 * This function signature is for reference - actual deletion should be done via API route
 */
export async function deleteImage(publicId: string): Promise<{ success: boolean; error?: string }> {
  // This should be implemented as a server-side API route
  // Never expose API secret on frontend
  return {
    success: false,
    error: 'Image deletion must be performed server-side for security',
  };
}

export default {
  uploadImage,
  uploadMultipleImages,
  getTransformedUrl,
  deleteImage,
};