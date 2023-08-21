import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { TbListDetails } from "react-icons/tb";
import { updateProfile, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import ListingItems from "../components/ListingItems";
export default function Profile() {
    const auth = getAuth();
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    const navigate = useNavigate();
    const { name, email } = formData;
    const [listing, setListing] = useState("");
    async function onDelete(list) {
        const docs = doc(db, "listings", list);
        if (window.confirm("Do you want to delete it? ")) {
            let f = await deleteDoc(docs);

            let i = 0;
            let form = [...listing];
            form.forEach((l) => {
                if (l.id == list) {
                    form.splice(i, 1);
                }
                i++;
            });
            setListing(form);
            toast.success("Deleted listing successfully");
        }
    }

    function onEdit(list) {
        navigate(`/edit/${list}`);
    }

    function SignOut() {
        try {
            const out = signOut(auth);
            toast.success("Signed Out", {
                position: "bottom-center",
                hideProgressBar: true,
                delay: 1200,
                theme: "dark",
            });
            navigate("/");
        } catch (e) {
            toast.error("Something went wrong", {
                position: "bottom-center",
                hideProgressBar: true,
                delay: 1200,
                theme: "dark",
            });
        }
    }

    async function onSubmit() {
        if (auth.currentUser.displayName != name) {
            const docRef = doc(db, "users", auth.currentUser.uid);
            await updateProfile(auth.currentUser, { displayName: name });
            updateDoc(docRef, { name: name });
            toast.success("Updated successfully", {
                hideProgressBar: true,
                theme: "dark",
                position: "bottom-center",
            });
        } else {
            toast.error("Couldn't update the name", {
                hideProgressBar: true,
                theme: "dark",
                position: "bottom-center",
            });
        }
    }

    async function infoEdit(e) {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    useEffect(() => {
        async function List() {
            let ref = collection(db, "listings");
            let q = query(ref, where("userEmail", "==", auth.currentUser.uid));
            let docs = await getDocs(q); //returns the QuerySnapshot object , the QuerySnapshot contains documents called QueryDocumentSnapshots
            let temp = [];
            docs.docs.map((documents) => {
                return temp.push({
                    id: documents.id,
                    data: documents.data(),
                });
            });
            if (temp.length != 0) {
                setListing(temp);
            }
        }
        List();
    }, [auth.currentUser.uid]);
    return (
        <div>
            <div className="flex flex-col flex-wrap items-center justify-center max-w-6xl mx-auto ">
                <div className="my-6 text-3xl font-bold text-center ">My Profile</div>
                <form className="w-[95%] m-auto  md:w-[50%] ">
                    <input type="text" disabled={!editable} id="name" value={name} className={` w-full p-3 my-4 text-xl rounded transition ease-in-out border border-gray-400  text-gray-700 ${editable && "bg-rose-300  text-black"} `} onChange={infoEdit} />
                    <input type="text" value={email} id="email" className={`w-full p-3 my-4 text-xl rounded transition ease-in-out border-gray-400 bg-white `} disabled />
                    <div className="flex justify-between mt-1">
                        <div className="text-lg ">
                            Want to change your name?{" "}
                            <span
                                className="text-blue-600 cursor-pointer transition ease-in-out duration-100 hover:text-blue-800"
                                onClick={() => {
                                    editable && onSubmit(); //writing this before becuase if editable is true then we submit just before it becomes false
                                    //as the user clicks on apply changes
                                    setEditable(!editable);
                                }}
                            >
                                {editable ? "Apply changes" : "Edit"}
                            </span>{" "}
                        </div>
                        <div className="text-lg text-red-600 cursor-pointer hover:text-red-800 transition ease-in-out duration-100" onClick={SignOut}>
                            Sign out
                        </div>
                    </div>
                    <Link to="/details">
                        {" "}
                        <button className="flex flex-row-reverse items-center justify-center w-full p-4 mt-5 text-sm font-semibold text-white uppercase bg-blue-600 shadow-md cursor-pointer rounded-md transition duration-100 ease-in-out hover:shadow-xl active:bg-blue-800">
                            Create Listing
                            <TbListDetails className="mr-2 text-lg rounded-full" />
                        </button>
                    </Link>
                </form>
            </div>
            <div>
                <ListingItems listing={listing} onDelete={onDelete} onEdit={onEdit} />
            </div>
        </div>
    );
}
