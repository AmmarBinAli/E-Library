import { useState } from "react";
import CategoryFilter from "../components/CatogaryFilter";
import BookCard from "../components/BookCard";


export default function Library() {
  const [selectedCategory, setSelectedCategory] = useState("All");

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
      <h1 className="text-2xl font-bold mb-6">Library</h1>
      <CategoryFilter onCategoryChange={setSelectedCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}