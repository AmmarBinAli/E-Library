import { useEffect, useState } from "react";
import { db } from "../backend/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      setUsersCount(usersSnapshot.size);

      const booksSnapshot = await getDocs(collection(db, "books"));
      setBooksCount(booksSnapshot.size);

      let categoryMap = {};
      booksSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.category) {
          categoryMap[data.category] = (categoryMap[data.category] || 0) + 1;
        }
      });

      const formattedData = Object.keys(categoryMap).map((cat) => ({
        category: cat,
        count: categoryMap[cat],
      }));

      setCategoryData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold">{usersCount}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Total Books</h2>
            <p className="text-3xl font-bold">{booksCount}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Categories</h2>
            <p className="text-3xl font-bold">{categoryData.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Books by Category</h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No category data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
