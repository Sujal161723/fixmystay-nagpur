'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const AuthContext = createContext({});

/**
 * User Roles:
 * - 'staff': Super Admin/Staff - Full access to manage users, listings, and bookings
 * - 'vendor': Hotel/Property Owners - Can add and manage their properties (requires KYC)
 * - 'user': Regular Users - Can browse, search, book, and send inquiries
 */

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email, password, and role
  const signUp = useCallback(async (email, password, firstName, lastName, role, phoneNumber = '') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update user profile with display name
      await updateProfile(firebaseUser, {
        displayName: `${firstName} ${lastName}`,
      });

      // Prepare user data for Firestore
      const userData = {
        email: firebaseUser.email,
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`,
        role,
        phoneNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isEmailVerified: firebaseUser.emailVerified,
      };

      // For vendors, add KYC status
      if (role === 'vendor') {
        userData.kycStatus = 'pending';
        userData.kycDetails = null;
        userData.propertiesCount = 0;
      }

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);

      // Send email verification
      await sendEmailVerification(firebaseUser);

      return { success: true, user: firebaseUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Sign in with email and password
  const signIn = useCallback(async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Sign out
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      setUserProfile(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Password reset
  const resetPassword = useCallback(async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Fetch user profile from Firestore
  const fetchUserProfile = useCallback(async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }, []);

  // Update user profile
  const updateUserProfile = useCallback(async (uid, updates) => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Submit KYC details for vendors
  const submitKYC = useCallback(async (uid, kycData) => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        kycStatus: 'pending',
        kycDetails: kycData,
        updatedAt: new Date().toISOString(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Check if user has specific role
  const hasRole = useCallback((requiredRole) => {
    if (!userRole) return false;
    if (userRole === 'staff') return true; // Staff has all access
    return userRole === requiredRole;
  }, [userRole]);

  // Check if vendor is KYC verified
  const isKYCVerified = useCallback(() => {
    if (!userProfile) return false;
    return userProfile.kycStatus === 'approved';
  }, [userProfile]);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const profile = await fetchUserProfile(firebaseUser.uid);
        if (profile) {
          setUserRole(profile.role);
          setUserProfile(profile);
        }
      } else {
        setUser(null);
        setUserRole(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchUserProfile]);

  // Role check helpers
  const isStaff = userRole === 'staff';
  const isVendor = userRole === 'vendor';
  const isUser = userRole === 'user';

  const value = {
    user,
    userRole,
    userProfile,
    loading,
    signUp,
    signIn,
    logout,
    resetPassword,
    hasRole,
    isKYCVerified,
    updateUserProfile,
    submitKYC,
    // Role flags
    isStaff,
    isVendor,
    isUser,
    // Legacy support
    isAdmin: userRole === 'staff',
    isHotelOwner: userRole === 'vendor',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}