import { useState, useEffect } from "react";
import { Categories, Countries } from "../common/constants/constants";

export default function useArrayFilter(activeId: any, type: string) {
    const initialState: any[] = [];
    const [state, updateState] = useState(initialState);

    useEffect(() => {
        let data;
        if (type === "categories") {
            data = Categories.filter(category => category.id !== activeId);
        } else {
            data = Countries.filter(region => region.code !== activeId);
        }
        updateState(data);
    }, [activeId, type]);

    return state;
}