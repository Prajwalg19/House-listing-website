import { useParams } from "react-router";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import Spinner from "../components/Spinner";
import { HiShare } from "react-icons/hi";
import { MdLocationOn, MdChair } from "react-icons/md";
import { FaBed, FaBath, FaParking } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
function Listing() {
    let { id, type } = useParams();
    const [listing, setListing] = useState(null);
    let [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(null);
    const auth = getAuth();
    const [contactLandloard, setContactLandlord] = useState(true);
    SwiperCore.use([Autoplay, Navigation, Pagination]);
    useEffect(() => {
        async function addressFetch() {
            let docRef = doc(db, "listings", id);
            let DocSnap = await getDoc(docRef);
            let data = DocSnap.data();
            setListing(data);
            setLoading(false);
        }
        addressFetch();
    }, [type, id]);

    if (loading) {
        return <Spinner />;
    }
    return (
        <div>
            <Swiper slidesPerView={1} navigation pagination={{ type: "progressbar" }} effect="slide" modules={[EffectFade]} autoplay={{ delay: 3000 }}>
                {listing.imgUrls.map((i, index) => (
                    <SwiperSlide key={index}>
                        <div className="z-[-1] relative w-full overflow-hidden h-[300px] " key={index} style={{ background: ` url(${i}) no-repeat center`, backgroundSize: "cover" }}></div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="cursor-pointer fixed top-[13%]   right-[3%]  z-[1]">
                <HiShare
                    className="p-1 text-3xl text-black bg-white rounded-full"
                    onClick={() => {
                        window.navigator.clipboard.writeText(window.location.href);
                        setCopied(true);
                        setTimeout(() => {
                            setCopied(false);
                        }, 2000);
                    }}
                />
                {copied && <p className="fixed top-[16%] right-[6%]  whitespace-nowrap text-black bg-white rounded-md p-1">Link Copied</p>}
            </div>

            <div className="relative flex flex-col items-center justify-center max-w-6xl p-3 m-5 shadow-md md:flex-row bg-slate-50 space-y-3 md:space-y-0 md:mx-auto md:space-x-6 ">
                <div className="h-[500px] md:w-1/2 w-full top-2">
                    <p className="text-2xl font-medium text-blue-400 ">
                        {listing.name} <span> - &#8377;{listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span> {listing.sellOrRent == "rent" ? <span> / month</span> : ""}
                    </p>
                    <p className="flex space-x-3 justify-start   mt-3  items-center">
                        <MdLocationOn className="text-xl text-green-400" />
                        <span className="font-semibold">{listing.address}</span>
                    </p>
                    <div className="flex font-semibold space-x-4 justify-start w-[75%] mt-7 ">
                        <p className="w-[40%] bg-red-700 text-white text-center p-2 rounded-md">
                            For <span>{listing.sellOrRent}</span>
                        </p>
                        {listing.discountedPrice && (
                            <p className="w-[40%] bg-green-600 py-2  rounded-md text-white text-center whitespace-owrap">
                                &#8377; <span>{+listing.regularPrice - +listing.discountedPrice} discount</span>
                            </p>
                        )}
                    </div>
                    <p className="mt-3 text-sm  ">
                        <span className=" font-semibold ">Description</span> - <span className="">{listing.description}</span>
                    </p>
                    <p className="flex flex-wrap space-x-5 mt-7 items-center text-sm font-semibold">
                        {listing.bedrooms && (
                            <p className="flex space-x-1 items-center whitespace-nowrap">
                                <FaBed className="text-base" /> <span> {listing.bedrooms} Bed </span>
                            </p>
                        )}
                        {listing.bathrooms && (
                            <p className="flex space-x-1 items-center whitespace-nowrap">
                                <FaBath className="text-base" /> <span> {listing.bathrooms} Bathroom</span>
                            </p>
                        )}
                        <p className="flex space-x-1 items-center whitespace-nowrap">
                            <FaParking className="text-base" /> <span> {listing.parking ? "Parking spot" : "No parking"}</span>{" "}
                        </p>
                        <p className="flex space-x-1 items-center whitespace-nowrap">
                            <GiSofa className="text-base" /> <span> {listing.furnished ? <span>Furnished</span> : <span>Not Furnished</span>}</span>
                        </p>
                    </p>
                    {auth.currentUser?.uid != listing.userEmail && contactLandloard && (
                        <button
                            onClick={() => {
                                setContactLandlord(false);
                            }}
                            className=" bg-blue-600 text-white rounded-md  uppercase font-semibold text-base  w-full px-[16px] py-2  shadow-md hover:shadow-lg hover:bg-blue-700 active:bg-slate-800 mt-9"
                        >
                            Contact the Landlord
                        </button>
                    )}

                    {!contactLandloard && <Contact userReference={listing.userEmail} list={listing} />}
                </div>
                <div className=" h-[500px] md:w-1/2 w-full">
                    <MapContainer center={[listing.geoLat, listing.geolong]} zoom={13} scrollWheelZoom={false} className="w-full h-[100%]">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[listing.geoLat, listing.geolong]}>
                            <Popup>{listing.name}</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default Listing;
// [listing.Latitude, listing.Longitude]
