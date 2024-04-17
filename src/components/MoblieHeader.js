import { AiOutlineClose } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";

export default function MobileHeader({ isCloseBtn, closeEvent, handleMenubarClick }) {

    return (
        <div className='absolute flex flex-col gap-2 top-0 z-10 w-full h-14 bg-white p-5 pt-2'>
            <div className='flex justify-between'>
                <button onClick={() => handleMenubarClick()}>
                    <BiMenu className='size-5' />
                </button>

                <img className='w-[60px] pt-1' src="/images/chalkak_logo.png" alt="Chalkak Logo" />
                
                {isCloseBtn &&
                    <button onClick={() => closeEvent('mapSearch')}>
                        <AiOutlineClose className='size-5' />
                    </button>
                }
                {!isCloseBtn &&
                    <div className='size-5'></div>
                }

            </div>
        </div>
    )

}