import { useState } from "react";
import { db } from "../backend/firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export default function UploadBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    pdfFile: null,
    coverImage: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.coverImage || !formData.pdfFile) {
      alert("Please select both Cover Image and PDF.");
      return;
    }

    try {
      setLoading(true);

      // 1) Upload cover (image) to Cloudinary
      const cover = await uploadToCloudinary(formData.coverImage, "image");

      // 2) Upload pdf (raw) to Cloudinary
      const pdf = await uploadToCloudinary(formData.pdfFile, "pdf");
      console.log("PDF Upload Response:", pdf);

      // 3) Save document in Firestore
      await addDoc(collection(db, "books"), {
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category,
        description: formData.description?.trim() || "",
        coverImage: cover.secure_url,
        fileURL: pdf.secure_url,
        createdAt: serverTimestamp(),
      });

      alert("Book uploaded successfully!");

      // reset form
      setFormData({
        title: "",
        author: "",
        category: "",
        description: "",
        pdfFile: null,
        coverImage: null,
      });

      // clear file inputs manually
      document.querySelector('input[name="pdfFile"]').value = "";
      document.querySelector('input[name="coverImage"]').value = "";
    } catch (err) {
      console.error(err);
      alert(err.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
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
        <label className="block font-semibold text-gray-700">
          Select PDF File
        </label>
        <input
          type="file"
          name="pdfFile"
          accept="application/pdf"
          onChange={handleChange}
          className="w-full"
          required
        />
        <label className="block font-semibold text-gray-700">
        Select Cover Image
        </label>
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
          required
        />
        <button
          type="submit"
           disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
         {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
