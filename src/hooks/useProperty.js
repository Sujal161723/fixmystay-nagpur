'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { docToProperty } from '@/models/property';

/**
 * Custom hook for fetching a single property by ID
 * @param {string} propertyId - The property document ID
 */
export function useProperty(propertyId) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!propertyId) {
      setProperty(null);
      setLoading(false);
      return;
    }

    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);

        const docRef = doc(db, 'properties', propertyId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProperty(docToProperty(docSnap));
        } else {
          setError('Property not found');
          setProperty(null);
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError(err.message);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  return { property, loading, error };
}

/**
 * Custom hook for fetching pending properties (for admin)
 */
export function usePendingProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        setLoading(true);
        setError(null);

        // Note: This requires a composite index on status + createdAt
        // Or we can fetch all and filter client-side for small datasets
        const q = query(
          collection(db, 'properties'),
          where('status', '==', 'pending'),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(docToProperty);
        setProperties(data);
      } catch (err) {
        console.error('Error fetching pending properties:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  return { properties, loading, error };
}

/**
 * Custom hook for fetching property stats (for admin dashboard)
 */
export function usePropertyStats() {
  const [stats, setStats] = useState({
    totalListings: 0,
    pendingApprovals: 0,
    approvedListings: 0,
    rejectedListings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch counts for each status
        const statuses = ['approved', 'pending', 'rejected'];
        const counts = {};

        for (const status of statuses) {
          const q = query(
            collection(db, 'properties'),
            where('status', '==', status)
          );
          const snapshot = await getDocs(q);
          counts[status] = snapshot.size;
        }

        setStats({
          totalListings: Object.values(counts).reduce((a, b) => a + b, 0),
          approvedListings: counts.approved || 0,
          pendingApprovals: counts.pending || 0,
          rejectedListings: counts.rejected || 0,
        });
      } catch (err) {
        console.error('Error fetching property stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

export default {
  useProperty,
  usePendingProperties,
  usePropertyStats,
};