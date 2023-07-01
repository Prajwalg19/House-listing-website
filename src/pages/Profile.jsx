import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { RiShoppingBagFill } from "react-icons/ri";
import { updateProfile, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router";
export default function Profile() {
    const auth = getAuth();
    const [editBut, setEditbut] = useState(true);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    const navigate = useNavigate();
    const { name, email } = formData;
    function SignOut() {
        try {
            const out = signOut(auth);
            toast.success(`Signed Out`, { position: "bottom-center", hideProgressBar: true, delay: 1200, theme: "dark" });
            navigate("/");
        } catch (e) {
            toast.error("Something went wrong", { position: "bottom-center", hideProgressBar: true, delay: 1200, theme: "dark" });
        }
    }

    function infoEdit(e) {
        // setFormData((prev) => ({ ...prev, [e.target.id]: [e.target.value] }));
    }

    return (
        <div>
            <div className="flex flex-col flex-wrap items-center justify-center max-w-6xl mx-auto ">
                <div className="my-6 text-3xl font-bold text-center ">My Profile</div>
                <form className="w-[95%] m-auto  md:w-[50%] ">
                    <input type="text" disabled={editBut} value={name} className={` w-full p-3 my-4 text-xl rounded transition ease-in-out border border-gray-400 bg-white text-gray-700 ${!editBut && "bg-[Bisque] "} `} onChange={infoEdit} />
                    <input type="text" value={email} className={`w-full p-3 my-4 text-xl rounded transition ease-in-out border-gray-400 bg-white ${!editBut && "bg-[Bisque] "}`} onChange={infoEdit} />
                    <div className="flex justify-between mt-1">
                        <p className="text-lg ">
                            Want to change your name?{" "}
                            <span
                                className="text-blue-600 cursor-pointer transition ease-in-out duration-100 hover:text-blue-800"
                                onClick={() => {
                                    setEditbut(!editBut);
                                }}
                            >
                                Edit
                            </span>{" "}
                        </p>
                        <p className="text-lg text-red-600  cursor-pointer hover:text-red-800 transition ease-in-out duration-100" onClick={SignOut}>
                            Sign out
                        </p>
                    </div>
                    <button className="rounded-md cursor-pointer flex p-4 mt-5 uppercase text-sm font-semibold bg-blue-600 text-white w-full justify-center flex-row-reverse transition duration-100 ease-in-out shadow-sm hover:shadow-lg active:bg-blue-800">
                        <RiShoppingBagFill className="text-lg rounded-full ml-2" /> Continue Shopping
                    </button>
                </form>
            </div>
        </div>
    );
}
// flex justify-between w-[95%] md:w-[50%]  m-auto
