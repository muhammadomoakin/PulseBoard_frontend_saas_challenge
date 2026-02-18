import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <header>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
          <p className="text-slate-500">
            Welcome back to your PulseBoard overview.
          </p>
        </header>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 min-h-[400px] flex items-center justify-center border-dashed">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Dashboard Content
            </h3>
            <p className="text-slate-500 mt-2">
              Your data visualizations and widgets will appear here.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default App;
