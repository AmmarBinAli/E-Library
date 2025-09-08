import { useEffect, useState } from "react";
import { auth, db } from "../backend/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      // Get user profile from Firestore
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        // fallback agar Firestore me na mile
        setUserData({
          userName: currentUser.displayName || "Anonymous",
          email: currentUser.email,
        });
      }

      // Count saved books
      const booksSnapshot = await getDocs(collection(db, "users", currentUser.uid, "myBooks"));
      setTotalBooks(booksSnapshot.size);
    };

    fetchUser();
  }, []);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="p-6 flex flex-col gap-4 justify-center items-center">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {userData.userName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Total Books Saved:</strong> {totalBooks}</p>
    </div>
  );
}
