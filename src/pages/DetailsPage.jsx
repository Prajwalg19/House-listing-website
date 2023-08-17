import { getAuth } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router";
import { uuidv4 } from "@firebase/util";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
function DetailsPage() {
    const auth = getAuth();
    const [loading, setLoading] = useState(false);
    const store = getStorage();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        sellOrRent: "rent",
        name: "Prajwal",
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: false,
        discountedPrice: 0,
        bedrooms: 1,
        bathrooms: 2,
        regularPrice: 0,
        images: {},
        Latitude: 0,
        Longitude: 0,
    });
    const { Longitude, Latitude, images, regularPrice, address, sellOrRent, name, parking, furnished, description, offer, discountedPrice, bedrooms, bathrooms } = formData;
    const onChange = (e) => {
        e.preventDefault();
        let boolean = null;
        //images
        if (e.target.files) {
            setFormData((prev) => ({
                ...prev,
                images: e.target.files,
            }));
        }
        //text, button , number
        if (e.target.value === "true") {
            //even tho the value is fasle or true it is returned in form of string that needs to be converted
            boolean = true;
        }
        if (e.target.value === "false") {
            boolean = false;
        }
        if (!e.target.files) {
            setFormData((pre) => ({
                ...pre, //the object property key if it is dynamic or substitutable should be contained within the sqaure brackets
                [e.target.id]: boolean ?? e.target.value, //coalescing operator, returns the first non null or non undefined value
            }));
        }
    };

    async function onSubmit(e) {
        e.preventDefault();
        console.log(images);
        if (images.length > 6) {
            console.log(images);
            toast.error("more than 6 images were uploaded");
            return;
        }
        if (+discountedPrice >= +regularPrice) {
            toast.error("Discount price is greater than normal price ");
            return;
        }
        async function storeImages(image) {
            return new Promise((resolve, reject) => {
                const reference = ref(store, `${auth.currentUser.uid}${image.name}-${uuidv4()}`);
                const upload = uploadBytesResumable(reference, image);
                upload.on(
                    "state_changed",
                    (snap) => {
                        // const rate = (snap.bytesTransferred / snap.totalBytes) * 100;
                        // switch (rate) {
                        //     case "paused":
                        //         console.log(snap.state + "Paused");
                        //         break;
                        //     case "resumed":
                        //         console.log(snap.state + "resumed");
                        //         break;
                        //     default:
                        //         console.log("other state : " + snap.state);
                        // }  //optional code
                    },
                    (e) => {
                        reject(e);
                    },
                    () => {
                        getDownloadURL(upload.snapshot.ref).then((downUrl) => {
                            resolve(downUrl);
                        });
                    }
                );
            });
        }
        setLoading(true);
        let imgarr = Object.values(images);
        const imgUrls = await Promise.all(imgarr.map((image) => storeImages(image))).catch((e) => {
            //all method of promise takes in a iterator and executes then if all promises are resolved , if just one reject occurs then catch is executed
            toast.error("Image upload went wrong");
            setLoading(false);
            return;
        });
        const formDataCopy = {
            ...formData,
            imgUrls,
            time: serverTimestamp(),
            userEmail: auth.currentUser.uid,
        };
        try {
            !offer && delete formDataCopy.discountedPrice;
            delete formDataCopy.images;
            const DocumentId = await addDoc(collection(db, "listings"), formDataCopy); //returns the id assigned by the firebase for the document of the listing
            setLoading(false);
            navigate(`/category/${formData.sellOrRent}/${DocumentId.id}`);
            toast.success("Created Listing");
        } catch (e) {
            toast.error(e);
            return;
        }
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <div>
                <form onSubmit={onSubmit} className="max-w-lg px-2 py-4 m-auto mb-4">
                    <h1 className="my-6 text-3xl font-bold text-center">Create Listing</h1>
                    <div>
                        <p className="mb-1 font-semibold text-md">Sell / Rent</p>
                        <div className="flex space-x-2">
                            <button
                                value="sell"
                                id="sellOrRent"
                                className={`transition ease-in-out uppercase w-full px-4 py-2  shadow-md font-semibold rounded hover:shadow-xl ${sellOrRent === "sell" ? "bg-purple-800 active:bg-purple-900 text-slate-100 " : "bg-white text-black "}`}
                                onClick={onChange}
                            >
                                {" "}
                                sell
                            </button>
                            <button
                                value="rent"
                                id="sellOrRent"
                                className={`  px-4 py-2 transition ease-in-out uppercase w-full shadow-md font-semibold rounded hover:shadow-xl ${sellOrRent === "rent" ? "bg-purple-800 text-slate-100 active:bg-purple-900" : "bg-neutral-100 text-black"}`}
                                onClick={onChange}
                            >
                                rent
                            </button>
                        </div>
                    </div>

                    <div className="mt-2 ">
                        <p className="mb-1 font-semibold text-md">Name</p>
                        <div>
                            <input type="text" id="name" placeholder="Name" required maxLength="30" minLength="6" value={name} className="w-full px-4 py-2 mt-1 border-gray-300 rounded focus:border-slate-400 transition ease-in-out" onChange={onChange} />
                        </div>
                    </div>

                    <div className="flex items-center mt-2 space-x-2">
                        <div className="w-full">
                            <p className="mb-1 font-semibold text-md">Beds</p>
                            <input type="number" id="bedrooms" onChange={onChange} value={bedrooms} max="50" min="1" required className="w-full text-center border border-gray-300 rounded focus:border-gray-600 " />
                        </div>
                        <div className="w-full">
                            <p className="mb-1 font-semibold text-md">Baths</p>
                            <input type="number" id="bathrooms" value={bathrooms} onChange={onChange} max="50" min="1" required className="w-full text-center border border-gray-300 rounded" />
                        </div>
                    </div>

                    <div className="mt-2 ">
                        <p className="mb-1 font-semibold text-md">Parking spot</p>
                        <div className="flex font-semibold space-x-2">
                            <button value={true} id="parking" className={`px-4 py-2 w-full  transition ease-in-out hover:shadow-lg  shadow-md rounded ${parking ? "bg-purple-800 active:bg-purple-900 text-white " : "bg-white text-black"}`} onClick={onChange}>
                                Yes
                            </button>
                            <button className={`px-4 py-2 w-full rounded shadow-md hover:shadow-lg transition ease-in-out ${!parking ? "active:bg-purple-900 bg-purple-800 text-white" : "bg-white text-black"}`} onClick={onChange} value={false} id="parking">
                                No
                            </button>
                        </div>
                    </div>
                    <div className="mt-2 ">
                        <p className="mb-1 font-semibold text-md">Furnished</p>
                        <div className="flex font-semibold space-x-2">
                            <button className={`px-4 py-2 w-full  transition ease-in-out hover:shadow-lg  shadow-md rounded ${furnished ? "bg-purple-800 active:bg-purple-900 text-white " : "bg-white text-black"}`} onClick={onChange} id="furnished" value={true}>
                                Yes
                            </button>
                            <button className={`px-4 py-2 w-full rounded shadow-md hover:shadow-lg transition ease-in-out ${!furnished ? "active:bg-purple-900 bg-purple-800 text-white" : "bg-white text-black"}`} onClick={onChange} id="furnished" value={false}>
                                No
                            </button>
                        </div>
                    </div>

                    <p className="mt-2 mb-1 font-semibold text-md">Address</p>
                    <textarea type="text" required className="w-full px-4 border border-gray-400 rounded transition ease-in-out " id="address" onChange={onChange} value={address} placeholder="address"></textarea>
                    <p className="mt-2 mb-1 font-semibold text-md">Description</p>
                    <textarea type="text" required className="w-full px-4 border border-gray-400 rounded transition ease-in-out " id="description" onChange={onChange} value={description} placeholder="description"></textarea>

                    {
                        <>
                            <div className="flex w-full my-2 space-x-2 ">
                                <div className="w-full">
                                    <p className="pb-1 font-semibold text-md ">Latitude</p>
                                    <input type="number" id="Latitude" required min="-90" onChange={onChange} max="90" value={Latitude} className="w-full text-center border border-gray-300 rounded transition ease-in-out" />{" "}
                                </div>
                                <div className="w-full">
                                    <p className="pb-1 font-semibold text-md ">Longitude</p>
                                    <input type="number" id="Longitude" required min="-180" max="180" onChange={onChange} value={Longitude} className="w-full text-center border border-gray-300 rounded transition ease-in-out" />
                                </div>
                            </div>
                        </>
                    }

                    <p className="mt-2 font-semibold text-md">Offer</p>
                    <div className="flex mt-1 font-semibold space-x-2">
                        <button value={true} id="offer" onClick={onChange} className={`transition ease-in-out uppercase py-2 w-full shadow-md hover:shadow-lg rounded ${offer ? "bg-purple-800 text-white" : "bg-white text-black"}`}>
                            Yes
                        </button>
                        <button onClick={onChange} id="offer" value={false} className={`transition ease-in-out uppercase py-2 w-full shadow-md hover:shadow-lg rounded ${!offer ? "bg-purple-800 text-white" : "bg-white text-black"}`}>
                            No
                        </button>
                    </div>
                    <p className="mt-2 mb-1 font-semibold text-md">Regular Price</p>
                    <div className="flex items-center space-x-6">
                        <input type="number" required onChange={onChange} id="regularPrice" value={regularPrice} min="50" className="w-full text-center border border-gray-400 rounded transition ease-in-out" />
                        {sellOrRent === "rent" ? <div className="w-full font-medium text-md whitespace-nowrap">&#8377; / Month </div> : <div className="w-full [visibility:hidden]"></div>}
                    </div>

                    {offer ? (
                        <>
                            <p className="mt-2 mb-1 font-semibold text-md">Discounted Price </p>
                            <span className="flex items-center space-x-6">
                                <input id="discountedPrice" type="number" required={offer} min="50" max="400000000" value={discountedPrice} onChange={onChange} className="w-full text-center border border-gray-400 roudned transition ease-in-out" />{" "}
                                {sellOrRent === "rent" ? <span className="w-full">&#8377; / Month</span> : <div className="w-full [visibility:hidden]"></div>}
                            </span>
                        </>
                    ) : (
                        <div className="hidden"></div>
                    )}

                    <p className="mt-2 mb-1 font-semibold text-md">Images</p>
                    <p className="mb-1 text-sm">First image will be the cover (Max 6)</p>
                    <input type="file" onChange={onChange} id="images" multiple required accept=" .jpg, .jpeg, .png" className="w-full px-2 py-2 bg-white" alt="sorry" />

                    <input type="submit" value="Create Listing" className="w-full py-2 mt-6 font-semibold text-white uppercase bg-blue-700 rounded shadow text-md hover:shadow-lg active:bg-blue-900 hover:bg-blue-800 transition ease-in-out" />
                </form>
            </div>
        </>
    );
}

export default DetailsPage;
//
//difference between the
//doc () , collection() , setDoc() and the addDoc()
// doc() : this method provides the reference to a specific document
// collection () : this method just provides the reference to the collection and not path to the specific document in the collection
// setDoc(firestore_instance , data) : this method sets the document with given data. It needs the specific full path to the document as it doesn't set the Id by itself
// addDoc() : this method creates the document and doesn't require the full path or reference to the document as it can set the id by autogeneration.
//
// generally the setDoc() and doc()  are used together same as addDoc() and collection()
//
