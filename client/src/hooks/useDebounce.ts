import { useState, useEffect } from "react";

export default function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutHandler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeoutHandler);
        };
    }, [value]);

    return debouncedValue;
}