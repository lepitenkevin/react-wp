import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchWooData } from "../api/wooApi";
import type { WCProduct } from "../types/types";

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

export default function SingleProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<WCProduct | null>(null);
  const [related, setRelated] = useState<WCProduct[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch main product
  useEffect(() => {
    if (!id) return;
    fetchWooData<WCProduct>(`products/${id}`)
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.images?.[0]?.src || null);
        setLoading(false);

        // Meta tags
        document.title = `${data.name} - Kevin Lepiten`;
        const description = data.short_description
          .replace(/<[^>]+>/g, "")
          .slice(0, 160);
        const oldMeta = document.querySelector("meta[name='description']");
        if (oldMeta) oldMeta.remove();
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);

        // Fetch related products (same category or just random few)
        if (data.categories?.length) {
          fetchWooData<WCProduct[]>(
            `products?category=${data.categories[0].id}&per_page=4`
          ).then((relatedProducts) => {
            // Exclude current product
            setRelated(relatedProducts.filter((p) => p.id !== data.id));
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading product...</div>;
  if (!product)
    return <div className="text-center p-6">Product not found.</div>;

  const handleAddToCart = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0]?.src || "",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4" aria-label="Breadcrumb">
        <ol className="list-reset flex text-gray-500">
          <li>
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to Products
      </button>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {selectedImage && (
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
          )}
          <div className="flex gap-2">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={`${product.name} ${idx}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                  selectedImage === img.src
                    ? "border-blue-600"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(img.src)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
          <p
            className="text-2xl font-bold text-blue-600 mb-6"
            dangerouslySetInnerHTML={{ __html: product.price_html }}
          />

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-16 text-center border-t border-b border-gray-200"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Full Description */}
      <div className="mt-8 prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                <Link to={`/product/${prod.id}`} rel="noopener noreferrer">
                  <img
                    src={
                      prod.images[0]?.src ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={prod.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {prod.name}
                  </h3>
                  <p
                    className="text-blue-600 font-bold mb-4"
                    dangerouslySetInnerHTML={{ __html: prod.price_html }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
