import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import cx from "classnames";
import useAutocomplete from "../../hooks/useAutocomplete";

const Home = () => {

    const [query, updateQuerySubmitted] = useState({
        searchTerm: "",
        submitted: false
    });
    const autocompleteResults = useAutocomplete(query.searchTerm);

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
                        <input type="text" value={query.searchTerm} onChange={handleOnChange} placeholder="Enter a search term and find out" className={cx("text-gray-700 bg-gray-100 border-2 border-gray-300 py-2 px-4 w-full h-16 rounded-lg focus:bg-white focus:border-gray-400 focus:outline-none", {
                            "border-b-0": autocompleteResults && autocompleteResults.length > 0,
                            "rounded-b-none": autocompleteResults && autocompleteResults.length > 0
                        })} />
                        {autocompleteResults && autocompleteResults.length > 0 && (
                            <div className="bg-white text-gray-700 border-2 border-gray-400 border-t-0 rounded-b-lg -mt-2 overflow-auto" style={{ maxHeight: "20rem" }}>
                                <ul>
                                    {autocompleteResults.map((result: any) => (
                                        <li key={result.mid} className="py-2 px-4 cursor-pointer hover:bg-gray-100">
                                            <div>{result.title}</div>
                                            <div className="text-gray-500 text-sm">{result.type}</div>
                                        </li>
                                    ))}
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