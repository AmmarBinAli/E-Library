import { useState, useEffect } from "react";
import { db } from "../backend/firebase";
import { collection, getDocs, deleteDoc, doc , updateDoc} from "firebase/firestore";
import CategoryFilter from "../components/CatogaryFilter";
import BookCard from "../components/BookCard";
import UploadBook from "./UploadBooks";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";
import EditBookModal from "@/components/ui/EditForm"; // tumhara modal


export default function Library() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showUpload, setShowUpload] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
   const [editingBook, setEditingBook] = useState(null);

 const { role, currentUser, loading } = useAuth(); // role aur loading context se aa gaye

  useEffect(() => {
    const fetchBooks = async () => {
      const snapshot = await getDocs(collection(db, "books"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(list);
    };
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await deleteDoc(doc(db, "books", bookId));
      setBooks((prev) => prev.filter((b) => b.id !== bookId));
      alert("Book deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Update function
  const handleUpdate = async (bookId, updatedData) => {
    try {
      if (!bookId) {
        console.error("Book ID missing for update");
        return;
      }

      const cleanData = Object.fromEntries(
        Object.entries(updatedData).filter(([_, v]) => v !== undefined)
      );

      await updateDoc(doc(db, "books", bookId), cleanData);

      setBooks((prev) =>
        prev.map((b) => (b.id === bookId ? { ...b, ...cleanData } : b))
      );

      alert("Book updated successfully!");
      setEditingBook(null); 
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Library</h1>

        {role === "admin" && (
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showUpload ? "Close Upload" : "Upload Book"}
          </button>
        )}
      </div>

      {showUpload && role === "admin" && (
        <div className="mb-6">
          <UploadBook />
        </div>
      )}

      <div className="mb-4 flex justify-center">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <CategoryFilter onCategoryChange={setSelectedCategory} />

      {filteredBooks.length === 0 ? (
        <p className="text-center text-black-500 mt-10">No books found...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="relative">
              <BookCard
                book={book}
                showSave={true}
                showEdit={role === "admin" && book.uploaderId === currentUser?.uid} 
                onEdit={(book) => setEditingBook(book)} // modal open
                onSave={(book) => {
                  let saved = JSON.parse(localStorage.getItem("myBooks")) || [];
                  if (!saved.find((b) => b.id === book.id)) {
                    saved.push(book);
                    localStorage.setItem("myBooks", JSON.stringify(saved));
                  }
                }}
              />

              {role === "admin" && book.uploaderId === currentUser?.uid && (
                <button
                  onClick={() => handleDelete(book.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {editingBook && (
        <EditBookModal
          book={editingBook}
          onSave={(updatedData) => handleUpdate(editingBook.id, updatedData)}
          onClose={() => setEditingBook(null)} // Cancel bhi chal jaayega
        />
      )}
    </div>
  );
}
