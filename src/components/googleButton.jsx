import { FcGoogle } from "react-icons/fc";
export default function Button() {
    return (
        <div className="">
            <button className="w-full py-3 flex items-center justify-center text-sm font-semibold text-white uppercase bg-red-600 shadow hover:bg-red-700 duration-100 ease-in-out hover:shadow-lg active:bg-red-900 rounded">
                <FcGoogle className="bg-white rounded-full  mr-1 text-2xl" /> Continue with google
            </button>
        </div>
    );
}
