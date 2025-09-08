import { useEffect, useState } from "react";
import { auth, db } from "../backend/firebase";
import { collection, getDocs } from "firebase/firestore";
import BookCard from "../components/BookCard";

export default function MyBooks() {
  const [myBooks, setMyBooks] = useState([]);

  const fetchBooks = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const querySnapshot = await getDocs(collection(db, "users", user.uid, "myBooks"));
    const books = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMyBooks(books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">My Books</h2>

      {myBooks.length === 0 ? (
        <p className="text-gray-600">
          You haven’t saved any books yet. Go to the Library and save some books!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              showDelete={true}
              refreshBooks={fetchBooks}
            />
          ))}
        </div>
      )}
    </div>
  );
}
