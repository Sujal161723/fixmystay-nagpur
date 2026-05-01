import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

// Extend Window interface for recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "your-sender-id",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "your-app-id",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "your-measurement-id"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// Types
export interface Property {
  id?: string;
  name: string;
  description: string;
  category: 'hotel' | 'pg' | 'flat' | 'resort' | 'villa' | 'farmhouse' | 'marriage_hall';
  location: {
    city: string;
    state: string;
    address: string;
    lat?: number;
    lng?: number;
  };
  price: number;
  images: string[];
  amenities: string[];
  rooms?: number;
  guests?: number;
  vendorId: string;
  status: 'pending' | 'active' | 'inactive' | 'rejected';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Booking {
  id?: string;
  propertyId: string;
  userId: string;
  guestName: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Timestamp;
}

export interface Inquiry {
  id?: string;
  propertyId: string;
  userId?: string;
  name: string;
  phone: string;
  message: string;
  status: 'pending' | 'replied' | 'closed';
  createdAt: Timestamp;
}

export interface PartnerRequest {
  id?: string;
  name: string;
  phone: string;
  city: string;
  propertyType: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  assignedStaffId?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface AppUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'user' | 'vendor' | 'staff';
  location?: {
    city: string;
    state: string;
  };
  createdAt: Timestamp;
}

// Property Services
export const propertyService = {
  async createProperty(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) {
    const docRef = await addDoc(collection(db, 'properties'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  async getPropertiesByLocation(city: string) {
    const q = query(
      collection(db, 'properties'),
      where('location.city', '==', city),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
  },

  async getPropertyById(id: string) {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Property : null;
  },

  async updateProperty(id: string, data: Partial<Property>) {
    const docRef = doc(db, 'properties', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  async deleteProperty(id: string) {
    await deleteDoc(doc(db, 'properties', id));
  },

  async getVendorProperties(vendorId: string) {
    const q = query(
      collection(db, 'properties'),
      where('vendorId', '==', vendorId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
  },

  async getAllProperties() {
    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
  },

  async searchProperties(city?: string, category?: string) {
    let q = query(collection(db, 'properties'), where('status', '==', 'active'));
    
    if (city) {
      q = query(q, where('location.city', '==', city));
    }
    if (category) {
      q = query(q, where('category', '==', category));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
  },
};

// Booking Services
export const bookingService = {
  async createBooking(data: Omit<Booking, 'id' | 'createdAt'>) {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...data,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  },

  async getUserBookings(userId: string) {
    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
  },

  async getVendorBookings(vendorId: string) {
    const properties = await propertyService.getVendorProperties(vendorId);
    const propertyIds = properties.map(p => p.id);
    
    const bookings: Booking[] = [];
    for (const propertyId of propertyIds) {
      const q = query(collection(db, 'bookings'), where('propertyId', '==', propertyId));
      const snapshot = await getDocs(q);
      bookings.push(...snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking)));
    }
    return bookings;
  },

  async updateBookingStatus(id: string, status: Booking['status']) {
    const docRef = doc(db, 'bookings', id);
    await updateDoc(docRef, { status });
  },
};

// Inquiry Services
export const inquiryService = {
  async createInquiry(data: Omit<Inquiry, 'id' | 'createdAt'>) {
    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...data,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  },

  async getPropertyInquiries(propertyId: string) {
    const q = query(
      collection(db, 'inquiries'),
      where('propertyId', '==', propertyId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
  },

  async updateInquiryStatus(id: string, status: Inquiry['status']) {
    const docRef = doc(db, 'inquiries', id);
    await updateDoc(docRef, { status });
  },
};

// Partner Request Services
export const partnerService = {
  async createPartnerRequest(data: Omit<PartnerRequest, 'id' | 'createdAt'>) {
    const docRef = await addDoc(collection(db, 'partner_requests'), {
      ...data,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  },

  async getAllPartnerRequests() {
    const q = query(
      collection(db, 'partner_requests'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PartnerRequest));
  },

  async updatePartnerRequestStatus(id: string, status: PartnerRequest['status'], staffId?: string) {
    const docRef = doc(db, 'partner_requests', id);
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now(),
      ...(staffId && { assignedStaffId: staffId }),
    });
  },
};

// Auth Services
export const authService = {
  async signInWithPhone(phoneNumber: string, recaptchaContainer: string) {
    if (!auth.app) throw new Error('Firebase app not initialized');
    
    // RecaptchaVerifier is automatically attached to auth
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );
    return confirmationResult;
  },

  async verifyOTP(confirmationResult: any, code: string) {
    const result = await confirmationResult.confirm(code);
    return result.user;
  },

  async signOut() {
    await signOut(auth);
  },

  onAuthChange(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser() {
    return auth.currentUser;
  },
};

// Location Service
export const locationService = {
  async detectUserLocation(): Promise<{ city: string; state: string } | null> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.city && data.region) {
        return {
          city: data.city,
          state: data.region,
        };
      }
      return null;
    } catch (error) {
      console.error('Location detection failed:', error);
      return null;
    }
  },

  async getBrowserLocation(): Promise<{ city: string; state: string } | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
            );
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              const components = data.results[0].components;
              resolve({
                city: components.city || components.town || components.village,
                state: components.state,
              });
            } else {
              resolve(null);
            }
          } catch (error) {
            resolve(null);
          }
        },
        () => resolve(null)
      );
    });
  },
};

export { db, auth };
export default app;