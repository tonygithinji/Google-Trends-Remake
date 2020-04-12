import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { QueryOptions } from "../common/constants/types";
import { Utils } from "../utils/utils";

export default function useFetchQueryData(options: any, url: string, isLoadingStatusKey: string, toggleLoading: any) {
    const [data, updateData] = useState([]);

    useEffect(() => {
        toggleLoading(true, isLoadingStatusKey);
        const { startDate, endDate } = Utils.calculateDateRange(options.period);
        const queryOptions = new QueryOptions();
        queryOptions.keyword = options.keyword;
        queryOptions.startTime = startDate;
        queryOptions.endTime = endDate;
        queryOptions.category = options.activeCategory.id;
        if (options.activeRegion.code) queryOptions.geo = options.activeRegion.code;
        if (options.activeGoogleProperty) queryOptions.property = options.activeGoogleProperty;

        console.log("called useFetchQueryData with queryOptions >> ", queryOptions);
        if (queryOptions.keyword) {
            axios.post(url, { ...queryOptions })
                .then(response => {
                    const { status, data } = response.data;

                    if (status === "ok") {
                        updateData(data);
                    } else {
                        updateData([]);
                    }
                    toggleLoading(false, isLoadingStatusKey);
                });
        }
    }, [options, url, isLoadingStatusKey, toggleLoading]);

    return data;
}