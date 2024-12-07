import ServiceCard from "./ServiceCard";

function ServiceHome() {
  return (
    <div className="bg-patternBg  mt-10 md:mt-24 px-10 ">
    <div className=" mx-auto pt-20 max-w-[1200px] ">
      <p className="text-4xl font-bold text-customBlue">
        Our Services{" "}
        <span className=" inline-block ml-3 w-8 h-[2px] bg-customeRed"></span>
      </p>
      <p className="text-base font-light mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis aut in
        incidunt esse sed voluptates doloribus officiis ratione laudantium
        sapiente tenetur delectus neque, non dicta quos odit numquam nobis
        quasi?
      </p>
      <div className=" lg:grid grid-cols-3 gap-5">
      <ServiceCard/>
      <ServiceCard/>
      <ServiceCard/>
      <ServiceCard/>
      <ServiceCard/>
      <ServiceCard/>
      </div>
    </div>
    
    </div>
  );
}

export default ServiceHome;
