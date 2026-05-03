'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProfile {
  displayName?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  role?: 'user' | 'vendor' | 'staff';
  kycStatus?: 'pending' | 'approved' | 'rejected';
  [key: string]: any;
}

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  userRole: string | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, role: string, phoneNumber?: string) => Promise<{ success: boolean; user?: FirebaseUser; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; user?: FirebaseUser; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateUserProfile: (uid: string, updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  submitKYC: (uid: string, kycData: any) => Promise<{ success: boolean; error?: string }>;
  hasRole: (requiredRole: string) => boolean;
  isKYCVerified: () => boolean;
  isStaff: boolean;
  isVendor: boolean;
  isUser: boolean;
  isAdmin: boolean;
  isHotelOwner: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = useCallback(async (email: string, password: string, firstName: string, lastName: string, role: string, phoneNumber: string = '') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, {
        displayName: `${firstName} ${lastName}`,
      });

      const userData: UserProfile = {
        email: firebaseUser.email || undefined,
        firstName,
        lastName,
        displayName: `${firstName} ${lastName}`,
        role: role as 'user' | 'vendor' | 'staff',
        phoneNumber: phoneNumber || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isEmailVerified: firebaseUser.emailVerified,
      };

      if (role === 'vendor') {
        userData.kycStatus = 'pending';
        userData.kycDetails = null;
        userData.propertiesCount = 0;
      }

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      await sendEmailVerification(firebaseUser);

      return { success: true, user: firebaseUser };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserRole(null);
      setUserProfile(null);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, []);

  const fetchUserProfile = useCallback(async (uid: string) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }, []);

  const updateUserProfile = useCallback(async (uid: string, updates: Partial<UserProfile>) => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, []);

  const submitKYC = useCallback(async (uid: string, kycData: any) => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        kycStatus: 'pending',
        kycDetails: kycData,
        updatedAt: new Date().toISOString(),
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, []);

  const hasRole = useCallback((requiredRole: string) => {
    if (!userRole) return false;
    if (userRole === 'staff') return true;
    return userRole === requiredRole;
  }, [userRole]);

  const isKYCVerified = useCallback(() => {
    if (!userProfile) return false;
    return userProfile.kycStatus === 'approved';
  }, [userProfile]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const profile = await fetchUserProfile(firebaseUser.uid);
        if (profile) {
          setUserRole(profile.role || null);
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

  const isStaff = userRole === 'staff';
  const isVendor = userRole === 'vendor';
  const isUser = userRole === 'user';

  const value: AuthContextType = {
    user,
    userProfile,
    userRole,
    loading,
    signUp,
    signIn,
    logout,
    resetPassword,
    updateUserProfile,
    submitKYC,
    hasRole,
    isKYCVerified,
    isStaff,
    isVendor,
    isUser,
    isAdmin: userRole === 'staff',
    isHotelOwner: userRole === 'vendor',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}