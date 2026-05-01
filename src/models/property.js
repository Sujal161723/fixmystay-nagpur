/**
 * Property Data Model for FixMyStay
 * Defines the structure for properties in Firestore
 */

/**
 * @typedef {'hotel' | 'pg' | 'room' | 'real-estate'} PropertyCategory
 */

/**
 * @typedef {'month' | 'night' | 'sale'} PriceType
 */

/**
 * @typedef {'pending' | 'approved' | 'rejected'} PropertyStatus
 */

/**
 * @typedef {Object} Property
 * @property {string} id - Unique document ID
 * @property {string} title - Property title
 * @property {string} description - Detailed description
 * @property {string} location - General location (e.g., "Near IT Park")
 * @property {string} area - Specific area in Nagpur (e.g., "Dharampeth, Nagpur")
 * @property {number} price - Price amount
 * @property {PriceType} priceType - Type of pricing
 * @property {PropertyCategory} category - Property category
 * @property {string} imageUrl - Main image URL
 * @property {string[]} images - Array of image URLs
 * @property {string[]} amenities - List of amenities
 * @property {number} rating - Average rating (0-5)
 * @property {number} reviews - Number of reviews
 * @property {boolean} isVerified - Verification status
 * @property {PropertyStatus} status - Approval status
 * @property {number} bedrooms - Number of bedrooms (optional)
 * @property {number} bathrooms - Number of bathrooms (optional)
 * @property {number} area_sqft - Area in square feet (optional)
 * @property {string} contactPhone - Contact phone number
 * @property {string} contactEmail - Contact email
 * @property {number} latitude - Latitude for map (optional)
 * @property {number} longitude - Longitude for map (optional)
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 * @property {string} createdBy - User ID of creator
 */

/**
 * Default Nagpur areas for placeholders and defaults
 */
export const NAGPUR_AREAS = [
  'Dharampeth',
  'Sitabuldi',
  'Sadar',
  'Civil Lines',
  'Wardha Road',
  'Shankar Nagar',
  'Laxmi Nagar',
  'Dhantoli',
  'Gokulpeth',
  'Itwari',
  'Mahal',
  'Gandhibagh',
  'Manish Nagar',
  'Khamla',
  'Hingna Road',
];

/**
 * Default property categories
 */
export const PROPERTY_CATEGORIES = [
  { id: 'hotel', name: 'Hotels', desc: 'Daily booking' },
  { id: 'pg', name: 'PG', desc: 'Monthly stay' },
  { id: 'room', name: 'Rooms', desc: 'Rent' },
  { id: 'real-estate', name: 'Real Estate', desc: 'Rent/Sale' },
];

/**
 * Common amenities in Nagpur properties
 */
export const COMMON_AMENITIES = [
  'WiFi',
  'AC',
  'Meals',
  'Parking',
  'Power Backup',
  'Water Supply 24/7',
  'Security',
  'CCTV',
  'Housekeeping',
  'Laundry',
  'Gym',
  'Swimming Pool',
  'Elevator',
  'Balcony',
  'Kitchen',
  'Refrigerator',
  'TV',
  'Washing Machine',
];

/**
 * Convert Firestore document to Property object
 * @param {Object} doc - Firestore document snapshot
 * @returns {Property}
 */
export const docToProperty = (doc) => ({
  id: doc.id,
  ...doc.data(),
});

/**
 * Validate a property object
 * @param {Partial<Property>} property
 * @returns {{ valid: boolean, errors: string[] }}
 */
export const validateProperty = (property) => {
  const errors = [];
  
  if (!property.title || property.title.trim().length === 0) {
    errors.push('Title is required');
  }
  
  if (!property.location || property.location.trim().length === 0) {
    errors.push('Location is required');
  }
  
  if (!property.area || property.area.trim().length === 0) {
    errors.push('Area is required');
  }
  
  if (!property.price || property.price <= 0) {
    errors.push('Price must be greater than 0');
  }
  
  if (!property.priceType) {
    errors.push('Price type is required');
  }
  
  if (!property.category) {
    errors.push('Category is required');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

export default {
  NAGPUR_AREAS,
  PROPERTY_CATEGORIES,
  COMMON_AMENITIES,
  docToProperty,
  validateProperty,
};