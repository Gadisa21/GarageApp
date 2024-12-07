import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
function LeftComponent() {
  return (
    <div className='lg:max-w-[50%] px-4'>
      <p className="text-4xl font-bold text-customBlue ">
        Why Choose Us{" "}
        <span className=" inline-block ml-3 w-12 h-[2px] bg-customeRed"></span>
      </p>

      <p className="text-base font-light mb-12 mt-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In modi dicta
        maiores sunt rem veritatis temporibus provident porro sed sint saepe,
        nemo fuga est nostrum aliquid consectetur a ipsam asperiores?
      </p>

      <div className='' >
        <div className='flex items-center gap-8 mb-4 border-b pb-4 max-w-[500px]' >
        <EngineeringOutlinedIcon className='w-[50px] h-[49px] text-customeRed'/>
        <p className='text-2xl font-semibold text-customBlue'>Certified Expert Mechanics</p>
        </div>
        <div className='flex items-center gap-8 mb-4 border-b pb-4 max-w-[500px]'>
        <BuildOutlinedIcon className='w-[50px] h-[49px] text-customeRed'/>
        <p className='text-2xl font-semibold text-customBlue'>Fast And Quality Service</p>
        </div>
        <div className='flex items-center gap-8 mb-4 border-b pb-4 max-w-[500px]'>
        <SellOutlinedIcon className='w-[50px] h-[49px] text-customeRed'/>
        <p className='text-2xl font-semibold text-customBlue'>Best Price in Town</p>
        </div>
        
        <div className='flex items-center gap-8 mb-4 border-b pb-4 max-w-[500px]'>
        <EmojiEventsOutlinedIcon className='w-[50px] h-[49px] text-customeRed'/>
        <p className='text-2xl font-semibold text-customBlue'>Awarded Workshop</p>
        </div>
        

      </div>
    </div>
  );
}

export default LeftComponent;
