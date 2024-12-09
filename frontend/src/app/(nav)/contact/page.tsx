import Link from "next/link";
import Map from "@/components/map/Map";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
function page() {
  return (
    <div className=" ">
      <div className=" relative bg-banner2 w-full h-[200px] sm:h-[300px] md:h-[400px] lg:[600px] bg-cover bg-no-repeat text-white transition-all duration-500 ease-in-out ">
        <div className="absolute bottom-10 left-10">
          <p className="  text-2xl font-bold  ">Contact Us</p>
          <div className="flex gap-2 text-base">
            <Link href="/" className="text-customeRed">
              {" "}
              Home
            </Link>{" "}
            <span>{">"}</span>
            <Link href="/contact" className="text-white">
              {" "}
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mt-10 lg:mt-20 px-10 mx-auto lg:flex gap-10 justify-center">
        <div className="lg:w-[50%]">
          <Map />
        </div>
        <div className="lg:w-[50%] mt-10  lg:mt-0">
          <p className="text-4xl font-bold text-customBlue mb-5">Our Address</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis,
            modi quo qui quas, quos odio maxime voluptas aliquid minima saepe
            magni ipsa praesentium recusandae facilis aliquam aut, eaque sunt
            eos.
          </p>

          <div className="  ">
            <div className="  flex gap-5 pt-7  ">
              <LocationOnOutlinedIcon
                className="text-customeRed"
                fontSize="large"
              />
              <p>Addis Ababa, Ethiopia.</p>
            </div>
            <div className=" pt-7  flex gap-5">
              <MarkEmailReadOutlinedIcon
                className="text-customeRed"
                fontSize="large"
              />
              <p>
                Email us:{" "}
                <a href="mailto:gadisadiriba25@gmail.com" className=" ">
                  gadisadiriba25@gmail.com
                </a>
              </p>{" "}
            </div>
            <div className=" pt-7  flex gap-5">
              <LocalPhoneOutlinedIcon
                className="text-customeRed"
                fontSize="large"
              />
              <p>Call us on +2529044710</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
