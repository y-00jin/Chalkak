import { AiOutlineClose } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";

export default function MobileHeader({ isCloseBtn, closeEvent, setIsMobileMenubarOpen }) {

    return (
        <div className='absolute flex flex-col gap-2 top-0 z-10 w-full bg-white p-5 pt-2 pb-2'>
            <div className='flex justify-center'>
                <button className='absolute left-6 top-5' onClick={() => setIsMobileMenubarOpen((val) => !val)}>
                    <BiMenu className='size-7' />
                </button>

                <img className='w-[80px]' src="/images/chalkak_logo.png" alt="Chalkak Logo" />
                
                {isCloseBtn &&

                    <button className='absolute right-5 top-6' onClick={() => closeEvent('mapSearch')}>
                        <AiOutlineClose className='size-5' />
                    </button>
                
                
                }

            </div>
        </div>
    )

}