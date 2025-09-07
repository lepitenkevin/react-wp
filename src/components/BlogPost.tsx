import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type { WPPost } from "../types/types";

export default function BlogPosts() {
  useEffect(() => {
    // Set the page title
    document.title = "Home - Kevin Lepiten";

    // Update or create meta description
    const description = "About page description here.";
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

  const [posts, setPosts] = useState<WPPost[]>([]);

  useEffect(() => {
    axios
      .get<WPPost[]>(
        "https://kevinlepiten.com/blog/wp-json/wp/v2/posts?_embed&per_page=10"
      )
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 mx-auto text-center">
        Welcome To my Blog
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const featuredImage = (post as any)._embedded?.[
            "wp:featuredmedia"
          ]?.[0]?.source_url;

          return (
            <div
              key={post.id}
              className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {featuredImage && (
                <img
                  src={featuredImage}
                  alt={post.title.rendered}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  <Link
                    to={`/post/${post.id}`}
                    className="hover:text-blue-600"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-sm">
                  {post.excerpt?.rendered &&
                    post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 120)}
                  ...
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
