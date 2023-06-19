import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/googleButton";
function ForgotPassword() {
    const [em, setEmail] = useState({
        email: "",
    });
    const { email } = em;
    function update(event) {
        setEmail((prev) => ({ ...prev, [event.target.id]: event.target.value }));
    }

    return (
        <div>
            <div>
                <h1 className="font-bold text-3xl text-center mt-[30px]">Forgot Password</h1>
                <div className="flex flex-wrap items-center justify-center   max-w-6xl m-auto py-14 ">
                    <div className="md:w-[67%] lg:w-[47%] w-[70%] mb-[80px] ">
                        <img src="https://img.freepik.com/premium-vector/computer-account-login-password_165488-5473.jpg" className="w-full rounded-2xl" alt="Image of Sign in" />
                    </div>
                    <div className="md:w-[67%] lg:w-[40%]  w-[70%] lg:ml-[75px] ">
                        <form>
                            <input type="email" placeholder="Email address" className="w-full pl-4 mb-4 text-xl text-gray-700 rounded-lg transition ease-in ease-out" value={email} id="email" onChange={update} />
                            <div></div>
                            <div className="flex mt-4 justify-between whitespace-nowrap text-sm lg:text-lg">
                                <p>
                                    Don't have an account?{" "}
                                    <Link to="/sign-up" className="ml-1 duration-200  ease-in-out hover:text-red-700 cursor-pointer inline-block text-red-600">
                                        Register
                                    </Link>
                                </p>
                                <p className="text-blue-600 cursor-pointer hover:text-blue-700">
                                    <Link to={"/sign-in"}>Sign In instead</Link>
                                </p>
                            </div>
                            <div>
                                <button type="submit" className="px-44 bg-blue-600 w-full text-white rounded-sm py-3 mt-3 text-sm font-semibold uppercase shadow hover:bg-blue-700 duration-150 hover:shadow-lg active:bg-blue-800   whitespace-nowrap">
                                    Reset Password
                                </button>
                                <p className="text-center my-3">OR</p>
                                <OAuth />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            );
        </div>
    );
}

export default ForgotPassword;
