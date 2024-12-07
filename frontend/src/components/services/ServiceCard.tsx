import Image from "next/image";

function ServiceCard() {
  return (
    <div className="     bg-white px-[33px] pt-[45px] pb-[35px]  border-b-4 border-customeRed mb-5 shadow-md hover:shadow-lg hover:shadow-gray-500 hover:-translate-y-2 transform transition duration-300">
      <p className="text-xs text-customBlue">SERVICE AND REPAIRS</p>
      <p className="text-2xl font-bold text-customBlue">Performance Upgrade</p>
      <div className="flex justify-between mt-12 items-center">
        <p className="text-customeRed text-sm font-medium">READ MORE +</p>
        <Image
          src="/images/image.png"
          width={64}
          height={58}
          alt="service icon"
        />
      </div>
    </div>
  );
}

export default ServiceCard;
