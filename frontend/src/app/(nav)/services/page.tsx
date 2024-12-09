import Link from "next/link"
import ChoosUs from "@/components/whyChoosUs/ChoosUs"
import ServiceHome from "@/components/services/ServiceHome"
function page() {
  return (
    <div>
      <div className="mb-[-2.5rem] md:mb-[-6rem] relative bg-banner2 w-full h-[200px] sm:h-[300px] md:h-[400px] lg:[600px] bg-cover bg-no-repeat text-white transition-all duration-500 ease-in-out ">
        <div className="absolute bottom-10 left-10">
          <p className="  text-2xl font-bold  ">Our Services</p>
          <div className="flex gap-2 text-base">
            <Link href="/" className="text-customeRed">
              {" "}
              Home
            </Link>{" "}
            <span>{">"}</span>
            <Link href="/services" className="text-white">
              {" "}
              Services
            </Link>
          </div>
        </div>
      </div>
      <ServiceHome />
      <ChoosUs />
    </div>
  )
}

export default page