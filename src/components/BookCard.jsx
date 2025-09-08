import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Trash, BookmarkPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { auth, db } from "../backend/firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { supabase } from "../utils/supabaseClient";

export default function BookCard({
  book,
  showDelete = false,
  showSave = false,
  showEdit = false, // ✅ new prop for Edit button
  deleteType = "user", // "user" ya "admin"
  refreshBooks, // 🔹 MyBooks list ko refresh karne ke liye
  onEdit, // ✅ new callback for opening edit modal
}) {
  const navigate = useNavigate();

  // Save book to Firestore under current user
  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please login to save books");

    try {
      await setDoc(doc(db, "users", user.uid, "myBooks", book.id), {
        ...book,
        savedAt: new Date(),
      });
      alert("Book saved successfully ✅");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  // User Delete Mybook from Firestore
  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "myBooks", book.id));
      alert("Book removed ❌");
      if (refreshBooks) refreshBooks(); // list update
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // ✅ Admin delete from Library + Supabase
  const handleAdminDelete = async () => {
    try {
      // 1) Delete Firestore document
      await deleteDoc(doc(db, "books", book.id));

      // 2) Delete Supabase files
      const coverPath = book.coverImage.split("/books/")[1]; // e.g. covers/xyz.png
      const pdfPath = book.fileURL.split("/books/")[1]; // e.g. pdfs/xyz.pdf

      if (coverPath) {
        await supabase.storage.from("books").remove([coverPath]);
      }
      if (pdfPath) {
        await supabase.storage.from("books").remove([pdfPath]);
      }

      alert("Book deleted successfully ✅");
      if (refreshBooks) refreshBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book ❌");
    }
  };

  return (
    <Card className="shadow-lg rounded-2xl hover:shadow-xl transition-all bg-white">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="text-xs text-gray-500 mt-1">{book.category}</p>

        <div className="flex gap-2 mt-3">
          {/* Read Button */}
          <Button
            onClick={() => navigate(`/reader/${book.id}`)}
            variant="outline"
            size="sm"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <BookOpen size={16} /> Read
          </Button>

          {/* Save Button */}
          {showSave && (
            <Button
              onClick={handleSave}
              variant="default"
              size="sm"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <BookmarkPlus size={16} /> Save
            </Button>
          )}

           {/* Edit Button (admin only) */}
          {showEdit && (
            <Button
              onClick={() => onEdit(book)}
              variant="secondary"
              size="sm"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Pencil size={16} /> Edit
            </Button>
          )}

          {/* Delete Button (Admin/User based on deleteType) */}
          {showDelete && (
            <Button
              onClick={
                deleteType === "admin" ? handleAdminDelete : handleDelete
              }
              variant="destructive"
              size="sm"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Trash size={16} /> Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
