import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'; 

export default function MemoryLogin() {
    const navigate = useNavigate();
    return (
       
        <div className="flex flex-col justify-center items-center px-6 my-auto h-full" >
            <div className="mx-auto w-full max-w-sm text-center ">
                <div className="flex justify-center">
                    <img src="/images/chalkak_logo.png" alt="Chalkak Logo" width="200px" />
                </div>
                <div className="text-center mt-6 text-2xl font-bold text-gray-600">
                    SNS 계정으로 로그인해주세요
                </div>
                <p className="mt-2 text-center text-sm text-gray-600">
                    계정이 없다면 자동으로 회원가입이 진행됩니다.
                </p>
            </div>
            <div className="mt-14 mx-auto w-[90%] max-w-sm">
                <div className="flex flex-col gap-3">
                    {/* <button
                        type="button"

                        className="text-white flex gap-2 bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
                    >
                        <AiOutlineGoogle className="w-6 h-6" />
                        Sign in with Google
                    </button>
                    <button
                        type="button"

                        className="text-white flex gap-3 bg-[#2db400] hover:bg-[#2db400]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
                    >
                        <SiNaver className="w-4 h-4" />
                        Sign in with Naver
                    </button> */}
                    <button
                        type="button"
                        className="text-black flex gap-2 bg-[#fef01b] hover:bg-[#fef01b]/90 font-medium rounded-full w-full px-5 py-4 text-center items-center justify-center"
                        onClick={() => navigate(`/memory/new`)}
                    >
                        <RiKakaoTalkFill className="w-6 h-6 " />
                        Sign in with Kakao
                    </button>
                </div>
            </div>
        </div>
    )
}