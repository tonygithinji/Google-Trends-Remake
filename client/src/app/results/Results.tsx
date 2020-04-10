import React, { useState, useEffect, useCallback } from "react";
import cx from "classnames";
import queryString from "query-string";
import { GoogleProperties } from "../../common/constants/constants";
import useFetchQueryData from "../../hooks/useFetchQueryData";
import LineChart from "../../common/charts/LineChart";
import Filters from "../../common/components/filters/Filters";

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

    const toggleLoading = useCallback((status: boolean) => {
        updateState(prevState => {
            return { ...prevState, loading: status }
        });
    }, []);

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

            <Filters queryOptions={queryOptions} showFilters={state.showFilters} handleCategoryChanged={handleCategoryChanged} handleRegionChanged={handleRegionChanged} />

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