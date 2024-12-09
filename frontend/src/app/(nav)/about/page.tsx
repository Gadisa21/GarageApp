import Experience from "@/components/experience/Experience";
import ChoosUs from "@/components/whyChoosUs/ChoosUs";
import Link from "next/link";
import Image from "next/image";
function page() {
  return (
    <>
      {" "}
      <div className=" relative bg-banner2 w-full h-[200px] sm:h-[300px] md:h-[400px] lg:[600px] bg-cover bg-no-repeat text-white transition-all duration-500 ease-in-out ">
        <div className="absolute bottom-10 left-10">
          <p className="  text-2xl font-bold  ">About Us</p>
          <div className="flex gap-2 text-base">
            <Link href="/" className="text-customeRed">
              {" "}
              Home
            </Link>{" "}
            <span>{">"}</span>
            <Link href="/about" className="text-white">
              {" "}
              About Us
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] flex gap-10 px-10 justify-center mx-auto mt-16">
        <div>
          <p className="text-customBlue text-2xl font-bold my-5">
            We are highly skilled mechanics for your car repair
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
            pariatur aperiam saepe alias minima laboriosam ut recusandae quis,
            quod nulla aliquid minus incidunt eum animi vero. Aliquam, dolorum?
            Enim, voluptatibus.
          </p>
          <p className="mt-10">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente
            sint quasi, iusto maiores ad corrupti iure aliquam hic consequuntur
            fuga illum ab labore. Alias reiciendis eveniet illo! Ratione,
            quibusdam vero.
          </p>
        </div>
        <Image
          src="/images/tyre.jpg"
          className="hidden lg:block rounded-lg"
          width={400}
          height={200}
          alt="picture"
        />
      </div>
      <Experience />
      <ChoosUs />
    </>
  );
}

export default page;
