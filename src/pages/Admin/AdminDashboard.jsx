import React, { useState } from 'react';
import {
  PieChart, Pie, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from 'recharts';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('30days');

  // Sample data
  const subscriptionData = [
    { name: 'Subscribed', value: 60, color: '#6366F1' },
    { name: 'Non-Subscribed', value: 40, color: '#A5B4FC' }
  ];

  const growthData = [
    { month: 'Jan', monthly: 65, yearly: 40, semiannual: 24 },
    { month: 'Feb', monthly: 78, yearly: 52, semiannual: 28 },
    { month: 'Mar', monthly: 82, yearly: 58, semiannual: 35 },
    { month: 'Apr', monthly: 95, yearly: 63, semiannual: 42 },
    { month: 'May', monthly: 110, yearly: 75, semiannual: 48 },
    { month: 'Jun', monthly: 125, yearly: 85, semiannual: 55 }
  ];

  const revenueData = [
    { name: 'Monthly', value: 45, color: '#EC4899' },
    { name: 'Yearly', value: 35, color: '#8B5CF6' },
    { name: 'Semi-Annual', value: 20, color: '#6366F1' }
  ];

  const engagementData = [
    { day: 'Mon', likes: 120, comments: 85, shares: 45 },
    { day: 'Tue', likes: 140, comments: 95, shares: 55 },
    { day: 'Wed', likes: 180, comments: 125, shares: 75 },
    { day: 'Thu', likes: 160, comments: 110, shares: 65 },
    { day: 'Fri', likes: 200, comments: 145, shares: 85 },
    { day: 'Sat', likes: 150, comments: 100, shares: 60 },
    { day: 'Sun', likes: 130, comments: 90, shares: 50 }
  ];

  const churnData = [
    { name: 'Retained', value: 85, color: '#10B981' },
    { name: 'Churned', value: 15, color: '#EF4444' }
  ];

  const CustomCard = ({ children, title, className = '' }) => (
    <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}>
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );

  const StatCard = ({ title, value, change, color }) => (
    <div className={`rounded-xl p-6 text-white ${color}`}>
      <h3 className="text-lg font-medium opacity-90">{title}</h3>
      <div className="mt-2">
        <span className="text-3xl font-bold">{value}</span>
        <span className="ml-2 text-sm opacity-80">{change}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title="Total Users"
            value="24,589"
            change="+12.5%"
            color="bg-gradient-to-r from-indigo-500 to-purple-600"
          />
          <StatCard 
            title="Active Users"
            value="18,472"
            change="+8.2%"
            color="bg-gradient-to-r from-pink-500 to-rose-500"
          />
          <StatCard 
            title="Revenue"
            value="$84,295"
            change="+15.3%"
            color="bg-gradient-to-r from-emerald-500 to-teal-500"
          />
          <StatCard 
            title="Conversion Rate"
            value="64.8%"
            change="+5.2%"
            color="bg-gradient-to-r from-blue-500 to-cyan-500"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  pb-7">
          {/* Subscription Status */}
          <CustomCard title="Subscription Status" className="bg-white">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CustomCard>

          {/* Growth Rate */}
          <CustomCard title="Subscription Growth" className="bg-white">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="monthly" stackId="1" stroke="#6366F1" fill="#6366F1" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="yearly" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="semiannual" stackId="1" stroke="#A5B4FC" fill="#A5B4FC" fillOpacity={0.4} />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CustomCard>

          {/* Revenue Distribution */}
          <CustomCard title="Revenue Distribution" className="bg-white">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CustomCard>

          {/* User Engagement */}
          <CustomCard title="User Engagement" className="bg-white lg:col-span-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="likes" fill="#6366F1" />
                  <Bar dataKey="comments" fill="#8B5CF6" />
                  <Bar dataKey="shares" fill="#A5B4FC" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CustomCard>

          {/* Churn Rate */}
          <CustomCard title="Churn Rate" className="bg-white">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={churnData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {churnData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;