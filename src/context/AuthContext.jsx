import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../backend/firebase"; // tumhara path sahi hai

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null); // <-- naya state
  const [loading, setLoading] = useState(true); // optional, loading handle karne ke liye

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const ref = doc(db, "users", user.uid);
          const snapshot = await getDoc(ref);
          if (snapshot.exists()) {
            setRole(snapshot.data().role); // "admin" / "user"
          } else {
            console.warn("Firestore document not found for user:", user.email);
            setRole(null);
          }
        } catch (error) {
          console.error("Firestore fetch error:", error);
          setRole(null);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
