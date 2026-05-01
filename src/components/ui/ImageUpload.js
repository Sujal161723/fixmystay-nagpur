'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image, Loader2 } from 'lucide-react';

export default function ImageUpload({
  value = [],
  onChange,
  maxImages = 5,
  label = 'Property Images',
  helperText = 'Upload up to 5 images (JPG, PNG, WebP - Max 5MB each)',
  multiple = true,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const currentImages = Array.isArray(value) ? value : [];
  const canUpload = multiple ? currentImages.length < maxImages : currentImages.length === 0;

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Validate file count
    if (!multiple && files.length > 1) {
      setError('Only one image is allowed');
      return;
    }

    if (multiple && currentImages.length + files.length > maxImages) {
      setError(`You can only upload ${maxImages - currentImages.length} more image(s)`);
      return;
    }

    // Validate file size (5MB max)
    const oversized = files.find((f) => f.size > 5 * 1024 * 1024);
    if (oversized) {
      setError(`${oversized.name} is larger than 5MB`);
      return;
    }

    // Validate file type
    const invalidType = files.find(
      (f) => !f.type.startsWith('image/')
    );
    if (invalidType) {
      setError(`${invalidType.name} is not a valid image file`);
      return;
    }

    setError('');
    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'PUT',
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Upload failed');
        }

        return {
          url: result.url,
          publicId: result.publicId,
          width: result.width,
          height: result.height,
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const newImages = [...currentImages, ...uploadedImages];
      onChange(newImages);
    } catch (err) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index) => {
    const newImages = currentImages.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-xs font-black uppercase text-muted-foreground">
          {label}
        </label>
      )}

      {/* Upload Area */}
      {canUpload && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            uploading
              ? 'border-primary/50 bg-primary/5'
              : 'border-gray-200 hover:border-primary hover:bg-accent/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-primary font-medium">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm font-medium text-gray-700">
                Click to upload {multiple ? 'images' : 'image'}
              </p>
              <p className="text-xs text-muted-foreground">{helperText}</p>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 font-medium">{error}</p>
      )}

      {/* Image Previews */}
      {currentImages.length > 0 && (
        <div
          className={`grid gap-3 ${
            multiple ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : 'grid-cols-1'
          }`}
        >
          {currentImages.map((image, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200"
            >
              <img
                src={image.url}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
              {index === 0 && (
                <span className="absolute bottom-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}