import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { db } from "../backend/firebase";
import { doc, getDoc } from "firebase/firestore";
import * as pdfjsLib from "pdfjs-dist";
// import "pdfjs-dist/web/pdf_viewer.css"; // Remove this line

// Set workerSrc for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";
  
export default function Reader() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchBook = async () => {
      const ref = doc(db, "books", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setBook({ id: snapshot.id, ...data });
      } else {
        setBook(null);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    if (!book?.fileURL) return;

    let pdfDoc = null;
    let isMounted = true;

    const renderPage = async () => {
      try {
        pdfDoc = await pdfjsLib.getDocument(book.fileURL).promise;
        if (!isMounted) return;
        setNumPages(pdfDoc.numPages);

        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
      } catch (err) {
        alert("Failed to load PDF. Please check the file URL.");
      }
    };

    renderPage();

    return () => {
      isMounted = false;
      if (pdfDoc) pdfDoc.destroy();
    };
  }, [book, pageNumber, scale]);

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-xl">
        Book not found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <div className="border shadow-md bg-white p-4 w-full max-w-4xl h-[80vh] flex items-center justify-center overflow-auto">
        <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }} />
      </div>
      <div className="mt-4 flex flex-wrap gap-3 items-center">
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p className="px-2 py-1">
          Page {pageNumber} of {numPages || "--"}
        </p>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={!numPages || pageNumber >= numPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => setScale(scale + 0.2)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Zoom In
        </button>
        <button
          onClick={() => setScale(scale - 0.2)}
          disabled={scale <= 0.6}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Zoom Out
        </button>
      </div>
    </div>
  );
}