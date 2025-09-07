import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: string; // WooCommerce price is a string
  quantity: number;
  image: string;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Failed to parse cart from localStorage:", err);
      return [];
    }
  });
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
    document.title = "Cart - Kevin Lepiten";

    // Update meta description
    const description = "Your shopping cart at Kevin Lepiten store.";
    let metaTag = document.querySelector("meta[name='description']");
    if (metaTag) {
      metaTag.setAttribute("content", description);
    } else {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "description");
      metaTag.setAttribute("content", description);
      document.head.appendChild(metaTag);
    }
  }, []);

  // Update cart in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <Link
          to="/products"
          className="text-blue-600 hover:underline font-semibold"
        >
          Browse Products
        </Link>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white border rounded-xl p-4 shadow-sm"
          >
            <img
              src={item.image || "https://via.placeholder.com/150"}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-blue-600 font-bold mb-2">${item.price}</p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                  }
                  className="w-16 text-center border-t border-b border-gray-200"
                />
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-xl hover:bg-green-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
