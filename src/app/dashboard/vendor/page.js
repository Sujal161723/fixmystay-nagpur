'use client';

import { useState, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Building, Plus, List, Edit, Trash2, CheckCircle, XCircle, 
  Clock, DollarSign, Users, AlertCircle, Upload, Image,
  Calendar, Phone, TrendingUp, BarChart3, FileText, Shield,
  ChevronLeft, ChevronRight, Search, Filter, Download
} from 'lucide-react';
import PropertyForm from '@/components/ui/PropertyForm';

export default function VendorDashboard() {
  const { user, userRole, isKYCVerified, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    approvedProperties: 0,
    pendingProperties: 0,
    rejectedProperties: 0,
    totalInquiries: 0,
    totalBookings: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Redirect non-vendor users
  useEffect(() => {
    if (!authLoading && user && userRole !== 'vendor') {
      router.push('/');
    }
  }, [user, userRole, authLoading, router]);

  // Fetch vendor data
  useEffect(() => {
    if (userRole === 'vendor') {
      fetchVendorData();
    }
  }, [userRole, user]);

  const fetchVendorData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);

      // Fetch vendor's properties
      const propertiesQuery = query(
        collection(db, 'properties'),
        where('createdBy', '==', user.uid)
      );
      const propertiesSnapshot = await getDocs(propertiesQuery);
      const propertiesData = propertiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Calculate stats
      const approved = propertiesData.filter(p => p.status === 'approved').length;
      const pending = propertiesData.filter(p => p.status === 'pending').length;
      const rejected = propertiesData.filter(p => p.status === 'rejected').length;

      // Fetch inquiries for vendor's properties
      const inquiriesQuery = query(
        collection(db, 'inquiries'),
        where('propertyOwnerId', '==', user.uid)
      );
      const inquiriesSnapshot = await getDocs(inquiriesQuery);
      const inquiriesData = inquiriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Calculate revenue (mock calculation based on inquiries)
      const estimatedRevenue = inquiriesData.length * 5000; // Mock revenue

      setProperties(propertiesData);
      setStats({
        totalProperties: propertiesData.length,
        approvedProperties: approved,
        pendingProperties: pending,
        rejectedProperties: rejected,
        totalInquiries: inquiriesData.length,
        totalBookings: Math.floor(inquiriesData.length * 0.6), // 60% conversion mock
        revenue: estimatedRevenue,
      });
    } catch (error) {
      console.error('Error fetching vendor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      await deleteDoc(doc(db, 'properties', propertyId));
      fetchVendorData();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setActiveTab('add');
  };

  if (authLoading || (user && userRole !== 'vendor')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // KYC not verified - show KYC prompt
  if (!isKYCVerified()) {
    return (
      <div className="min-h-screen bg-accent/30 pt-24">
        <div className="container-custom">
          <div className="max-w-md mx-auto glass-card p-8 text-center rounded-3xl">
            <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">KYC Verification Required</h2>
            <p className="text-muted-foreground mb-6">
              Please complete your KYC verification to start listing properties. 
              This helps ensure trust and safety on our platform.
            </p>
            <button
              onClick={() => router.push('/dashboard/vendor/kyc')}
              className="btn-primary w-full py-3 rounded-2xl"
            >
              Complete KYC Verification
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'properties', label: 'Properties', icon: Building, count: stats.totalProperties },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'inquiries', label: 'Inquiries', icon: Users, count: stats.totalInquiries },
    { id: 'kyc', label: 'KYC Vault', icon: Shield },
    { id: 'add', label: 'Add Property', icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-accent/30 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-20 z-30">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-green-600" />
            </div>
            <h1 className="text-lg font-black text-slate-800">VENDOR PORTAL</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user?.displayName}</span>
            <span className="badge badge-success text-xs">KYC Verified</span>
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
              <div className="glass-card p-6 rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Total Properties</p>
                    <p className="text-2xl font-black text-slate-900">{stats.totalProperties}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Approved</p>
                    <p className="text-2xl font-black text-slate-900">{stats.approvedProperties}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Inquiries</p>
                    <p className="text-2xl font-black text-slate-900">{stats.totalInquiries}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Est. Revenue</p>
                    <p className="text-2xl font-black text-slate-900">₹{stats.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="glass-card p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Performance Overview
                </h3>
                <select className="input-field w-40 text-sm py-2">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-accent/50 rounded-2xl">
                  <p className="text-3xl font-black text-primary mb-1">{stats.totalBookings}</p>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Bookings</p>
                </div>
                <div className="text-center p-4 bg-accent/50 rounded-2xl">
                  <p className="text-3xl font-black text-green-600 mb-1">{stats.totalInquiries}</p>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Inquiries</p>
                </div>
                <div className="text-center p-4 bg-accent/50 rounded-2xl">
                  <p className="text-3xl font-black text-purple-600 mb-1">
                    {stats.totalInquiries > 0 ? Math.round((stats.totalBookings / stats.totalInquiries) * 100) : 0}%
                  </p>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Conversion</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setActiveTab('add')}
                className="glass-card p-6 hover:shadow-medium transition-all text-left group rounded-3xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Add New Property</h3>
                    <p className="text-sm text-muted-foreground">
                      List a new hotel, resort, villa, or marriage hall
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className="glass-card p-6 hover:shadow-medium transition-all text-left group rounded-3xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Manage Availability</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your booking calendar and availability
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Recent Properties */}
            {properties.length > 0 && (
              <div className="glass-card p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800">Recent Properties</h3>
                  <button 
                    onClick={() => setActiveTab('properties')}
                    className="text-primary font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {properties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex items-center gap-4 p-4 bg-accent/50 rounded-2xl">
                      <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
                        {property.imageUrl ? (
                          <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                        ) : (
                          <Image className="w-full h-full text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800">{property.title}</p>
                        <p className="text-sm text-muted-foreground">{property.area}</p>
                      </div>
                      <span className={`badge text-xs ${
                        property.status === 'approved' ? 'badge-success' :
                        property.status === 'pending' ? 'badge-warning' : 'badge-error'
                      }`}>
                        {property.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="glass-card overflow-hidden rounded-3xl">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="font-bold text-slate-800">My Properties</h2>
              <button
                onClick={() => setActiveTab('add')}
                className="btn-primary py-2 px-4 text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Property
              </button>
            </div>
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : properties.length === 0 ? (
              <div className="p-8 text-center">
                <Building className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-muted-foreground">No properties listed yet</p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="mt-4 btn-primary py-2 px-4 text-sm rounded-xl"
                >
                  Add Your First Property
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-accent text-xs font-black uppercase text-muted-foreground">
                    <tr>
                      <th className="p-4 rounded-tl-2xl">Property</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right rounded-tr-2xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-border">
                    {properties.map((property) => (
                      <tr key={property.id} className="hover:bg-accent/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                              {property.imageUrl ? (
                                <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                              ) : (
                                <Image className="w-full h-full text-muted-foreground" />
                              )}
                            </div>
                            <span className="font-bold">{property.title}</span>
                          </div>
                        </td>
                        <td className="p-4 capitalize">{property.category}</td>
                        <td className="p-4 text-muted-foreground">{property.area}</td>
                        <td className="p-4 font-bold">₹{property.price?.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`badge text-xs ${
                            property.status === 'approved' ? 'badge-success' :
                            property.status === 'pending' ? 'badge-warning' : 'badge-error'
                          }`}>
                            {property.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleEditProperty(property)}
                            className="text-primary font-bold text-xs uppercase mr-3 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="text-red-600 font-bold text-xs uppercase hover:underline"
                          >
                            Delete
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

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <CalendarView properties={properties} />
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <InquiriesTab vendorId={user?.uid} />
        )}

        {/* KYC Vault Tab */}
        {activeTab === 'kyc' && (
          <KYCVault userId={user?.uid} />
        )}

        {/* Add Property Tab */}
        {activeTab === 'add' && (
          <div className="max-w-4xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {editingProperty 
                  ? 'Update your property details below.' 
                  : 'Fill in the details below to list a new property. It will require admin approval before going live.'}
              </p>
            </div>
            <PropertyForm 
              editMode={!!editingProperty} 
              propertyData={editingProperty}
              onSuccess={() => {
                fetchVendorData();
                setActiveTab('properties');
                setEditingProperty(null);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}

// Calendar View Component
function CalendarView({ properties }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('all');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Mock bookings data
  const mockBookings = [
    { day: 5, property: 'Property A', type: 'booked' },
    { day: 12, property: 'Property B', type: 'booked' },
    { day: 15, property: 'Property A', type: 'inquiry' },
    { day: 20, property: 'Property C', type: 'booked' },
    { day: 25, property: 'Property A', type: 'blocked' },
  ];

  return (
    <div className="glass-card p-6 rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={prevMonth} className="p-2 hover:bg-accent rounded-xl transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={nextMonth} className="p-2 hover:bg-accent rounded-xl transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="input-field w-48 py-2"
          >
            <option value="all">All Properties</option>
            {properties.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Inquiry</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Blocked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold text-sm text-muted-foreground py-2">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => {
          if (!day) return <div key={index} className="aspect-square"></div>;
          
          const booking = mockBookings.find(b => b.day === day);
          const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();
          
          return (
            <div 
              key={index}
              className={`aspect-square border rounded-xl p-2 flex flex-col ${
                isToday ? 'border-primary bg-primary/5' : 'border-border'
              } ${booking ? 'cursor-pointer hover:shadow-medium transition-shadow' : ''}`}
            >
              <span className={`text-sm font-bold ${isToday ? 'text-primary' : ''}`}>{day}</span>
              {booking && (
                <div className={`mt-auto text-xs px-2 py-1 rounded-full ${
                  booking.type === 'booked' ? 'bg-green-100 text-green-700' :
                  booking.type === 'inquiry' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {booking.type}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Inquiries Tab Component with Call Buttons
function InquiriesTab({ vendorId }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchInquiries = async () => {
      if (!vendorId) return;
      
      try {
        const q = query(
          collection(db, 'inquiries'),
          where('propertyOwnerId', '==', vendorId),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        setInquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [vendorId]);

  const filteredInquiries = filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter);

  if (loading) {
    return (
      <div className="glass-card p-8 text-center rounded-3xl">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="glass-card p-8 text-center rounded-3xl">
        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium text-muted-foreground">No inquiries yet</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <h2 className="font-bold text-slate-800">Customer Inquiries</h2>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input-field w-40 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      <div className="space-y-4 p-6">
        {filteredInquiries.map((inquiry) => (
          <div key={inquiry.id} className="border border-border rounded-2xl p-4 hover:shadow-medium transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-slate-800">{inquiry.userName}</p>
                <p className="text-sm text-muted-foreground">{inquiry.userEmail}</p>
                {inquiry.userPhone && (
                  <p className="text-sm text-muted-foreground">{inquiry.userPhone}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`badge text-xs ${
                  inquiry.status === 'pending' ? 'badge-warning' :
                  inquiry.status === 'contacted' ? 'badge-primary' : 'badge-success'
                }`}>
                  {inquiry.status || 'pending'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-3">{inquiry.message}</p>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
              <span className="bg-accent px-3 py-1 rounded-full">Property: {inquiry.propertyTitle}</span>
              {inquiry.checkIn && (
                <span className="bg-accent px-3 py-1 rounded-full">Check-in: {new Date(inquiry.checkIn).toLocaleDateString()}</span>
              )}
            </div>
            <div className="flex gap-3">
              {inquiry.userPhone && (
                <a 
                  href={`tel:${inquiry.userPhone}`}
                  className="btn-primary py-2 px-4 text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              )}
              <a 
                href={`mailto:${inquiry.userEmail}`}
                className="btn-outline py-2 px-4 text-sm"
              >
                Send Email
              </a>
              <button className="btn-outline py-2 px-4 text-sm">
                Mark Contacted
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// KYC Vault Component
function KYCVault({ userId }) {
  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKYC = async () => {
      if (!userId) return;
      
      try {
        const userDoc = await getDocs(query(collection(db, 'users'), where('__name__', '==', userId)));
        if (!userDoc.empty) {
          const userData = userDoc.docs[0].data();
          setKycData(userData.kycDetails || null);
        }
      } catch (error) {
        console.error('Error fetching KYC:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKYC();
  }, [userId]);

  if (loading) {
    return (
      <div className="glass-card p-8 text-center rounded-3xl">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  const kycDocuments = [
    { name: 'Aadhaar Card', status: 'verified', verifiedAt: '2024-01-15' },
    { name: 'PAN Card', status: 'verified', verifiedAt: '2024-01-15' },
    { name: 'Business Proof', status: 'pending', verifiedAt: null },
    { name: 'Property Documents', status: 'not_uploaded', verifiedAt: null },
  ];

  return (
    <div className="space-y-6">
      {/* KYC Status Banner */}
      <div className="glass-card p-6 rounded-3xl bg-green-50 border-green-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-green-800">KYC Verified</h3>
            <p className="text-sm text-green-600">Your identity has been verified. You can list properties on the platform.</p>
          </div>
        </div>
      </div>

      {/* KYC Documents */}
      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            KYC Document Vault
          </h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {kycDocuments.map((doc, index) => (
              <div key={index} className="border border-border rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    doc.status === 'verified' ? 'bg-green-100' :
                    doc.status === 'pending' ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      doc.status === 'verified' ? 'text-green-600' :
                      doc.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{doc.name}</p>
                    {doc.verifiedAt && (
                      <p className="text-xs text-muted-foreground">Verified: {doc.verifiedAt}</p>
                    )}
                  </div>
                </div>
                <span className={`badge text-xs ${
                  doc.status === 'verified' ? 'badge-success' :
                  doc.status === 'pending' ? 'badge-warning' : ''
                }`}>
                  {doc.status === 'not_uploaded' ? 'Upload' : doc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload New Document */}
      <div className="glass-card p-6 rounded-3xl">
        <h3 className="font-bold text-slate-800 mb-4">Upload Additional Documents</h3>
        <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium text-slate-700 mb-1">Drop files here or click to upload</p>
          <p className="text-sm text-muted-foreground">PDF, JPG, PNG up to 5MB</p>
        </div>
      </div>
    </div>
  );
}