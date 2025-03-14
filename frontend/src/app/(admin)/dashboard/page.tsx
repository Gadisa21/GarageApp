import AdminMenu from "@/components/adminMenu/AdminMenu"
import KpiSection from "@/components/KpiSection"
import OrderTrends from "@/components/OrderTrends"
import RevenueBreakdown from "@/components/RevenueBreakdown"


const page = () => {
  return (
    <div className="p-2 md:p-6  space-y-6">
      <KpiSection />
      <OrderTrends />
      <RevenueBreakdown />
     
    </div>
  )
}

export default page