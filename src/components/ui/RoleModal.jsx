import { useNavigate } from "react-router-dom";

export default function RoleModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Continue As</h2>
        <div className="space-y-3">
          <button
            onClick={() => {
              onClose();
              navigate("/login?role=user");
            }}
            className="w-full py-2 bg-blue-600 text-white rounded-md"
          >
            User
          </button>
          <button
            onClick={() => {
              onClose();
              navigate("/login?role=admin");
            }}
            className="w-full py-2 bg-green-600 text-white rounded-md"
          >
            Admin
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-gray-600 border rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
