import { useState } from "react";

export default function CategoryFilter({ onCategoryChange }) {
  const [selected, setSelected] = useState("All");
  const categories = ["All","General","Classic", "Self Help", "Science", "History", "Fantasy","Romance","Horror"];

  const handleChange = (e) => {
    const cat = e.target.value;
    setSelected(cat);
    onCategoryChange(cat);
  };

  return (
    <div className="mb-4">
      <select
        value={selected}
        onChange={handleChange}
        className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
