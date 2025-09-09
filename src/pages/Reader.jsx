import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { db } from "../backend/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

export default function Reader() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const canvasRef = useRef(null);

  const userId = "exampleUserId";

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const ref = doc(db, "books", id);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setBook({ id: snapshot.id, ...data });

          // Load progress
          const progressRef = doc(
            db,
            "userBooks",
            userId,
            "books",
            snapshot.id
          );
          const progressSnap = await getDoc(progressRef);

          if (progressSnap.exists()) {
            setPageNumber(progressSnap.data().lastPage || 1);
          }
        } else {
          setBook(null);
        }
      } catch (err) {
        console.error("Error loading book:", err);
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
        console.error("PDF render error:", err);
      }
    };

    renderPage();

    return () => {
      isMounted = false;
      if (pdfDoc) pdfDoc.destroy();
    };
  }, [book, pageNumber, scale]);

  const saveProgress = async (page) => {
    if (!book) return;
    const progressRef = doc(db, "userBooks", userId, "books", book.id);
    await setDoc(progressRef, {
      bookId: book.id,
      title: book.title,
      lastPage: page,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      const newPage = pageNumber + 1;
      setPageNumber(newPage);
      saveProgress(newPage);
    }
  };
  const handlePrevPage = () => {
    if (pageNumber > 1) {
      const newPage = pageNumber - 1;
      setPageNumber(newPage);
      saveProgress(newPage);
    }
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto gap-4">
        <div className="md:w-1/5 flex flex-col items-center md:items-start justify-start gap-4">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-32 h-44 object-cover rounded shadow-md"
            />
          ) : (
            <div className="w-32 h-44 bg-gray-300 rounded flex items-center justify-center text-gray-600">
              No Cover
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-lg md:text-xl font-bold">{book.title}</h1>
            <p className="text-sm text-gray-600 mt-1">
              Author: {book.author || "Unknown"}
            </p>
          </div>
        </div>

        <div className="md:w-3/5 flex items-start justify-center border shadow bg-white p-2 md:p-4 h-[75vh] md:h-[85vh] overflow-auto">
          <canvas ref={canvasRef} className="block rounded shadow" />
        </div>

        <div className="md:w-1/5 flex flex-col items-center justify-start gap-3">
          <button
            onClick={handlePrevPage}
            disabled={pageNumber <= 1}
            className="px-3 py-1 w-full bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <p className="px-2 py-1 text-sm">
            Page {pageNumber} of {numPages || "--"}
          </p>
          <button
            onClick={handleNextPage}
            disabled={!numPages || pageNumber >= numPages}
            className="px-3 py-1 w-full bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => setScale(scale + 0.2)}
            className="px-3 py-1 w-full bg-blue-500 text-white rounded"
          >
            Zoom In
          </button>
          <button
            onClick={() => setScale(scale - 0.2)}
            disabled={scale <= 0.6}
            className="px-3 py-1 w-full bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Zoom Out
          </button>
        </div>
      </div>
    </div>
  );
}
