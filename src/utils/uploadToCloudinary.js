// src/utils/uploadToCloudinary.js
export async function uploadToCloudinary(file, kind = "image") {
  if (!file) throw new Error("No file provided");

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const imagePreset = import.meta.env.VITE_CLOUDINARY_UNSIGNED_IMAGE_PRESET;
  const pdfPreset = import.meta.env.VITE_CLOUDINARY_UNSIGNED_PDF_PRESET;

  if (!cloudName) throw new Error("Missing VITE_CLOUDINARY_CLOUD_NAME");
  if (kind === "image" && !imagePreset) throw new Error("Missing image preset");
  if (kind === "pdf" && !pdfPreset) throw new Error("Missing pdf preset");

  // endpoint resource type: images => image, pdf => raw
  const resourceType = kind === "pdf" ? "raw" : "image";
  const preset = kind === "pdf" ? pdfPreset : imagePreset;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", preset);

  const res = await fetch(url, { method: "POST", body: form });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Cloudinary upload failed (${res.status}): ${txt}`);
  }

  const json = await res.json();
  console.log("Cloudinary Upload Response:", json);
  // json.secure_url is what we’ll store in Firestore
  return json; // { secure_url, public_id, resource_type, ... }
}
