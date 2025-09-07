import { Routes, Route } from "react-router-dom";
import BlogPosts from "./components/BlogPost";
import SinglePost from "./components/SinglePost";
import Layout from "./components/Layout";
import About from "./components/About";
import Contact from "./components/Contact";
import ProductList from "./components/ProductList";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BlogPosts />} />
        <Route path="blog" element={<BlogPosts />} />
        <Route path="post/:id" element={<SinglePost />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="products" element={<ProductList />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  );
}
