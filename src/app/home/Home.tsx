import React, { useState } from "react";
import cx from "classnames";
import { Redirect } from "react-router-dom";

const Home = () => {

    const [focus, updateFocus] = useState(false);
    const [query, updateQuerySubmitted] = useState({
        searchTerm: "",
        submitted: false
    });

    const handleInputFocus = (e: any) => {
        updateFocus(true);
    }

    const handleQuerySubmit = () => {
        updateQuerySubmitted({
            ...query,
            submitted: true
        });
    }

    const handleOnChange = (e: any) => {
        updateQuerySubmitted({
            ...query,
            searchTerm: e.target.value
        });
    }

    return (
        <>
            {query.submitted && <Redirect to={`/explore/?q=${query.searchTerm}`} />}
            <div className="flex justify-center mt-24">
                <div>
                    <h1 className="text-5xl text-gray-700 mb-10">What is the world searching?</h1>
                    <form onSubmit={handleQuerySubmit}>
                        <input type="text" value={query.searchTerm} onChange={handleOnChange} placeholder="Enter a search term and find out" className={cx("text-gray-700 bg-gray-100 border-2 border-gray-300 py-2 px-4 w-full h-16 rounded-lg focus:bg-white focus:border-gray-400 outline-none", {
                            "border-b-0": focus,
                            "rounded-b-none": focus
                        })} onFocus={handleInputFocus} />
                        {focus && (
                            <div className="bg-white text-gray-700 border-2 border-gray-400 rounded-b-lg -mt-2 h-64">
                                <ul>
                                    <li className="py-2 px-4 cursor-pointer hover:bg-gray-100">Search result 1</li>
                                    <li className="py-2 px-4 cursor-pointer hover:bg-gray-100">Search result 2</li>
                                    <li className="py-2 px-4 cursor-pointer hover:bg-gray-100">Search result 3</li>
                                </ul>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default Home;