export default function Profile() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-blue-700">My Profile</h2>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Name:</span> Ammar Ali
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Email:</span> ammarali@example.com
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Joined:</span> September 2025
        </p>
      </div>
    </div>
  );
}
