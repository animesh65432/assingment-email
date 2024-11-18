import React from "react";
import { useDispatch } from "react-redux";
import { onchaengeFilter } from "../store/Slices/FilterSlices";

const Navbar: React.FC = () => {
    const dispatch = useDispatch();

    const onclickfilter = (filter: string) => {
        console.log(filter);
        dispatch(onchaengeFilter(filter));
    };

    return (
        <nav className="flex gap-3 mb-5 mt-10">
            <ul className="text-xl">
                <li>Filter By :</li>
            </ul>
            <ul className="flex gap-10 text-xl font-semibold">
                <li
                    className="hover:bg-slate-200 rounded-md cursor-pointer"
                    onClick={() => onclickfilter("Unread")}
                >
                    Unread
                </li>
                <li
                    className="hover:bg-slate-200 rounded-md cursor-pointer"
                    onClick={() => onclickfilter("Read")}
                >
                    Read
                </li>
                <li
                    className="hover:bg-slate-200 rounded-md cursor-pointer"
                    onClick={() => onclickfilter("Favorites")}
                >
                    Favorites
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
