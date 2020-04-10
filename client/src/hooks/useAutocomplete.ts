import { useState, useEffect } from "react";
import axios from "../utils/axios";

export default function useAutocomplete(searchTerm: string) {
    const [autocomplete, updateAutocomplete] = useState({
        loading: false,
        results: []
    });

    useEffect(() => {
        if (searchTerm) {
            updateAutocomplete(prevState => {
                return { ...prevState, loading: true }
            });
            axios.post("/autocomplete", { query: searchTerm }).then((response: any) => {
                const { status, data } = response.data;
                if (status === "ok") {
                    updateAutocomplete(prevState => {
                        return { ...prevState, results: data, loading: false }
                    });
                } else {
                    updateAutocomplete(prevState => {
                        return { ...prevState, results: [], loading: false }
                    });
                }
            });
        } else {
            updateAutocomplete(prevState => {
                return { ...prevState, results: [], loading: false }
            });
        }
    }, [searchTerm]);

    return autocomplete.results;
}
