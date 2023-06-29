import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    function change(params) {
        if (params === location.pathname) return true;
    }
    const navigation = (value) => {
        navigate(value);
    };
    return (
        <>
            <div className="sticky top-0 bg-white border-b shadow-md z-10">
                <header className="flex items-center justify-between  mx-auto max-w-[1400px]">
                    <div>
                        <img src="https://cdn.worldvectorlogo.com/logos/flipkart.svg" onClick={() => navigation("/")} alt="Flipkart Logo" className="h-8 cursor-pointer" />
                    </div>
                    <div>
                        <ul className="flex ; space-x-9 ">
                            <li
                                className={` py-4 cursor-pointer text-gray-400  border-b-4 text-sm font-semibold border-transparent ${change("/") && "text-stone-700 border-b-blue-500"}`}
                                onClick={() => {
                                    navigation("/");
                                }}
                            >
                                {" "}
                                Home{" "}
                            </li>

                            <li
                                className={`py-4 cursor-pointer text-gray-400  border-b-4 text-sm font-semibold border-transparent ${change("/offers") && "text-stone-700 text-black border-b-blue-500"}`}
                                onClick={() => {
                                    navigation("/offers");
                                }}
                            >
                                Offers
                            </li>
                            <li
                                className={`py-4 cursor-pointer text-gray-400  border-b-4 text-sm font-semibold border-transparent ${change("/sign-in") && "text-stone-700 border-b-blue-500"}`}
                                onClick={() => {
                                    navigation("/sign-in");
                                }}
                            >
                                Sign In
                            </li>
                        </ul>
                    </div>
                </header>
            </div>
        </>
    );
}
export default Header;
