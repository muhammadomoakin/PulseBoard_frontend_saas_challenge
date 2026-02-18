import DashboardLayout from "./layout/DashboardLayout";
import { Button, Card, Container } from "./components/ui";

function App() {
  return (
    <DashboardLayout>
      <Container className="py-8">
        <div className="flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Dashboard
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

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="flex flex-col gap-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Revenue
              </span>
              <div className="text-3xl font-bold text-gray-900 leading-none">
                $24,500.00
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-green-600 font-semibold">↑ 14%</span> vs
                last month
              </p>
            </Card>

            <Card className="flex flex-col gap-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Active Tasks
              </span>
              <div className="text-3xl font-bold text-gray-900 leading-none">
                128
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-green-600 font-semibold">↑ 8%</span> vs
                last month
              </p>
            </Card>

            <Card className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Pulse Score
              </span>
              <div className="text-3xl font-bold text-gray-900 leading-none">
                94.2%
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <span className="text-red-600 font-semibold">↓ 2%</span> vs last
                month
              </p>
            </Card>
          </div>

          {/* Empty State / Feature Showcase */}
          <Card className="min-h-[450px] flex items-center justify-center border-dashed border-2 bg-gray-50/50">
            <div className="text-center max-w-md px-6">
              <div className="w-24 h-24 bg-white shadow-xl rounded-3xl flex items-center justify-center mx-auto mb-8 transform -rotate-6 hover:rotate-0 transition-all duration-500 ease-out border border-gray-100">
                <span className="text-5xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                Your Board is Ready!
              </h3>
              <p className="text-gray-500 mt-4 text-base leading-relaxed">
                You're now using the PulseBoard UI system. These components are
                fully responsive, accessible, and designed to scale with your
                SaaS logic.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" className="w-full sm:w-auto px-10">
                  Build Now
                </Button>
                <Button variant="secondary" className="w-full sm:w-auto px-10">
                  Documentation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </DashboardLayout>
  );
}

export default App;
