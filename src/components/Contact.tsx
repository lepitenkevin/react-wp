import { useState, useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    // Set the page title
    document.title = "Contact - Kevin Lepiten";

    // Update or create meta description
    const description = "Contact page description here.";
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      // Example with EmailJS (frontend only)
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: "service_z5jnxbs",
            template_id: "template_o4cm5q5",
            user_id: "40CtpqaPA5khXnFhy",
            template_params: {
              name: formData.name,
              email: formData.email,
              message: formData.message,
            },
          }),
        }
      );

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong. Try again later.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Me</h1>
      <p className="text-gray-600 mb-6">
        Have a question or want to work together? Send me a message.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow-md border border-gray-200"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Message
          </label>
          <textarea
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Send Message
        </button>

        {status && <p className="text-center mt-4 text-gray-700">{status}</p>}
      </form>
    </div>
  );
}
