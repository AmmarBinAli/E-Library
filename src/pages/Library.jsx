import { useState, useEffect } from "react";
import { db } from "../backend/firebase";
import { collection, getDocs } from "firebase/firestore";
import CategoryFilter from "../components/CatogaryFilter";
import BookCard from "../components/BookCard";
import UploadBook from "./UploadBooks";
import SearchBar from "../components/SearchBar";

export default function Library() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showUpload, setShowUpload] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Firestore se data fetch
  useEffect(() => {
    const fetchBooks = async () => {
      const snapshot = await getDocs(collection(db, "books"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(list);
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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

      <div className="mb-4 flex justify-center">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <CategoryFilter onCategoryChange={setSelectedCategory} />

      {filteredBooks.length === 0 ? (
        <p className="text-center text-black-500 mt-10">Result Not Found !</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
