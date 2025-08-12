import { api, Query } from "encore.dev/api";

export interface DashboardStats {
  totalSales: number;
  newUsers: number;
  revenue: number;
  conversionRate: number;
}

export interface SalesData {
  month: string;
  sales: number;
}

export interface UserRegistrationData {
  date: string;
  registrations: number;
}

export interface RevenueDistribution {
  category: string;
  amount: number;
  color: string;
}

export interface DashboardResponse {
  stats: DashboardStats;
  salesData: SalesData[];
  userRegistrations: UserRegistrationData[];
  revenueDistribution: RevenueDistribution[];
}

export interface DashboardFilters {
  dateRange?: Query<string>;
  region?: Query<string>;
  category?: Query<string>;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  timestamp: Date;
  read: boolean;
}

export interface NotificationsResponse {
  notifications: NotificationItem[];
  unreadCount: number;
}

// Get dashboard analytics data
export const getDashboard = api<DashboardFilters, DashboardResponse>(
  { expose: true, method: "GET", path: "/analytics/dashboard" },
  async (filters) => {
    // Apply filters to mock data (in real app, filter database queries)
    const multiplier = filters.dateRange === "week" ? 0.3 : 
                     filters.dateRange === "month" ? 0.7 : 1;

    const stats: DashboardStats = {
      totalSales: Math.round(125430 * multiplier),
      newUsers: Math.round(2847 * multiplier),
      revenue: Math.round(89250 * multiplier),
      conversionRate: 3.2
    };

    const salesData: SalesData[] = [
      { month: "Jan", sales: Math.round(12000 * multiplier) },
      { month: "Feb", sales: Math.round(15000 * multiplier) },
      { month: "Mar", sales: Math.round(18000 * multiplier) },
      { month: "Apr", sales: Math.round(22000 * multiplier) },
      { month: "May", sales: Math.round(19000 * multiplier) },
      { month: "Jun", sales: Math.round(25000 * multiplier) },
      { month: "Jul", sales: Math.round(28000 * multiplier) },
      { month: "Aug", sales: Math.round(32000 * multiplier) },
      { month: "Sep", sales: Math.round(29000 * multiplier) },
      { month: "Oct", sales: Math.round(35000 * multiplier) },
      { month: "Nov", sales: Math.round(38000 * multiplier) },
      { month: "Dec", sales: Math.round(42000 * multiplier) }
    ];

    const userRegistrations: UserRegistrationData[] = [
      { date: "Mon", registrations: Math.round(120 * multiplier) },
      { date: "Tue", registrations: Math.round(150 * multiplier) },
      { date: "Wed", registrations: Math.round(180 * multiplier) },
      { date: "Thu", registrations: Math.round(200 * multiplier) },
      { date: "Fri", registrations: Math.round(170 * multiplier) },
      { date: "Sat", registrations: Math.round(90 * multiplier) },
      { date: "Sun", registrations: Math.round(80 * multiplier) }
    ];

    const revenueDistribution: RevenueDistribution[] = [
      { category: "E-commerce", amount: Math.round(35000 * multiplier), color: "#3B82F6" },
      { category: "Subscriptions", amount: Math.round(28000 * multiplier), color: "#10B981" },
      { category: "Consulting", amount: Math.round(15000 * multiplier), color: "#F59E0B" },
      { category: "Advertising", amount: Math.round(11250 * multiplier), color: "#EF4444" }
    ];

    return {
      stats,
      salesData,
      userRegistrations,
      revenueDistribution
    };
  }
);

// Get notifications
export const getNotifications = api<void, NotificationsResponse>(
  { expose: true, method: "GET", path: "/analytics/notifications" },
  async () => {
    const notifications: NotificationItem[] = [
      {
        id: "1",
        title: "Sales Alert",
        message: "Sales increased by 15% compared to last week",
        type: "success",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false
      },
      {
        id: "2",
        title: "New User Milestone",
        message: "Congratulations! You've reached 3,000 users",
        type: "success",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false
      },
      {
        id: "3",
        title: "Conversion Rate Warning",
        message: "Conversion rate dropped by 2.1% this month",
        type: "warning",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true
      },
      {
        id: "4",
        title: "System Update",
        message: "Dashboard updated with new features",
        type: "info",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true
      }
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    return { notifications, unreadCount };
  }
);

// Mark notification as read
export const markNotificationRead = api<{ id: string }, void>(
  { expose: true, method: "POST", path: "/analytics/notifications/:id/read" },
  async ({ id }) => {
    // In real app, update database
    console.log(`Marking notification ${id} as read`);
  }
);

// Export dashboard data
export const exportData = api<{ format: "csv" | "pdf"; filters?: DashboardFilters }, { downloadUrl: string }>(
  { expose: true, method: "POST", path: "/analytics/export" },
  async ({ format, filters }) => {
    // In real app, generate actual file and return download URL
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `dashboard-export-${timestamp}.${format}`;
    
    // Mock download URL
    const downloadUrl = `https://example.com/downloads/${filename}`;
    
    return { downloadUrl };
  }
);
