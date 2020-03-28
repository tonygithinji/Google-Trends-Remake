import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
    return (
        <div className="bg-gray-300 pt-4">
            <div className="relative pl-4 pr-4">
                <h1 className="absolute">A Google Trends Remake</h1>
                <ul className="flex flex-row justify-center">
                    <li className="text-gray-600 mx-2 text-center">
                        <NavLink to="/" exact className="pr-4 pl-4 pb-2 w-40 block border-b-2 hover:text-gray-800 hover:border-blue-400" activeClassName="border-blue-400 text-gray-800">Home</NavLink>
                    </li>
                    <li className="text-gray-600 mx-2 text-center">
                        <NavLink to="/explore" className="pr-4 pl-4 pb-2 w-40 block border-b-2 hover:text-gray-800 hover:border-blue-400" activeClassName="border-blue-400 text-gray-800">Explore</NavLink>
                    </li>
                    <li className="pr-4 pl-4 text-gray-600 mx-2 text-center">
                        <NavLink to="/daily-trends" className="pr-4 pl-4 pb-2 w-40 block border-b-2 hover:text-gray-800 hover:border-blue-400" activeClassName="border-blue-400 text-gray-800">Daily Trends</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};
