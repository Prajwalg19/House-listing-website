import { collection, getDoc, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import ListingItems from "../components/ListingItems";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useParams } from "react-router";
function Category() {
    const [rentAll, setRentAll] = useState(null);
    const [sellAll, setSellAll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastIndex, setLastIndex] = useState(null);
    const { type } = useParams();
    useEffect(() => {
        async function fetch() {
            try {
                let docRef = collection(db, "listings");
                let q = query(docRef, where("sellOrRent", "==", `${type}`), orderBy("time", "desc"));
                let snapShots = await getDocs(q);
                let temp = [];
                snapShots.forEach((s) => {
                    temp.push({
                        id: s.id,
                        data: s.data(),
                    });
                });

                setLastIndex(snapShots.docs[snapShots.docs.length - 1]);
                if (type == "rent") {
                    setRentAll(temp);
                } else {
                    setSellAll(temp);
                }
                setLoading(false);
            } catch (e) {
                setLoading(false);
                toast.error("Couldn't load Offers");
            }
        }
        fetch();
    }, [type]);

    async function loadMore() {
        let docRef = collection(db, "listings");
        let q = query(docRef, where("sellOrRent", "==", `${type}`), orderBy("time", "desc"), startAfter(lastIndex)); //startAfter requires orderBy hence i am using it , startAt also doesn't work without orderBy as it gives an error of having many arguments given to the query function and lastIndex
        //is an object (snapShot) and not a index number
        let snapShots = await getDocs(q);
        let temp = [];
        snapShots.forEach((s) => {
            temp.push({
                id: s.id,
                data: s.data(),
            });
        });
        setLastIndex(snapShots.docs[snapShots.docs.length - 1]);
        if (sellAll) {
            setSellAll((prev) => [...prev, ...temp]);
        } else {
            setRentAll((prev) => [...prev, ...temp]);
        }
    }
    return (
        <>
            {loading ? (
                <Spinner />
            ) : rentAll && rentAll.length > 0 ? (
                <div className="max-w-7xl m-auto px-3 ">
                    <p className="text-3xl font-bold mt-4 mb-6 text-center">{type == "rent" ? "Houses For Rent" : "Houses for Sale"}</p>
                    <ListingItems listing={rentAll} />
                    {lastIndex && (
                        <p className="flex justify-center">
                            <button
                                onClick={() => {
                                    loadMore();
                                }}
                                className="px-2 py-1 bg-slate-200 text-black border border-gray-400 hover:bg-slate-300 active:bg-slate-400 transition ease-in-out hover:shadow-md rounded my-2 "
                            >
                                Load more
                            </button>
                        </p>
                    )}
                </div>
            ) : sellAll && sellAll.length > 0 ? (
                <div className="max-w-7xl m-auto px-3 ">
                    <p className="text-3xl font-bold mt-4 mb-6 text-center">{type == "rent" ? "Houses For Rent" : "Houses for Sale"}</p>
                    <ListingItems listing={sellAll} />
                    {lastIndex && (
                        <p className="flex justify-center">
                            <button
                                onClick={() => {
                                    loadMore();
                                }}
                                className="px-2 py-1 bg-slate-200 text-black border border-gray-400 hover:bg-slate-300 active:bg-slate-400 transition ease-in-out hover:shadow-md rounded my-2 "
                            >
                                Load more
                            </button>
                        </p>
                    )}
                </div>
            ) : (
                <div>No Places for {type == "rent" ? "Rent" : "Sale"}</div>
            )}
        </>
    );
}

export default Category;

// <> </> this is called empty fragment
