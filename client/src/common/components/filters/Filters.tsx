import React, { useState, useEffect, useRef } from "react";
import cx from "classnames";
import useArrayFilter from "../../../hooks/useArrayFilter";

const Filters = ({ queryOptions, showFilters, handleCategoryChanged, handleRegionChanged }: any) => {
    const [state, updateState] = useState({
        showRegionSelector: false,
        showPeriodSelector: false,
        showCategorySelector: false
    } as any);

    const [searchTerm, updateSearchTerm] = useState({
        region: "",
        category: ""
    });

    const categories = useArrayFilter(queryOptions.activeCategory.id, "categories", searchTerm.category);
    const regions = useArrayFilter(queryOptions.activeRegion.code, "regions", searchTerm.region);

    const node = useRef<HTMLDivElement | null>(null);

    const toggleSelector = (selector: string, e: any) => {
        if (e.target.type !== "text") {
            updateState((prevState: any) => {
                const { [selector]: selectedSelector, ...otherSelectors } = prevState;
                Object.keys(otherSelectors).forEach(key => {
                    otherSelectors[key] = false;
                });
                return {
                    ...prevState,
                    ...otherSelectors,
                    [selector]: !state[selector]
                }
            })
        }
    }

    const handleSearchTermChange = (e: any) => {
        const target = e.target;
        updateSearchTerm((prevState: any) => {
            return { ...prevState, [target.name]: target.value }
        });
    }

    const regionSelected = (country: any) => {
        handleRegionChanged(country);
        updateSearchTerm((prevState: any) => {
            return { ...prevState, region: "" }
        });
    }

    const categorySelected = (category: any) => {
        handleCategoryChanged(category);
        updateSearchTerm((prevState: any) => {
            return { ...prevState, category: "" }
        });
    }

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (node && node.current && node.current.contains(e.target)) {
                // inside click
                return;
            }

            // outside click
            updateState((prevState: any) => {
                return {
                    ...prevState,
                    showRegionSelector: false,
                    showPeriodSelector: false,
                    showCategorySelector: false
                }
            })
        };

        if (state.showRegionSelector || state.showPeriodSelector || state.showCategorySelector) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [state]);

    return (
        <div ref={node} className={cx("flex justify-around justify-evenly mb-4", { "block": showFilters, "hidden": !showFilters })}>
            <div className="relative flex-1">
                <h3 className="font-medium mb-1">Region</h3>
                <button className="py-2 border border-gray-400 rounded-lg w-32 relative hover:shadow focus:outline-none w-full" onClick={e => { toggleSelector("showRegionSelector", e) }}>
                    <div className="flex items-center justify-between px-3">
                        <span className="text-gray-700 text-sm">{queryOptions.activeRegion.name}</span>
                        <svg
                            className="h-4 w-4 stroke-current text-gray-700 inline-block"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                    {state.showRegionSelector && (
                        <div className="absolute bg-white border border-gray-400 mt-4 z-10 shadow rounded-lg w-full">
                            <div className="mt-2 mx-2">
                                <input type="text" name="region" className="py-2 px-4 border border-gray-300 rounded-lg w-full focus:outline-none" value={searchTerm.region} onChange={handleSearchTermChange} />
                            </div>
                            <ul className="text-gray-700 text-sm text-left h-64 overflow-auto custom-scrollbar">
                                {regions.map(country => <li className="py-1 hover:bg-gray-100 px-3" key={country.code} onClick={() => regionSelected(country)}>{country.name}</li>)}
                            </ul>
                        </div>
                    )}
                </button>
            </div>

            <div className="relative flex-1 mx-4">
                <h3 className="font-medium mb-1">Period</h3>
                <button className="py-2 border border-gray-400 rounded-lg w-32 relative hover:shadow focus:outline-none w-full" onClick={e => { toggleSelector("showPeriodSelector", e) }}>
                    <div className="flex items-center justify-between px-3">
                        <span className="text-gray-700 text-sm">Past 12 months</span>
                        <svg
                            className="h-4 w-4 stroke-current text-gray-700 inline-block"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                    {state.showPeriodSelector && (
                        <div className="absolute bg-white border border-gray-400 mt-4 z-10 shadow rounded-lg w-full">
                            <ul className="text-gray-700 text-sm text-left custom-scrollbar">
                                <li className="py-1 hover:bg-gray-100 px-3">This week</li>
                                <li className="py-1 hover:bg-gray-100 px-3">This Year</li>
                            </ul>
                        </div>
                    )}
                </button>
            </div>

            <div className="relative flex-1">
                <h3 className="font-medium mb-1">Category</h3>
                <button className="py-2 border border-gray-400 rounded-lg w-32 relative hover:shadow focus:outline-none w-full" onClick={e => { toggleSelector("showCategorySelector", e) }}>
                    <div className="flex items-center justify-between px-3">
                        <span className="text-gray-700 text-sm">{queryOptions.activeCategory.text}</span>
                        <svg
                            className="h-4 w-4 stroke-current text-gray-700 inline-block"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                    {state.showCategorySelector && (
                        <div className="absolute bg-white border border-gray-400 mt-4 z-10 shadow rounded-lg w-full">
                            <div className="mt-2 mx-2">
                                <input type="text" name="category" className="py-2 px-4 border border-gray-300 rounded-lg w-full focus:outline-none" value={searchTerm.category} onChange={handleSearchTermChange} />
                            </div>
                            <ul className="text-gray-700 text-sm text-left h-64 overflow-auto custom-scrollbar">
                                {categories.map((category: any) => <li className="py-1 hover:bg-gray-100 px-3" key={category.id} onClick={() => categorySelected(category)}>{category.text}</li>)}
                            </ul>
                        </div>
                    )}
                </button>
            </div>
        </div>
    )
}

export default Filters;