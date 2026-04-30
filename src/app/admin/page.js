'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PropertyForm from '@/components/ui/PropertyForm';
import { usePendingProperties } from '@/hooks/useProperty';
import { usePropertyStats } from '@/hooks/useProperty';
import { Plus, List, CheckCircle, XCircle, Clock, Building2 } from 'lucide-react';

export default function AdminDashboard() {
  const { user, userRole, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const { stats, loading: statsLoading } = usePropertyStats();
  const { properties: pendingProperties, loading: pendingLoading } = usePendingProperties();
  const [actionLoading, setActionLoading] = useState({});

  // Redirect non-admin/non-hotel-owner users
  useEffect(() => {
    if (!authLoading && user && userRole !== 'admin' && userRole !== 'hotel_owner') {
      router.push('/');
    }
  }, [user, userRole, authLoading, router]);

  const handleAction = async (propertyId, action) => {
    try {
      setActionLoading((prev) => ({ ...prev, [propertyId]: true }));

      const propertyRef = doc(db, 'properties', propertyId);
      await updateDoc(propertyRef, {
        status: action === 'approve' ? 'approved' : 'rejected',
        updatedAt: new Date().toISOString(),
      });

      alert(`Property ${action}ed successfully!`);
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property status');
    } finally {
      setActionLoading((prev) => ({ ...prev, [propertyId]: false }));
    }
  };

  const formatPrice = (price, priceType) => {
    if (priceType === 'month') {
      return `Rs. ${price?.toLocaleString('en-IN')}/month`;
    } else if (priceType === 'night') {
      return `Rs. ${price?.toLocaleString('en-IN')}/night`;
    } else {
      return `Rs. ${price?.toLocaleString('en-IN')}`;
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authorized
  if (!user || (userRole !== 'admin' && userRole !== 'hotel_owner')) {
    return null;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: List },
    { id: 'pending', label: 'Pending Approvals', icon: Clock, count: pendingProperties.length },
    { id: 'add', label: 'Add Property', icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-black text-slate-800">
              {userRole === 'admin' ? 'ADMIN DASHBOARD' : 'PROPERTY MANAGER'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground italic">
              {user?.displayName || user?.email}
            </span>
            {userRole === 'admin' && (
              <span className="text-[10px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Admin
              </span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="container-custom">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'bg-accent text-muted-foreground'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsLoading
                ? [1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm animate-pulse"
                    >
                      <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                      <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                    </div>
                  ))
                : (
                    <>
                      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
                          Total Listings
                        </p>
                        <p className="text-3xl font-black text-slate-900">
                          {stats.totalListings?.toLocaleString() || '0'}
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
                          Approved
                        </p>
                        <p className="text-3xl font-black text-green-600">
                          {stats.approvedListings?.toLocaleString() || '0'}
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
                          Pending
                        </p>
                        <p className="text-3xl font-black text-orange-600">
                          {stats.pendingApprovals?.toLocaleString() || '0'}
                        </p>
                      </div>
                      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
                          Rejected
                        </p>
                        <p className="text-3xl font-black text-red-600">
                          {stats.rejectedListings?.toLocaleString() || '0'}
                        </p>
                      </div>
                    </>
                  )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setActiveTab('add')}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Add New Property</h3>
                    <p className="text-sm text-muted-foreground">
                      List a new hotel, PG, room, or real estate property
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('pending')}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Review Pending</h3>
                    <p className="text-sm text-muted-foreground">
                      {pendingProperties.length} properties awaiting approval
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Pending Approvals Tab */}
        {activeTab === 'pending' && (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-bold text-slate-800">Pending Property Approvals</h2>
              <span className="text-sm text-muted-foreground">
                {pendingProperties.length} properties
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500">
                  <tr>
                    <th className="p-4 border-b border-slate-100">Property Name</th>
                    <th className="p-4 border-b border-slate-100">Type</th>
                    <th className="p-4 border-b border-slate-100">Location</th>
                    <th className="p-4 border-b border-slate-100">Price</th>
                    <th className="p-4 border-b border-slate-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {pendingLoading ? (
                    [1, 2, 3].map((i) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-50/50 transition-colors animate-pulse"
                      >
                        <td className="p-4 border-b border-slate-50">
                          <div className="h-4 bg-slate-200 rounded w-32"></div>
                        </td>
                        <td className="p-4 border-b border-slate-50">
                          <div className="h-4 bg-slate-200 rounded w-20"></div>
                        </td>
                        <td className="p-4 border-b border-slate-50">
                          <div className="h-4 bg-slate-200 rounded w-24"></div>
                        </td>
                        <td className="p-4 border-b border-slate-50">
                          <div className="h-4 bg-slate-200 rounded w-20"></div>
                        </td>
                        <td className="p-4 border-b border-slate-50 text-right">
                          <div className="flex gap-2 justify-end">
                            <div className="h-6 bg-slate-200 rounded w-16"></div>
                            <div className="h-6 bg-slate-200 rounded w-16"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : pendingProperties.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-muted-foreground">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                        <p className="font-medium">No pending approvals!</p>
                        <p className="text-sm mt-1">All properties have been reviewed.</p>
                      </td>
                    </tr>
                  ) : (
                    pendingProperties.map((property) => (
                      <tr
                        key={property.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="p-4 border-b border-slate-50 font-bold text-slate-700">
                          {property.title}
                        </td>
                        <td className="p-4 border-b border-slate-50 text-slate-600 italic capitalize">
                          {property.category}
                        </td>
                        <td className="p-4 border-b border-slate-50 text-slate-600">
                          {property.area || property.location || 'Nagpur'}
                        </td>
                        <td className="p-4 border-b border-slate-50 font-bold text-slate-900">
                          {formatPrice(property.price, property.priceType)}
                        </td>
                        <td className="p-4 border-b border-slate-50 text-right">
                          <button
                            onClick={() => handleAction(property.id, 'approve')}
                            disabled={actionLoading[property.id]}
                            className="text-green-600 font-bold mr-4 text-xs uppercase tracking-widest hover:text-green-700 disabled:opacity-50 inline-flex items-center gap-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            {actionLoading[property.id] ? '...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => handleAction(property.id, 'reject')}
                            disabled={actionLoading[property.id]}
                            className="text-red-600 font-bold text-xs uppercase tracking-widest hover:text-red-700 disabled:opacity-50 inline-flex items-center gap-1"
                          >
                            <XCircle className="w-3 h-3" />
                            {actionLoading[property.id] ? '...' : 'Reject'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Property Tab */}
        {activeTab === 'add' && (
          <div className="max-w-4xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">Add New Property</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Fill in the details below to list a new property. It will require admin approval before going live.
              </p>
            </div>
            <PropertyForm />
          </div>
        )}
      </main>
    </div>
  );
}