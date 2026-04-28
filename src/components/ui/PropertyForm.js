'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import ImageUpload from './ImageUpload';
import { Plus, X, Check } from 'lucide-react';

const categories = [
  { id: 'hotel', label: 'Hotel' },
  { id: 'pg', label: 'PG Stay' },
  { id: 'room', label: 'Room' },
  { id: 'real-estate', label: 'Real Estate' },
];

const priceTypes = [
  { id: 'night', label: 'Per Night' },
  { id: 'month', label: 'Per Month' },
  { id: 'total', label: 'Total Price' },
];

const amenityOptions = [
  { id: 'wifi', label: 'WiFi' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'parking', label: 'Parking' },
  { id: 'pool', label: 'Swimming Pool' },
  { id: 'gym', label: 'Gym' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'room-service', label: 'Room Service' },
  { id: 'laundry', label: 'Laundry' },
  { id: 'security', label: '24/7 Security' },
  { id: 'power-backup', label: 'Power Backup' },
  { id: 'water-supply', label: '24/7 Water Supply' },
  { id: 'housekeeping', label: 'Housekeeping' },
];

export default function PropertyForm() {
  const router = useRouter();
  const { user, userRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'hotel',
    price: '',
    priceType: 'night',
    location: '',
    area: '',
    city: 'Nagpur',
    state: 'Maharashtra',
    amenities: [],
    images: [],
    contactPhone: '',
    contactEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenityId) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((a) => a !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title.trim()) {
      setError('Property title is required');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Valid price is required');
      return;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return;
    }
    if (formData.images.length === 0) {
      setError('At least one image is required');
      return;
    }

    setLoading(true);

    try {
      const propertyData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        priceType: formData.priceType,
        location: formData.location.trim(),
        area: formData.area.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        amenities: formData.amenities,
        images: formData.images,
        coverImage: formData.images[0]?.url,
        contactPhone: formData.contactPhone.trim(),
        contactEmail: formData.contactEmail.trim(),
        ownerId: user?.uid,
        ownerEmail: user?.email,
        ownerName: user?.displayName,
        status: 'pending', // Requires admin approval
        featured: false,
        available: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'properties'), propertyData);

      setSuccess('Property submitted successfully! It will be reviewed by admin.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'hotel',
        price: '',
        priceType: 'night',
        location: '',
        area: '',
        city: 'Nagpur',
        state: 'Maharashtra',
        amenities: [],
        images: [],
        contactPhone: '',
        contactEmail: '',
      });

      // Redirect after success
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } catch (err) {
      console.error('Error adding property:', err);
      setError('Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3">
          <Check className="w-5 h-5" />
          <span>{success}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white border border-border rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-800">Basic Information</h3>

        <div>
          <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
            Property Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Luxury 2BHK Apartment in Dharampeth"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your property..."
            rows={4}
            className="input-field resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
                className="input-field"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
                Price Type *
              </label>
              <select
                name="priceType"
                value={formData.priceType}
                onChange={handleChange}
                className="input-field"
              >
                {priceTypes.map((pt) => (
                  <option key={pt.id} value={pt.id}>
                    {pt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white border border-border rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-800">Location</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              Area/Locality *
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="e.g., Dharampeth, Sitabuldi"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              Landmark/Address *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Near City Center Mall"
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white border border-border rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-800">Property Images</h3>
        <ImageUpload
          value={formData.images}
          onChange={(images) => setFormData((prev) => ({ ...prev, images }))}
          maxImages={5}
          label="Upload Property Photos *"
        />
      </div>

      {/* Amenities */}
      <div className="bg-white border border-border rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-800">Amenities</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {amenityOptions.map((amenity) => (
            <label
              key={amenity.id}
              className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${
                formData.amenities.includes(amenity.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity.id)}
                onChange={() => toggleAmenity(amenity.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded flex items-center justify-center border ${
                  formData.amenities.includes(amenity.id)
                    ? 'bg-primary border-primary'
                    : 'border-border'
                }`}
              >
                {formData.amenities.includes(amenity.id) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span
                className={`text-sm ${
                  formData.amenities.includes(amenity.id)
                    ? 'text-primary font-bold'
                    : 'text-muted-foreground'
                }`}
              >
                {amenity.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white border border-border rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-slate-800">Contact Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              Contact Phone
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="contact@property.com"
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-outline py-3 px-6 rounded-xl font-bold"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary py-3 px-8 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Property'}
        </button>
      </div>
    </form>
  );
}