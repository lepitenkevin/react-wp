import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { WPPost } from "../types/types";

export default function SinglePost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<WPPost | null>(null);

  useEffect(() => {
    axios
      .get(`https://kevinlepiten.com/blog/wp-json/wp/v2/posts/${id}?_embed`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // ✅ Update meta when post changes
  useEffect(() => {
    if (post) {
      document.title = `${post.title.rendered} - Kevin Lepiten`;

      // description
      const metaDescription = document.querySelector<HTMLMetaElement>(
        "meta[name='description']"
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          post.excerpt?.rendered.replace(/<[^>]+>/g, "").slice(0, 160) || ""
        );
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content =
          post.excerpt?.rendered.replace(/<[^>]+>/g, "").slice(0, 160) || "";
        document.head.appendChild(meta);
      }

      // optional: Open Graph / Twitter image
      if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
        let ogImage = document.querySelector<HTMLMetaElement>(
          "meta[property='og:image']"
        );
        if (!ogImage) {
          ogImage = document.createElement("meta");
          ogImage.setAttribute("property", "og:image");
          document.head.appendChild(ogImage);
        }
        ogImage.setAttribute(
          "content",
          post._embedded["wp:featuredmedia"][0].source_url
        );
      }
    }
  }, [post]);

  if (!post) return <div className="text-center p-6">Loading...</div>;

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <article className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        {featuredImage && (
          <img
            src={featuredImage}
            alt={post.title.rendered}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {post.title.rendered}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {new Date(post.date).toLocaleDateString()}
        </p>
        <div
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content?.rendered ?? "" }}
        />
      </article>
    </div>
  );
}
