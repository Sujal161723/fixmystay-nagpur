'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { docToProperty } from '@/models/property';

/**
 * Custom hook for fetching properties from Firestore
 * @param {Object} filters - Filter options
 * @param {string} filters.category - Property category filter
 * @param {string} filters.area - Area filter
 * @param {number} filters.minPrice - Minimum price
 * @param {number} filters.maxPrice - Maximum price
 * @param {string} filters.search - Search term
 * @param {number} filters.pageSize - Number of items per page (default: 10)
 */
export function useProperties(filters = {}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const {
    category,
    area,
    minPrice,
    maxPrice,
    search,
    pageSize = 10,
  } = filters;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        let q = query(collection(db, 'properties'));

        // Build query with filters
        const constraints = [];

        // Category filter
        if (category) {
          constraints.push(where('category', '==', category));
        }

        // Area filter (case-insensitive partial match would need client-side filtering)
        if (area) {
          constraints.push(where('area', '==', area));
        }

        // Price filters
        if (minPrice !== undefined) {
          constraints.push(where('price', '>=', minPrice));
        }
        if (maxPrice !== undefined) {
          constraints.push(where('price', '<=', maxPrice));
        }

        // Status filter - only show approved properties
        constraints.push(where('status', '==', 'approved'));

        // Order by creation date (newest first)
        constraints.push(orderBy('createdAt', 'desc'));

        // Limit page size
        constraints.push(limit(pageSize));

        q = query(collection(db, 'properties'), ...constraints);

        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setProperties([]);
          setHasMore(false);
          setLastVisible(null);
        } else {
          const data = querySnapshot.docs.map(docToProperty);
          setProperties(data);
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
          setHasMore(querySnapshot.docs.length === pageSize);
        }

        // Client-side search filtering (if search term provided)
        if (search && search.trim()) {
          const searchTerm = search.toLowerCase();
          const filtered = data.filter(prop => 
            prop.title?.toLowerCase().includes(searchTerm) ||
            prop.location?.toLowerCase().includes(searchTerm) ||
            prop.area?.toLowerCase().includes(searchTerm) ||
            prop.description?.toLowerCase().includes(searchTerm)
          );
          setProperties(filtered);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(err.message);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [category, area, minPrice, maxPrice, search, pageSize]);

  /**
   * Load more properties (pagination)
   */
  const loadMore = async () => {
    if (!lastVisible || !hasMore) return;

    try {
      let q = query(
        collection(db, 'properties'),
        where('status', '==', 'approved'),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(pageSize)
      );

      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const newProperties = querySnapshot.docs.map(docToProperty);
        setProperties(prev => [...prev, ...newProperties]);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasMore(querySnapshot.docs.length === pageSize);
      }
    } catch (err) {
      console.error('Error loading more properties:', err);
    }
  };

  return {
    properties,
    loading,
    error,
    hasMore,
    loadMore,
    total: properties.length,
  };
}

/**
 * Custom hook for fetching featured properties (limited, sorted by rating)
 */
export function useFeaturedProperties(limitCount = 6) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        setError(null);

        const q = query(
          collection(db, 'properties'),
          where('status', '==', 'approved'),
          orderBy('rating', 'desc'),
          limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(docToProperty);
        setProperties(data);
      } catch (err) {
        console.error('Error fetching featured properties:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, [limitCount]);

  return { properties, loading, error };
}

/**
 * Custom hook for fetching properties by category
 */
export function usePropertiesByCategory(categoryId) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setProperties([]);
      setLoading(false);
      return;
    }

    const fetchByCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const q = query(
          collection(db, 'properties'),
          where('category', '==', categoryId),
          where('status', '==', 'approved'),
          orderBy('createdAt', 'desc'),
          limit(20)
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(docToProperty);
        setProperties(data);
      } catch (err) {
        console.error('Error fetching properties by category:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchByCategory();
  }, [categoryId]);

  return { properties, loading, error };
}

export default {
  useProperties,
  useFeaturedProperties,
  usePropertiesByCategory,
};