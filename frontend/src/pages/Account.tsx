import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Package, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const Account: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/user/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/user/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await axios.put('/api/user/profile', profile);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-2">
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <User className="h-6 w-6" />
                <span>Profile Information</span>
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900">{profile.name || user?.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900 flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{profile.email || user?.email}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone || ''}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="input-field"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{profile.phone || 'Not provided'}</span>
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={profile.address?.street || ''}
                      onChange={(e) => setProfile({
                        ...profile,
                        address: { ...profile.address!, street: e.target.value }
                      })}
                      className="input-field"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City"
                        value={profile.address?.city || ''}
                        onChange={(e) => setProfile({
                          ...profile,
                          address: { ...profile.address!, city: e.target.value }
                        })}
                        className="input-field"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={profile.address?.state || ''}
                        onChange={(e) => setProfile({
                          ...profile,
                          address: { ...profile.address!, state: e.target.value }
                        })}
                        className="input-field"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={profile.address?.zipCode || ''}
                        onChange={(e) => setProfile({
                          ...profile,
                          address: { ...profile.address!, zipCode: e.target.value }
                        })}
                        className="input-field"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        value={profile.address?.country || ''}
                        onChange={(e) => setProfile({
                          ...profile,
                          address: { ...profile.address!, country: e.target.value }
                        })}
                        className="input-field"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-900 flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      {profile.address?.street ? (
                        <>
                          <p>{profile.address.street}</p>
                          <p>{profile.address.city}, {profile.address.state} {profile.address.zipCode}</p>
                          <p>{profile.address.country}</p>
                        </>
                      ) : (
                        <span>No address provided</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Orders Summary */}
        <div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span>Recent Orders</span>
            </h2>
            
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 5).map((order: any) => (
                  <div key={order._id} className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">Order #{order._id.slice(-6)}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.totalAmount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;