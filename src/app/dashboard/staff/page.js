'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Users, Building, ClipboardList, CheckCircle, XCircle, 
  Clock, Search, Filter, TrendingUp, AlertCircle 
} from 'lucide-react';

export default function StaffDashboard() {
  const { user, userRole, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    pendingProperties: 0,
    pendingInquiries: 0,
    totalBookings: 0,
  });
  const [pendingProperties, setPendingProperties] = useState([]);
  const [pendingInquiries, setPendingInquiries] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  // Redirect non-staff users
  useEffect(() => {
    if (!authLoading && user && userRole !== 'staff') {
      router.push('/');
    }
  }, [user, userRole, authLoading, router]);

  // Fetch dashboard data
  useEffect(() => {
    if (userRole === 'staff') {
      fetchDashboardData();
    }
  }, [userRole]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch users count
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const vendorCount = usersData.filter(u => u.role === 'vendor').length;
      const userCount = usersData.filter(u => u.role === 'user').length;

      // Fetch pending properties
      const pendingPropsQuery = query(
        collection(db, 'properties'),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      const pendingPropsSnapshot = await getDocs(pendingPropsQuery);
      const pendingPropsData = pendingPropsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch pending inquiries
      const inquiriesQuery = query(
        collection(db, 'inquiries'),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
      );
      const inquiriesSnapshot = await getDocs(inquiriesQuery);
      const inquiriesData = inquiriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch vendors with pending KYC
      const pendingKYCVendors = usersData.filter(u => u.role === 'vendor' && u.kycStatus === 'pending');

      setStats({
        totalUsers: userCount,
        totalVendors: vendorCount,
        pendingProperties: pendingPropsData.length,
        pendingInquiries: inquiriesData.length,
      });

      setPendingProperties(pendingPropsData);
      setPendingInquiries(inquiriesData);
      setVendors(pendingKYCVendors);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyAction = async (propertyId, action) => {
    try {
      setActionLoading((prev) => ({ ...prev, [propertyId]: true }));

      const propertyRef = doc(db, 'properties', propertyId);
      await updateDoc(propertyRef, {
        status: action === 'approve' ? 'approved' : 'rejected',
        updatedAt: new Date().toISOString(),
      });

      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating property:', error);
    } finally {
      setActionLoading((prev) => ({ ...prev, [propertyId]: false }));
    }
  };

  const handleKYCAction = async (vendorId, action) => {
    try {
      setActionLoading((prev) => ({ ...prev, [vendorId]: true }));

      const vendorRef = doc(db, 'users', vendorId);
      await updateDoc(vendorRef, {
        kycStatus: action === 'approve' ? 'approved' : 'rejected',
        updatedAt: new Date().toISOString(),
      });

      fetchDashboardData();
    } catch (error) {
      console.error('Error updating KYC status:', error);
    } finally {
      setActionLoading((prev) => ({ ...prev, [vendorId]: false }));
    }
  };

  if (authLoading || (user && userRole !== 'staff')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'properties', label: 'Properties', icon: Building, count: stats.pendingProperties },
    { id: 'inquiries', label: 'Inquiries', icon: ClipboardList, count: stats.pendingInquiries },
    { id: 'vendors', label: 'Vendors', icon: Users, count: vendors.length },
  ];

  return (
    <div className="min-h-screen bg-accent/30">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-20 z-30">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-black text-slate-800">STAFF DASHBOARD</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{user?.displayName}</span>
            <span className="badge badge-primary text-xs">Staff</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="container-custom">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'bg-accent text-muted-foreground'
                    }`}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Total Users</p>
                    <p className="text-2xl font-black text-slate-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Vendors</p>
                    <p className="text-2xl font-black text-slate-900">{stats.totalVendors}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Pending Reviews</p>
                    <p className="text-2xl font-black text-slate-900">{stats.pendingProperties + stats.pendingInquiries}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Pending KYC</p>
                    <p className="text-2xl font-black text-slate-900">{vendors.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setActiveTab('properties')}
                className="glass-card p-6 hover:shadow-medium transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <Building className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Review Properties</h3>
                    <p className="text-sm text-muted-foreground">
                      {stats.pendingProperties} properties awaiting approval
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className="glass-card p-6 hover:shadow-medium transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <ClipboardList className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Manage Inquiries</h3>
                    <p className="text-sm text-muted-foreground">
                      {stats.pendingInquiries} inquiries to review
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-bold text-slate-800">Pending Property Approvals</h2>
            </div>
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : pendingProperties.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-medium">No pending properties!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-accent text-xs font-black uppercase text-muted-foreground">
                    <tr>
                      <th className="p-4">Property</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Price</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-border">
                    {pendingProperties.map((property) => (
                      <tr key={property.id} className="hover:bg-accent/50">
                        <td className="p-4 font-bold">{property.title}</td>
                        <td className="p-4 capitalize">{property.category}</td>
                        <td className="p-4 text-muted-foreground">{property.area}</td>
                        <td className="p-4 font-bold">₹{property.price?.toLocaleString()}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handlePropertyAction(property.id, 'approve')}
                            disabled={actionLoading[property.id]}
                            className="text-green-600 font-bold text-xs uppercase mr-3 hover:underline disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handlePropertyAction(property.id, 'reject')}
                            disabled={actionLoading[property.id]}
                            className="text-red-600 font-bold text-xs uppercase hover:underline disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-bold text-slate-800">Pending Inquiries</h2>
            </div>
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : pendingInquiries.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-medium">No pending inquiries!</p>
              </div>
            ) : (
              <div className="space-y-4 p-6">
                {pendingInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border border-border rounded-xl p-4 hover:shadow-medium transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-slate-800">{inquiry.userName}</p>
                        <p className="text-sm text-muted-foreground">{inquiry.userEmail}</p>
                      </div>
                      <span className="badge badge-warning text-xs">Pending</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{inquiry.message}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>Property: {inquiry.propertyTitle}</span>
                      <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === 'vendors' && (
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-bold text-slate-800">Vendor KYC Verification</h2>
            </div>
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : vendors.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-medium">No pending KYC verifications!</p>
              </div>
            ) : (
              <div className="space-y-4 p-6">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="border border-border rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-slate-800">{vendor.displayName}</p>
                        <p className="text-sm text-muted-foreground">{vendor.email}</p>
                        {vendor.phoneNumber && (
                          <p className="text-sm text-muted-foreground">{vendor.phoneNumber}</p>
                        )}
                      </div>
                      <span className="badge badge-warning text-xs">KYC Pending</span>
                    </div>
                    {vendor.kycDetails && (
                      <div className="bg-accent rounded-lg p-3 mb-3">
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">KYC Details</p>
                        <p className="text-sm">Name: {vendor.kycDetails.name}</p>
                        <p className="text-sm">ID Type: {vendor.kycDetails.idType}</p>
                        <p className="text-sm">ID Number: {vendor.kycDetails.idNumber}</p>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleKYCAction(vendor.id, 'approve')}
                        disabled={actionLoading[vendor.id]}
                        className="btn-primary py-2 px-4 text-sm disabled:opacity-50"
                      >
                        Approve KYC
                      </button>
                      <button
                        onClick={() => handleKYCAction(vendor.id, 'reject')}
                        disabled={actionLoading[vendor.id]}
                        className="btn-outline py-2 px-4 text-sm disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function Shield({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}