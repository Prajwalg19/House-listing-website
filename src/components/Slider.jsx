import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, EffectFade, Navigation } from "swiper";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
function Slider() {
    SwiperCore.use([Pagination, Autoplay, Navigation, EffectFade]);
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetch() {
            let docsRef = collection(db, "listings");
            let q = query(docsRef, limit(6));
            let snapShots = await getDocs(q);
            let list = [];
            snapShots.forEach((i) => {
                list.push({
                    id: i.id,
                    data: i.data(),
                });
            });
            setListings(list);
            setLoading(false);
        }
        fetch();
    }, []);
    if (loading) {
        return <Spinner />;
    }
    if (listings.length == 0) {
        return <></>;
    }

    return (
        <>
            <Swiper slidesPerView={1} pagination={{ type: "bullets" }} autoplay navigation effect="slide">
                {listings.map(({ id, data }) => (
                    <SwiperSlide key={id}>
                        {" "}
                        <div
                            onClick={() => {
                                navigate(`/category/${data.sellOrRent}/${id}`);
                            }}
                            style={{
                                background: `url(${data.imgUrls[0]}) center, no-repeat`,
                                backgroundSize: "cover",
                            }}
                            className="cursor-pointer relative w-full h-[400px] overflow-hidden"
                        >
                            <div className="absolute px-2 py-1 font-semibold text-white bg-blue-500 top-2 left-2 rounded-br-xl rounded-tl-xl opacity-80 ">{data.name} </div>
                            <div className="absolute px-2 py-1 font-semibold text-white bg-red-500 bottom-2 left-2 rounded-bl-xl rounded-tr-xl opacity-80 ">
                                &#8377;{data.discountPrice ?? data.regularPrice} {data.sellOrRent == "rent" && " / Month"}{" "}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

export default Slider;
