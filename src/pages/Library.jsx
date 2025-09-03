import { useState } from "react";
import CategoryFilter from "../components/CatogaryFilter";
import BookCard from "../components/BookCard";
import UploadBook from "./UploadBooks";

export default function Library() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showUpload, setShowUpload] = useState(false);

  const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Classic",
    coverImage: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    coverImage: "https://covers.openlibrary.org/b/id/9878524-L.jpg",
  },
  {
    id: 3,
    title: "Harry Potter",
    author: "J.K. Rowling",
    category: "Fantasy",
    coverImage: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
  },
];


  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((b) => b.category === selectedCategory);

   return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Library</h1>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showUpload ? "Close Upload" : "Upload Book"}
        </button>
      </div>

      {showUpload && (
        <div className="mb-6">
          <UploadBook />
        </div>
      )}

      <CategoryFilter onCategoryChange={setSelectedCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}