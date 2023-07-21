import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import logo from "../assets/home.png";
function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    }, [auth]);
    function change(params) {
        if (params === location.pathname) return true;
    }

    const navigation = (value) => {
        navigate(value);
    };

    return (
        <>
            <div className="sticky top-0 bg-white border-b shadow-md z-10 ">
                <header className="flex items-center justify-between  mx-auto max-w-[1400px] px-2">
                    <div>
                        <img src={logo} onClick={() => navigation("/")} alt="Home logo" className="h-8 cursor-pointer " />
                    </div>
                    <div>
                        <ul className="flex ; space-x-9 ">
                            <li
                                className={` py-4 cursor-pointer text-gray-400  border-b-4 text-sm font-semibold border-transparent ${change("/") && "text-stone-700 border-b-purple-500"}`}
                                onClick={() => {
                                    navigation("/");
                                }}
                            >
                                {" "}
                                Home{" "}
                            </li>

                            <li
                                className={`py-4 cursor-pointer text-gray-400  border-b-4 text-sm font-semibold border-transparent ${change("/offers") && "text-stone-700 text-black border-b-purple-500"}`}
                                onClick={() => {
                                    navigation("/offers");
                                }}
                            >
                                Offers
                            </li>
                            <li
                                className={`py-4 cursor-pointer text-gray-400  border-b-4 text-sm font-semibold border-transparent ${(change("/sign-in") || change("/profile")) && "text-stone-700 border-b-purple-500"}`}
                                onClick={() => {
                                    if (loggedIn) {
                                        navigation("/profile");
                                    } else {
                                        navigation("/sign-in");
                                    }
                                }}
                            >
                                {loggedIn ? "Profile" : "Sign In"}
                            </li>
                        </ul>
                    </div>
                </header>
            </div>
        </>
    );
}
export default Header;
