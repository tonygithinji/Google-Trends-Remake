import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
    return (
        <div className="bg-gray-300 pt-4">
            <div className="relative pl-4 pr-4">
                <h1 className="absolute">A Google Trends Remake</h1>
                <ul className="flex flex-row justify-center">
                    <li className="border-b-2 border-blue-400 text-gray-800 mx-2">
                        <Link to="/" className="pr-4 pl-4 pb-2">Explore</Link>
                    </li>
                    <li className="pr-4 pl-4 pb-2 border-b-2 text-gray-600 mx-2 hover:text-gray-800 hover:border-blue-400">
                        <Link to="" className="pr-4 pl-4 pb-2">Daily Trends</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
