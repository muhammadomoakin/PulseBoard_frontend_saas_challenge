import React from "react";
import Card from "../ui/Card";

/**
 * Mock data for the Recent Activity feed
 */
const activities = [
  {
    id: 1,
    title: "New user signed up",
    time: "2 mins ago",
    type: "user",
  },
  {
    id: 2,
    title: "Payment received",
    time: "1 hour ago",
    type: "payment",
  },
  {
    id: 3,
    title: "Subscription upgraded",
    time: "3 hours ago",
    type: "upgrade",
  },
  {
    id: 4,
    title: "Refund issued",
    time: "5 hours ago",
    type: "refund",
  },
  {
    id: 5,
    title: "New ticket opened",
    time: "Yesterday",
    type: "support",
  },
];

/**
 * RecentActivity Component
 * Displays a list of recent events in a styled card container.
 * Part of the PulseBoard SaaS dashboard.
 */
const RecentActivity = () => {
  return (
    <Card className="flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
          Recent Activity
        </h3>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Monitor latest actions across your platform
        </p>
      </div>

      <div className="flex flex-col -mx-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between py-4 px-6 border-b border-slate-50 hover:bg-slate-50/50 transition-all duration-200 cursor-pointer group last:border-0"
          >
            <div className="flex items-center gap-3">
              {/* Optional: Add a simple dot or icon if needed for richness */}
              <div className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform"></div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                {activity.title}
              </span>
            </div>
            <span className="text-xs font-medium text-slate-400">
              {activity.time}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-6 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center gap-1 group">
        View all activity
        <span className="group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </button>
    </Card>
  );
};

export default RecentActivity;
