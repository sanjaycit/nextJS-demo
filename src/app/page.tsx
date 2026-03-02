"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
  };
};

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/users");
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className=" bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Users</h1>

      <div className="grid gap-4 ">
        {data.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold capitalize">
              {user.name.firstname} {user.name.lastname}
            </h3>

            <p className="text-gray-600 mt-1">
              {user.address.city}, {user.address.street}
            </p>

            <button
              onClick={() => router.push(`/carts/${user.id}`)}
              className=" bg-blue-500 text-white py-2 rounded hover:bg-blue-600 "
            >
              View Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
