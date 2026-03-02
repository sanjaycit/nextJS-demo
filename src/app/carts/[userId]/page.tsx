"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  productId: number;
  quantity: number;
};

type Cart = {
  id: number;
  userId: number;
  products: Product[];
};

export default function CartPage() {
  const params = useParams();
  const userId = Number(params.userId);

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(
        `https://fakestoreapi.com/carts/user/${userId}`
      );
      const data = await response.json();
      setCart(data[0]);
      setLoading(false);
    };

    fetchCart();
  }, [userId]);

  if (loading) return <p>Loading cart...</p>;
  if (!cart) return <p>No cart found</p>;

  return (
    <div  >
      <h2 className="text-lg font-semibold capitalize">Cart for User {cart.userId}</h2>

      {cart.products.map((product) => (
        <div className="grid gap-4 "  key={product.productId}>
          <p className="text-gray-600 mt-1">Product ID: {product.productId}</p>
          <p className="text-gray-600 mt-1">Quantity: {product.quantity}</p>
        </div>
      ))}
    </div>
  );
}
