import { useState } from "react";

export default function UploadBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    pdfFile: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Uploaded Book:", formData);
    alert("Book upload feature coming soon!");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Upload a Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        >
          <option value="">Select Category</option>
          <option value="Classic">Classic</option>
          <option value="Self Help">Self Help</option>
          <option value="Fantasy">Fantasy</option>
        </select>
        <textarea
          name="description"
          placeholder="Book Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          rows="4"
        />
        <input
          type="file"
          name="pdfFile"
          accept="application/pdf"
          onChange={handleChange}
          className="w-full"
        />
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
