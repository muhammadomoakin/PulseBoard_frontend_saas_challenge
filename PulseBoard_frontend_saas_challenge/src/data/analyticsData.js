/**
 * Mock analytics data for PulseBoard SaaS Dashboard
 * Representing the last 8 months of performance metrics.
 */

export const monthlyRevenueData = [
  { id: 1, month: "Jul", revenue: 12500, growth: 0 },
  { id: 2, month: "Aug", revenue: 14200, growth: 13.6 },
  { id: 3, month: "Sep", revenue: 13800, growth: -2.8 },
  { id: 4, month: "Oct", revenue: 16500, growth: 19.5 },
  { id: 5, month: "Nov", revenue: 19200, growth: 16.3 },
  { id: 6, month: "Dec", revenue: 24500, growth: 27.6 },
  { id: 7, month: "Jan", revenue: 22800, growth: -6.9 },
  { id: 8, month: "Feb", revenue: 26400, growth: 15.7 },
];

export const monthlyActiveUsersData = [
  { id: 1, month: "Jul", users: 1200, activeRate: 88 },
  { id: 2, month: "Aug", users: 1450, activeRate: 86 },
  { id: 3, month: "Sep", users: 1600, activeRate: 89 },
  { id: 4, month: "Oct", users: 1900, activeRate: 91 },
  { id: 5, month: "Nov", users: 2300, activeRate: 90 },
  { id: 6, month: "Dec", users: 2800, activeRate: 92 },
  { id: 7, month: "Jan", users: 3100, activeRate: 88 },
  { id: 8, month: "Feb", users: 3500, activeRate: 93 },
];

/**
 * Summary statistics derived from the mock data
 */
export const analyticsSummary = {
  totalRevenueYTD: 149900,
  averageMonthlyRevenue: 18737.5,
  totalUsers: 3500,
  userGrowthRate: 12.9, // Last month vs previous
  revenueGrowthRate: 15.7, // Last month vs previous
};
