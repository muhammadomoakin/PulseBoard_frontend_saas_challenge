import React from "react";
import { Button, Card, Container } from "../components/ui";
import RevenueChart from "../components/charts/RevenueChart";
import UsersGrowthChart from "../components/charts/UsersGrowthChart";

const Dashboard = () => {
  return (
    <Container className="py-8">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Dashboard Overview
            </h2>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Welcome back to your PulseBoard overview.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary">Export JSON</Button>
            <Button variant="primary">New Project</Button>
          </div>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-500">
              Total Revenue
            </span>
            <div className="text-3xl font-bold text-gray-900">$45,231.89</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-sm font-semibold text-green-600">
                +20.1%
              </span>
              <span className="text-xs text-gray-400">from last month</span>
            </div>
          </Card>

          <Card className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-500">
              Active Users
            </span>
            <div className="text-3xl font-bold text-gray-900">2,350</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-sm font-semibold text-green-600">
                +180.1%
              </span>
              <span className="text-xs text-gray-400">from last month</span>
            </div>
          </Card>

          <Card className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-500">
              Monthly Growth
            </span>
            <div className="text-3xl font-bold text-gray-900">12.5%</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-sm font-semibold text-green-600">+19%</span>
              <span className="text-xs text-gray-400">from last month</span>
            </div>
          </Card>

          <Card className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-500">
              Conversion Rate
            </span>
            <div className="text-3xl font-bold text-gray-900">3.2%</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-sm font-semibold text-green-600">
                +1.2%
              </span>
              <span className="text-xs text-gray-400">from last month</span>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <UsersGrowthChart />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
