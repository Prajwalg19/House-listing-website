import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/matchers";
export default function Button() {
    const navigate = useNavigate();
    async function SignUpFunc() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            const window = await signInWithPopup(auth, provider);
            const user = window.user;
            const docr = doc(db, "users", user.uid);
            const isDocThere = await getDoc(docr);
            if (!isDocThere.exists()) {
                await setDoc(docr, { name: user.displayName, email: user.email, time: serverTimestamp() });
            }
            toast.success("Successfully Signed in", { position: "bottom-center", hideProgressBar: true });
            navigate("/");
        } catch (e) {
            toast.error("Something went wrong", { position: "bottom-center", hideProgressBar: true });
        }
    }
    return (
        <div className="">
            <button className="w-full py-3 flex items-center justify-center text-sm font-semibold text-white uppercase bg-red-600 shadow hover:bg-red-700 duration-100 ease-in-out hover:shadow-lg active:bg-red-900 rounded" onClick={SignUpFunc}>
                <FcGoogle className="bg-white rounded-full  mr-1 text-2xl" /> Continue with google
            </button>
        </div>
    );
}
