import { useEffect, useState } from 'react';


export default function MemoryWrite( {title, buttonText, onSubmit}) {


    return(
        <div >
            <div className="mx-auto w-full max-w-sm text-center flex flex-col gap-5 ">
                <div className="text-center text-2xl font-bold">
                    { title }
                </div>
                <div className="w-[80%] max-w-sm  mx-auto border-b-2 border-gray-600 hover:border-[#96DBF4] py-2">
                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text"  aria-label="title" />
                </div>
            </div>
            
            <div className="mt-24 mx-auto w-[90%] max-w-sm">
                <div className="flex flex-col gap-3">

                    <button
                        type="button"
                        className="cloud-button" 
                        onClick={() => onSubmit()}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    )
}