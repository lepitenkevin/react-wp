import { useEffect } from "react";
export default function About() {
  useEffect(() => {
    // Set the page title
    document.title = "About - Kevin Lepiten";

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
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About Kevin Victor Lepiten</h1>
      <p className="text-gray-700 mb-4">
        Welcome to Kevin's Blog, a simple blog platform built with React and
        Vite. This project showcases my ability to create a modern web
        application using React for the frontend and Vite for fast development
        and build times.
      </p>
      <p className="text-gray-700 mb-4">
        The blog posts are fetched from a WordPress backend via its REST API,
        demonstrating integration with third-party services. The application
        features a clean and responsive design, client-side routing with React
        Router, and state management using React hooks.
      </p>
      <p className="text-gray-700">
        Feel free to explore the blog posts, and connect with me on social
        media!
      </p>
    </div>
  );
}
