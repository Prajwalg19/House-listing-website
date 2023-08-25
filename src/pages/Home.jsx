import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingItems from "../components/ListingItems";
import { Link } from "react-router-dom";
function Home() {
    const [offers, setOffers] = useState(null);
    const [rent, setRent] = useState(null);
    const [sale, setSale] = useState(null);
    useEffect(() => {
        async function fetchOffer() {
            let docRef = collection(db, "listings");
            let q = query(docRef, where("offer", "==", true), limit(4));
            let snapShots = await getDocs(q);
            let temp = [];
            snapShots.forEach((t) => {
                temp.push({
                    id: t.id,
                    data: t.data(),
                });
            });
            setOffers(temp);
        }
        fetchOffer();
    }, []);

    useEffect(() => {
        async function fetchRent() {
            let docRef = collection(db, "listings");
            let q = query(docRef, where("sellOrRent", "==", "rent"), limit(4));
            let snapShots = await getDocs(q);
            let temp = [];
            snapShots.forEach((s) => {
                temp.push({
                    id: s.id,
                    data: s.data(),
                });
            });
            setRent(temp);
        }
        fetchRent();
    }, []);

    useEffect(() => {
        async function fetchSale() {
            let docRef = collection(db, "listings");
            let q = query(docRef, where("sellOrRent", "==", "sell"), limit(4));
            let snapShots = await getDocs(q);
            let temp = [];
            snapShots.forEach((s) => {
                temp.push({
                    id: s.id,
                    data: s.data(),
                });
            });
            setSale(temp);
        }
        fetchSale();
    }, []);

    return (
        <div>
            <Slider />
            {offers &&
                offers.length > 0 && ( //when a value is null and it doesn't access any of it's properties then react just takes it as false and doesn't render the code that's dependent on the value like offers in this case. Offers will get filled after the useEffect which will cause a
                    //re-render causing the components to be displayed
                    <div className="max-w-6xl m-auto justify-center my-3 ">
                        <div className="mt-5">
                            <p className="text-2xl font-semibold ml-3 text-black">Recent Offers</p>
                            <Link to="/offers" className="text-blue-500 ml-3 hover:text-blue-700 transition ease-in-out ">
                                Show more offers
                            </Link>
                            <ListingItems listing={offers} />
                        </div>
                    </div>
                )}

            {rent && rent.length > 0 && (
                <div className="max-w-6xl m-auto justify-center my-3 ">
                    <div className="mt-5">
                        <p className="text-2xl font-semibold ml-3 text-black">Houses for Rent</p>
                        <Link to="/category/rent" className="text-blue-500 ml-3 hover:text-blue-700 transition ease-in-out ">
                            Show more houses for Rent
                        </Link>
                        <ListingItems listing={rent} />
                    </div>
                </div>
            )}

            {sale && sale.length > 0 && (
                <div className="max-w-6xl m-auto justify-center my-3 ">
                    <div className="mt-5">
                        <p className="text-2xl font-semibold ml-3 text-black">Houses for Sale</p>
                        <Link to="/category/sell" className="text-blue-500 ml-3 hover:text-blue-700 transition ease-in-out ">
                            Show more houses for Sale
                        </Link>
                        <ListingItems listing={sale} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
