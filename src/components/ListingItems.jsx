import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationOn } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
function ListingItems(prop) {
    let { listing, onDelete, onEdit } = prop;

    return (
        <>
            {listing.length > 0 && (
                <div className="max-w-6xl mx-auto ">
                    <h1 className="my-6 text-2xl font-semibold text-center">My Listings</h1>
                    <ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
                        {listing.map((l) => {
                            let list = l.data;
                            return (
                                <li key={l.id} className=" my-8 z-0  relative bg-white   shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
                                    <Link to={`/category/${list.sellOrRent}/${l.id}`} className="contents">
                                        <img src={`${list.imgUrls[0]}`} className="h-[230px] w-full object-cover hover:scale-105 transition ease-in-out duration-150" loading="lazy" />
                                        <Moment fromNow className="shadow-lg font-semibold text-xs uppercase top-3 rounded left-3 text-white px-2 py-1 bg-purple-600 absolute z-1">
                                            {list.time.toDate()}
                                        </Moment>
                                        <div className="ml-2">
                                            <div className="flex space-x-1 font-semibold  items-center ">
                                                <MdLocationOn className="text-green-500 text-lg" />
                                                <p className="truncate">{list.address}</p>
                                            </div>
                                            <p className="font-bold text-lg truncate mt-1">{list.name}</p>
                                            <div className="text-blue-400 font-semibold mt-2">
                                                {list.sellOrRent == "rent" ? <div>&#8377;{list.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/Month</div> : <div>&#8377;{list.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>}
                                            </div>
                                            <div className="items-center flex space-x-2 font-semibold text-sm my-1">
                                                <p>Beds - {list.bedrooms} </p>
                                                <p>Bath - {list.bathrooms}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <p className="flex space-x-1 items-center absolute bottom-1 right-2">
                                        <BiSolidEdit
                                            onClick={() => {
                                                onEdit(l.id);
                                            }}
                                            className="cursor-pointer"
                                        />

                                        <AiFillDelete className="text-red-500 cursor-pointer" onClick={() => onDelete(l.id)} />
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}

export default ListingItems;
