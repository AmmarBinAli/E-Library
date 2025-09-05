import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Reader({ books }) {
  const { id } = useParams();
  const book = books.find((b) => String(b.id) === id); 

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-xl">
        Book not found 
      </div>
    );
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>

      <div className="border shadow-md bg-white p-4">
        <Document
          file={book.pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={() => alert(" Failed to load PDF")}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>

      <div className="mt-4 flex space-x-3">
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p className="px-2 py-1">
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber >= numPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => setScale(scale + 0.2)}
          className="px-3 py-1 bg-blue-400 text-white rounded"
        >
          Zoom In
        </button>
        <button
          onClick={() => setScale(scale - 0.2)}
          disabled={scale <= 0.6}
          className="px-3 py-1 bg-blue-400 text-white rounded disabled:opacity-50"
        >
          Zoom Out
        </button>
      </div>
    </div>
  );
}
