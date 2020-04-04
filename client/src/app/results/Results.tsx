import React, { useState, useEffect } from "react";
import cx from "classnames";
import queryString from "query-string";
import { GoogleProperties } from "../../common/constants/constants";
import useArrayFilter from "../../hooks/useArrayFilter";
import useFetchQueryData from "../../hooks/useFetchQueryData";

const Results = (props: any) => {

    const [state, updateState] = useState({
        activeGoogleProperty: "",
        activeCategory: { text: "All Categories", id: 0 },
        activeRegion: { "code": "", "code3": "", "name": "Worldwide", "number": "" },
        showFilters: false,
        keyword: ""
    });

    const categories = useArrayFilter(state.activeCategory.id, "categories");
    const regions = useArrayFilter(state.activeRegion.code, "regions");
    // const data = useFetchQueryData(state);

    useEffect(() => {
        const query: any = queryString.parse(props.location.search);
        updateState(prevState => {
            return { ...prevState, keyword: query.q }
        });
    }, [props.location.search]);

    const changeActiveProperty = (property: string) => {
        updateState({
            ...state,
            activeGoogleProperty: property
        });
    }

    const toggleShowFilters = () => {
        updateState({
            ...state,
            showFilters: !state.showFilters
        });
    }

    const handleCategoryChanged = (category: any) => {
        updateState({
            ...state,
            activeCategory: category
        });
    }

    const handleRegionChanged = (region: any) => {
        updateState({
            ...state,
            activeRegion: region
        });
    }

    return (
        <>
            <h1 className="text-3xl text-center mt-6 mb-4">{state.keyword}</h1>
            <hr />
            <div className="my-6 relative">
                <ul className="flex justify-center">
                    {GoogleProperties.map((item, index) => {
                        return (
                            <li key={item.property}
                                className={cx("mx-4 px-4 py-1 text-sm cursor-pointer text-gray-600 hover:text-gray-800", {
                                    "bg-gray-200 rounded-full text-gray-800": state.activeGoogleProperty === item.property,
                                })}
                                onClick={() => changeActiveProperty(item.property)}
                            >
                                {item.text}
                            </li>
                        )
                    })}
                </ul>
                <button className={cx("absolute right-0 top-0 border border-gray-400 px-4 py-1 rounded-lg text-gray-800 focus:outline-none", { "bg-gray-200": state.showFilters })} onClick={toggleShowFilters}>Filters</button>
            </div>
            <div className={cx("flex justify-around justify-evenly", { "block": state.showFilters, "hidden": !state.showFilters })}>
                <div className="relative flex-1">
                    <h3 className="font-medium mb-1">Region</h3>
                    <button className="py-2 border border-gray-400 rounded-lg w-32 group hover:shadow focus:outline-none w-full">
                        <div className="flex items-center justify-between px-3">
                            <span className="text-gray-700 text-sm">{state.activeRegion.name}</span>
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
                        <div className="hidden group-hover:block">
                            <ul className="text-gray-700 text-sm text-left mt-2 h-64 overflow-auto">
                                {regions.map(country => <li className="my-1 hover:bg-gray-100 px-3" key={country.code} onClick={() => handleRegionChanged(country)}>{country.name}</li>)}
                            </ul>
                        </div>
                    </button>
                </div>

                <div className="relative flex-1 mx-4">
                    <h3 className="font-medium mb-1">Period</h3>
                    <button className="py-2 border border-gray-400 rounded-lg w-32 group hover:shadow focus:outline-none w-full">
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
                        <div className="hidden group-hover:block">
                            <ul className="text-gray-700 text-sm text-left mt-2">
                                <li className="my-1 hover:bg-gray-100 px-3">This week</li>
                                <li className="my-1 hover:bg-gray-100 px-3">This Year</li>
                            </ul>
                        </div>
                    </button>
                </div>

                <div className="relative flex-1">
                    <h3 className="font-medium mb-1">Category</h3>
                    <button className="py-2 border border-gray-400 rounded-lg w-32 group hover:shadow focus:outline-none w-full">
                        <div className="flex items-center justify-between px-3">
                            <span className="text-gray-700 text-sm">{state.activeCategory.text}</span>
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
                        <div className="hidden group-hover:block">
                            <ul className="text-gray-700 text-sm text-left mt-2 h-64 overflow-auto">
                                {categories.map((category: any) => <li className="my-1 hover:bg-gray-100 px-3" key={category.id} onClick={() => handleCategoryChanged(category)}>{category.text}</li>)}
                            </ul>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Results;