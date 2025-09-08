import { auth, db } from "../backend/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Profile() {
  const user = auth.currentUser;
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user) return;
      const snapshot = await getDocs(collection(db, "users", user.uid, "myBooks"));
      setTotalBooks(snapshot.size);
    };
    fetchBooks();
  }, [user]);

  if (!user) return <p>Please login to see your profile</p>;

  return (
    <div className="p-6 flex flex-col gap-4 justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.displayName || "Anonymous"}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Total Books Saved:</strong> {totalBooks}</p>
    </div>
  );
}
