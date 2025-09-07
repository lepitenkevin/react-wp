import { Routes, Route, useLocation } from "react-router-dom";
import BlogPosts from "./components/BlogPost";
import SinglePost from "./components/SinglePost";
import Layout from "./components/Layout";
import About from "./components/About";
import Contact from "./components/Contact";
import { useEffect } from "react";
function MetaUpdater() {
  const { pathname } = useLocation();

  useEffect(() => {
    // force re-evaluation of Helmet tags on route change
    const title = document.querySelector("title")?.innerText;
    console.log("Route changed:", pathname, "Current title:", title);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <MetaUpdater />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BlogPosts />} />
          <Route path="blog" element={<BlogPosts />} />
          <Route path="post/:id" element={<SinglePost />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
}
