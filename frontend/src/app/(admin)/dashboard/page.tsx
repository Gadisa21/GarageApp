import KpiSection from "@/components/KpiSection";
import OrderTrends from "@/components/OrderTrends";
import RevenueBreakdown from "@/components/RevenueBreakdown";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Section (Always Full Width) */}
      <KpiSection />

      {/* Order Trends Chart (Full Width) */}
      <OrderTrends />

      {/* Revenue Breakdown Chart (Full Width) */}
      <RevenueBreakdown />
    </div>
  );
};

export default Dashboard;
