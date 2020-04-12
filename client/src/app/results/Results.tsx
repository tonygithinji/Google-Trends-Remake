import React, { useState, useEffect, useCallback } from "react";
import cx from "classnames";
import queryString from "query-string";
import { GoogleProperties } from "../../common/constants/constants";
import useFetchQueryData from "../../hooks/useFetchQueryData";
import Filters from "../../common/components/filters/Filters";
import LineChart from "../../common/charts/LineChart";
import Choropleth from "../../common/charts/Choropleth";

const Results = (props: any) => {

    const [queryOptions, updateQueryOptions] = useState({
        activeGoogleProperty: "",
        activeCategory: { text: "All Categories", id: 0 },
        activeRegion: { "code": "", "code3": "", "name": "Worldwide", "number": "" },
        keyword: ""
    });
    const [state, updateState] = useState({
        showFilters: false,
        interestOverTimeLoading: true,
        interestByRegionLoading: true,
    });

    const toggleLoading = useCallback((status: boolean, key: string) => {
        updateState(prevState => {
            return { ...prevState, [key]: status }
        });
    }, []);

    const interestOverTimeData = useFetchQueryData(queryOptions, "/interest-over-time", "interestOverTimeLoading", toggleLoading);
    const interestByRegionData = useFetchQueryData(queryOptions, "/interest-by-region", "interestByRegionLoading", toggleLoading);

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

            <div className="w-full shadow border border-gray-200 rounded-lg mb-6">
                {state.interestOverTimeLoading && <div className="text-center">Loading</div>}
                {!state.interestOverTimeLoading && (
                    <>
                        <div className="py-4 px-4">
                            <h2 className="text-xl">Interest over time</h2>

                        </div>
                        <div style={{ height: "24rem" }}>
                            <LineChart data={interestOverTimeData} id="results" color="hsl(180, 64%, 58%)" />
                        </div>
                    </>
                )}
            </div>

            <div className="w-full shadow border border-gray-200 rounded-lg mb-6">
                {state.interestByRegionLoading && <div className="text-center">Loading</div>}
                {!state.interestByRegionLoading && (
                    <>
                        <div className="py-4 px-4">
                            <h2 className="text-xl">Interest by region</h2>

                        </div>
                        <div style={{ height: "32rem" }}>
                            <Choropleth data={interestByRegionData} color="hsl(180, 64%, 58%)" />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Results;