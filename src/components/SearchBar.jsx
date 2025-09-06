import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return(
        <div className="flex items-center rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Search..."
                className="border p-2 rounded-l"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch(e);
                    }
                }}
            />
            <button
                className="bg-blue-500 text-white p-2 rounded ml-2"
                onClick={() => {
                    onSearch(query);
                }}
            >
                Search
            </button>
           
        </div>
    )
}