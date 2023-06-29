import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { RiShoppingBagFill } from "react-icons/ri";
export default function Profile() {
    const auth = getAuth();
    console.log(auth);
    const [formData, setFormData] = useState({
        name: "Boom",
        email: "Boom@gmail.com",
    });
    const { name, email } = formData;
    return (
        <div>
            <div className="flex flex-col flex-wrap items-center justify-center max-w-6xl mx-auto">
                <div className="my-6 text-3xl font-bold text-center ">My Profile</div>
                <form className="w-[95%] m-auto  md:w-[50%] ">
                    <input type="text" placeholder={name} className=" w-full p-3 my-4 text-xl rounded transition ease-in-out border border-gray-400 bg-white text-gray-700" />
                    <input type="text" placeholder={email} className="w-full p-3 my-4 text-xl rounded transition ease-in-out border-gray-400 bg-white" />
                    <div className="flex justify-between mt-1">
                        <p className="text-lg ">
                            Want to change your name? <span className="text-blue-600 cursor-pointer transition ease-in-out duration-100 hover:text-blue-800">Edit</span>{" "}
                        </p>
                        <p className="text-lg text-red-600  cursor-pointer hover:text-red-800 transition ease-in-out duration-100">Sign out</p>
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
