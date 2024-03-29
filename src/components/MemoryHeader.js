import { IoChevronBackOutline } from "react-icons/io5";


export default function MemoryHeader({onSubmit}) {


    return (
        <div className="mt-2 max-w-sm mx-auto">

            <button
                type="button"
                className="h-6 ml-2"
                onClick={() => onSubmit()}
            >
                <IoChevronBackOutline className="w-6 h-6 " />
                
            </button>
            
        </div>
    )
}