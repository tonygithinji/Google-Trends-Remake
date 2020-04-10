import { useState, useEffect } from "react";
import FuzzySearch from 'fuzzy-search';
import { Categories, Countries } from "../common/constants/constants";

export default function useArrayFilter(activeId: any, type: string, searchTerm = "") {
    const initialState: any[] = [];
    const [state, updateState] = useState(initialState);

    useEffect(() => {
        let data;

        const search = (data: any, key: string) => {
            const searcher = new FuzzySearch(data, [key]);
            return searcher.search(searchTerm);
        }

        if (type === "categories") {
            data = Categories.filter(category => category.id !== activeId);
            if (searchTerm) {
                data = search(data, "text");
            }
        } else {
            data = Countries.filter(region => region.code !== activeId);
            if (searchTerm) {
                data = search(data, "name");
            }
        }
        updateState(data);
    }, [activeId, type, searchTerm]);

    return state;
}