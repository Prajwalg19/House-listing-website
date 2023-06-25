import { useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/googleButton";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const auth = getAuth(); //authentication for firebase using email and password
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const { email, password, name } = formData;
    function update(event) {
        setFormData((prev) => ({ ...prev, [event.target.id]: event.target.value }));
    }
    const nav = useNavigate();
    async function onSubmit(e) {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, {
                displayName: name,
            });
            const formDataCopy = { ...formData };
            delete formDataCopy.password;
            await setDoc(doc(db, "users", userCredential.user.uid), formDataCopy);
            console.log(auth.currentUser);
            nav("/");
        } catch (e) {
            console.log(e);
        }
    }
    console.log("firestore", db);
    return (
        <div>
            <h1 className="font-bold text-3xl text-center mt-[30px]">Sign Up </h1>
            <div className="flex flex-wrap items-center justify-center   max-w-6xl m-auto py-14 ">
                <div className="md:w-[67%] lg:w-[47%] w-[70%] mb-[80px] ">
                    <img src="https://img.freepik.com/premium-vector/computer-account-login-password_165488-5473.jpg" className="w-full rounded-2xl" alt="Image of Sign in" />
                </div>
                <div className=" md:w-[67%] lg:w-[40%]  w-[70%] lg:ml-[75px] ">
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Full name" id="name" onChange={update} value={name} className="form-input w-full mb-4 rounded-lg text-xl text-gray-700 pl-4" />
                        <input type="email" placeholder="Email address" className="w-full pl-4 mb-4 text-xl text-gray-700 rounded-lg transition ease-in ease-out" value={email} id="email" onChange={update} /> <br />
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full pl-4 text-xl border-gray-500 rounded-lg " id="password" value={password} onChange={update} />
                            {showPassword ? <AiFillEyeInvisible className="cursor-pointer absolute top-3 right-3" onClick={() => setShowPassword((pre) => !pre)} /> : <AiFillEye className="cursor-pointer absolute top-3 right-3" onClick={() => setShowPassword((prev) => !prev)} />}
                        </div>
                        <div className="flex mt-4 justify-between whitespace-nowrap text-sm lg:text-lg">
                            <p>
                                Have an account?
                                <Link to="/sign-in" className="ml-1 duration-200  ease-in-out hover:text-red-700 cursor-pointer inline-block text-red-600">
                                    {" "}
                                    Sign In
                                </Link>
                            </p>
                            <p className="text-blue-600 cursor-pointer hover:text-blue-700">
                                <Link to={"/forgot-password"}>Forgot Password? </Link>
                            </p>
                        </div>
                        <div>
                            <button type="submit" className="px-44 bg-blue-600 w-full text-white rounded-sm py-3 mt-3 text-sm font-semibold uppercase shadow hover:bg-blue-700 duration-150 hover:shadow-lg active:bg-blue-800   ">
                                {" "}
                                Sign Up
                            </button>
                            <p className="text-center my-3">OR</p>
                            <OAuth />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
