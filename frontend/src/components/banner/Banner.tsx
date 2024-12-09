import Image from "next/image"
function Banner() {
  return (
    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] bg-cover bg-banner1 bg-no-repeat  text-white lg:flex flex-col justify-center">
        <div className=" ml-10  lg:ml-80   ">
            <p className=" pt-10">Working since 1992 <span className=" inline-block ml-3 w-7 h-[1px] bg-customeRed"></span></p>
            <p className=" hidden sm:block text-3xl font-semibold mt-2"> Tuneup Your Car<span className="block">to Next Level</span> </p>
        </div>
    </div>
  )
}

export default Banner