import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import type { WCProduct } from "../types/types";
import { addToCart } from "../types/cart"; // import the utility

export default function ProductList() {
  const [products, setProducts] = useState<WCProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<WCProduct[]>("products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center p-6">Loading products...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Products</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-lg transition"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={
                  product.images[0]?.src ||
                  "https://via.placeholder.com/400x300"
                }
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-blue-600 font-bold mb-4">${product.price}</p>
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0]?.src || "",
                    quantity: 1,
                  })
                }
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
