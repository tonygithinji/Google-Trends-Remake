import React, { useState, useEffect } from "react";
import cx from "classnames";
import queryString from "query-string";
import { GoogleProperties } from "../../common/constants/constants";
import useArrayFilter from "../../hooks/useArrayFilter";
import useFetchQueryData from "../../hooks/useFetchQueryData";
import LineChart from "../../common/charts/LineChart";

const Results = (props: any) => {

    const [queryOptions, updateQueryOptions] = useState({
        activeGoogleProperty: "",
        activeCategory: { text: "All Categories", id: 0 },
        activeRegion: { "code": "", "code3": "", "name": "Worldwide", "number": "" },
        keyword: ""
    });
    const [state, updateState] = useState({
        showFilters: false,
        loading: true
    });

    const categories = useArrayFilter(queryOptions.activeCategory.id, "categories");
    const regions = useArrayFilter(queryOptions.activeRegion.code, "regions");

    const toggleLoading = (status: boolean) => {
        updateState(prevState => {
            return { ...prevState, loading: status }
        });
    }

    const data = useFetchQueryData(queryOptions, toggleLoading);

    useEffect(() => {
        const query: any = queryString.parse(props.location.search);
        updateQueryOptions(prevState => {
            return { ...prevState, keyword: query.q }
        });
    }, [props.location.search]);

    const changeActiveProperty = (property: string) => {
        updateQueryOptions(prevState => {
            return { ...prevState, activeGoogleProperty: property }
        });
    }

    const handleCategoryChanged = (category: any) => {
        updateQueryOptions(prevState => {
            return { ...prevState, activeCategory: category }
        });
    }

    const handleRegionChanged = (region: any) => {
        updateQueryOptions(prevState => {
            return { ...prevState, activeRegion: region }
        });
    }

    const toggleShowFilters = () => {
        updateState(prevState => {
            return { ...prevState, showFilters: !state.showFilters }
        });
    }

    return (
        <>
            <h1 className="text-3xl text-center mt-6 mb-4">{queryOptions.keyword}</h1>
            <hr />
            <div className="my-6 relative">
                <ul className="flex justify-center">
                    {GoogleProperties.map((item, index) => {
                        return (
                            <li key={item.property}
                                className={cx("mx-4 px-4 py-1 text-sm cursor-pointer text-gray-600 hover:text-gray-800", {
                                    "bg-gray-200 rounded-full text-gray-800": queryOptions.activeGoogleProperty === item.property,
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
            <div className={cx("flex justify-around justify-evenly mb-4", { "block": state.showFilters, "hidden": !state.showFilters })}>
                <div className="relative flex-1">
                    <h3 className="font-medium mb-1">Region</h3>
                    <button className="py-2 border border-gray-400 rounded-lg w-32 group hover:shadow focus:outline-none w-full">
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
                        <div className="hidden group-hover:block">
                            <ul className="text-gray-700 text-sm text-left mt-2 h-64 overflow-auto">
                                {categories.map((category: any) => <li className="my-1 hover:bg-gray-100 px-3" key={category.id} onClick={() => handleCategoryChanged(category)}>{category.text}</li>)}
                            </ul>
                        </div>
                    </button>
                </div>
            </div>

            <div className="w-full shadow border border-gray-200 rounded-lg">
                {state.loading && <div className="text-center">Loading</div>}
                {!state.loading && (
                    <>
                        <div className="py-4 px-4">
                            <h2 className="text-xl">Interest over time</h2>

                        </div>
                        <div style={{ height: "24rem" }}>
                            <LineChart data={data} id="results" color="hsl(180, 64%, 58%)" />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Results;