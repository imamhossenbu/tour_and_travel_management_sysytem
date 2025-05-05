import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosPublic.get("/api/messages");
        const formattedMessages = response.data.map(msg => ({
          ...msg,
          submitted_at: new Date(msg.submitted_at).toLocaleString()
        }));
        setMessages(formattedMessages);
      } catch (err) {
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading messages...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">All Messages</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={msg.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{msg.name}</td>
                <td className="px-4 py-2 border text-blue-500">{msg.email}</td>
                <td className="px-4 py-2 border">{msg.message}</td>
                <td className="px-4 py-2 border text-gray-600">{msg.submitted_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMessages;
