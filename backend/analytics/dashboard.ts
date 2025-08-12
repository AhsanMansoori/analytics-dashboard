import { api } from "encore.dev/api";

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

// Get dashboard analytics data
export const getDashboard = api<void, DashboardResponse>(
  { expose: true, method: "GET", path: "/analytics/dashboard" },
  async () => {
    // Mock data for demonstration
    const stats: DashboardStats = {
      totalSales: 125430,
      newUsers: 2847,
      revenue: 89250,
      conversionRate: 3.2
    };

    const salesData: SalesData[] = [
      { month: "Jan", sales: 12000 },
      { month: "Feb", sales: 15000 },
      { month: "Mar", sales: 18000 },
      { month: "Apr", sales: 22000 },
      { month: "May", sales: 19000 },
      { month: "Jun", sales: 25000 },
      { month: "Jul", sales: 28000 },
      { month: "Aug", sales: 32000 },
      { month: "Sep", sales: 29000 },
      { month: "Oct", sales: 35000 },
      { month: "Nov", sales: 38000 },
      { month: "Dec", sales: 42000 }
    ];

    const userRegistrations: UserRegistrationData[] = [
      { date: "Mon", registrations: 120 },
      { date: "Tue", registrations: 150 },
      { date: "Wed", registrations: 180 },
      { date: "Thu", registrations: 200 },
      { date: "Fri", registrations: 170 },
      { date: "Sat", registrations: 90 },
      { date: "Sun", registrations: 80 }
    ];

    const revenueDistribution: RevenueDistribution[] = [
      { category: "E-commerce", amount: 35000, color: "#3B82F6" },
      { category: "Subscriptions", amount: 28000, color: "#10B981" },
      { category: "Consulting", amount: 15000, color: "#F59E0B" },
      { category: "Advertising", amount: 11250, color: "#EF4444" }
    ];

    return {
      stats,
      salesData,
      userRegistrations,
      revenueDistribution
    };
  }
);
