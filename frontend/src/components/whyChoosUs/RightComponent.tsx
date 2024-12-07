import Image from "next/image"
function RightComponent() {
  return (
    <div className=' lg:max-w-[50%] px-4'>
        <p className="text-4xl font-bold text-customBlue mb-12">Additional Services         <span className=" inline-block ml-3 w-12 h-[2px] bg-customeRed"></span>
        </p>
        <div className="lg:flex justify-between  gap-10">
          <div className="hidden lg:block">
          <Image className="" src="/images/vban2.jpg" width={225} height={429} alt="image"/>

          </div>

    <div className="">
    <div className="flex  items-center gap-5 mb-[6px] ">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>General Auto Repairs & Maintenance </p>
      </div>
      <div className="flex  items-center gap-5 mb-[6px]">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>Transmission Repairs & Replacement </p>
      </div>
      <div className="flex  items-center gap-5 mb-[6px]">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>Tire Repairs and Replacement </p>
      </div>
      <div className="flex  items-center gap-5 mb-[6px]">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>State Emissions Inspection </p>
      </div>
      <div className="flex  items-center gap-5 mb-[6px]">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>Break JOb / Break Services </p>
      </div>
      <div className="flex  items-center gap-5 mb-[6px]">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>Electrical Diagnostic </p>
      </div>
      <div className="flex items-center gap-5 mb-[6px]">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>Fuel System Repairs </p>
      </div>
      <div className="flex  items-center gap-5 mb-[6px]">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>Starting and Suspension Work </p>
      </div>
      <div className="flex  items-center gap-5 mb-[6px]">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>Steering and Suspension Work </p>
      </div>
      <div className="flex  items-center gap-5 mb-[6px]">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>Emission Repairs Facility </p>
      </div>
      <div className="flex  items-center gap-5 mb-[6px]">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>Wheel Alignemnt </p>
      </div>
      <div className="flex  items-center gap-5 mb-[6px]">
      <Image src="/images/icon-1.png"  width={15} height={15}  alt="icon"/>
      <p>Computer Diagnostic Testing </p>
      </div>
      
    
     
       
    </div>

        </div>

    </div>
  )
}

export default RightComponent