import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder Content to confirm Tailwind is working */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
            Total Revenue
          </h2>
          <p className="text-2xl font-bold text-gray-900">$24,560</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
            Active Users
          </h2>
          <p className="text-2xl font-bold text-gray-900">1,234</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
            Conversion Rate
          </h2>
          <p className="text-2xl font-bold text-gray-900">3.45%</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96 flex items-center justify-center text-gray-300 italic">
        Main Chart Placeholder
      </div>
    </DashboardLayout>
  );
}

export default App;
