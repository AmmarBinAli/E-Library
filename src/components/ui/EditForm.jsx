import { useState } from "react";

export default function EditBookModal({ book, onSave, onCancel }) {
  // Initial values book se lo
  const [title, setTitle] = useState(book.title || "");
  const [author, setAuthor] = useState(book.author || "");
  const [category, setCategory] = useState(book.category || "");
  const [description, setDescription] = useState(book.description || "");
  const [fileURL, setFileURL] = useState(book.fileURL || "");
  const [coverImage, setCoverImage] = useState(book.coverImage || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      author,
      category,
      description,
      fileURL,
      coverImage,
    };

    onSave(updatedData); // ✅ ab sirf clean data pass hoga
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full border p-2 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            value={fileURL}
            onChange={(e) => setFileURL(e.target.value)}
            placeholder="File URL"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Cover Image URL"
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
