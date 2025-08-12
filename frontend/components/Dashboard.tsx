import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import backend from '~backend/client';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import StatsCards from './StatsCards';
import SalesChart from './charts/SalesChart';
import UserRegistrationsChart from './charts/UserRegistrationsChart';
import RevenueDistributionChart from './charts/RevenueDistributionChart';
import DashboardFilters from './DashboardFilters';
import SettingsPanel from './SettingsPanel';
import ReportsPanel from './ReportsPanel';
import { useToast } from '@/components/ui/use-toast';
import { useNotifications } from '../contexts/NotificationContext';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filters, setFilters] = useState<{
    dateRange?: string;
    region?: string;
    category?: string;
  }>({});
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard', filters],
    queryFn: async () => {
      try {
        return await backend.analytics.getDashboard(filters);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
        throw err;
      }
    },
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const notifications = [
        { title: "New Sale", message: "A new sale of $1,250 was completed", type: "success" as const, read: false },
        { title: "User Registered", message: "A new user just signed up", type: "info" as const, read: false },
        { title: "Goal Achieved", message: "Monthly revenue goal reached!", type: "success" as const, read: false },
      ];
      
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      
      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        addNotification(randomNotification);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [addNotification]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to load dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {activeTab === 'dashboard' && (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Analytics Dashboard
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Welcome back! Here's what's happening with your business.
                  </p>
                </div>

                <DashboardFilters filters={filters} onFiltersChange={setFilters} />
                <StatsCards stats={data.stats} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <SalesChart data={data.salesData} />
                  <UserRegistrationsChart data={data.userRegistrations} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <RevenueDistributionChart data={data.revenueDistribution} />
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          New user registered
                        </span>
                        <span className="text-xs text-gray-400">2 min ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Sale completed
                        </span>
                        <span className="text-xs text-gray-400">5 min ago</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Report generated
                        </span>
                        <span className="text-xs text-gray-400">10 min ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'reports' && <ReportsPanel />}
            {activeTab === 'settings' && <SettingsPanel />}
          </div>
        </main>
      </div>
    </div>
  );
}
