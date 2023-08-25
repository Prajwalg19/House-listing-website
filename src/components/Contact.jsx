import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
function Contact(prop) {
    const { list, userReference } = prop;
    const [landlord, setLandloard] = useState(null);
    const [message, setMessage] = useState({
        msg: "",
    });
    const { msg } = message;
    useEffect(() => {
        async function retrieve() {
            const docRef = doc(db, "users", userReference);
            const snap = await getDoc(docRef);
            const Snapshot = snap.data();
            setLandloard(Snapshot);
        }
        retrieve();
    }, [userReference]);
    function onChange(e) {
        setMessage((prev) => ({
            ...prev,
            msg: e.target.value,
        }));
    }
    return (
        <>
            {landlord != null && (
                <div className="mt-3">
                    <div className="mb-2 text-sm font-semibold ">
                        Contact {landlord.name} about the {list.name}
                    </div>
                    <textarea id="message" placeholder="Write you message here" className="w-full border border-gray-300 rounded-md transition ease-in-out " value={msg} onChange={onChange} rows="2"></textarea>
                    <a href={`mailto:${landlord.email}?Subject=${list.name}&body=${msg}`}>
                        <button type="" className="bg-blue-600 text-white rounded-md mt-2 uppercase font-semibold text-base  w-full px-[16px] py-1  shadow-md hover:shadow-lg hover:bg-blue-700 active:bg-slate-800">
                            Submit
                        </button>
                    </a>
                </div>
            )}
        </>
    );
}
export default Contact;
