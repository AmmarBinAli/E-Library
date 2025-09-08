import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../backend/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const ref = doc(db, "users", user.uid);
          const snapshot = await getDoc(ref);

          if (snapshot.exists()) {
            setRole(snapshot.data().role);
          } else {
            // Agar Firestore document missing hai to create default
            const assignedRole = user.email === "admin@gmail.com" ? "admin" : "user";
            await setDoc(ref, {
              uid: user.uid,
              email: user.email,
              userName: assignedRole === "admin" ? "Admin" : "User",
              role: assignedRole,
            });
            setRole(assignedRole);
          }
        } catch (err) {
          console.error("Firestore error:", err);
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
