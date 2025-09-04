import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function BookCard({ book }) {
  const handleRead = () => {
  if (book.fileURL) {
    // Ensure Cloudinary serves raw file
    const pdfUrl = book.fileURL.replace("/upload/", "/upload/fl_attachment/");
    window.open(pdfUrl, "_blank");
  } else {
    alert("No PDF available for this book.");
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

        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full flex items-center justify-center gap-2"
           onClick={handleRead}
        >
          <BookOpen size={16} /> Read
        </Button>
      </CardContent>
    </Card>
  );
}
