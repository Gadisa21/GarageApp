import Header from "@/components/header/Header"
import Banner from "@/components/banner/Banner"
import Experience from "@/components/experience/Experience"
import ServiceHome from "@/components/services/ServiceHome"
import ChoosUs from "@/components/whyChoosUs/ChoosUs"
import Footer from "@/components/footer/Footer"
function page() {
  return (
    <>
    <Header />
    <Banner />
    <Experience />
    <ServiceHome />
    <ChoosUs />
    <Footer />
    </>
  )
}

export default page