import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { socket } = useSocketContext();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://mern-chat-app-2-d3k2.onrender.com/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await res.json();

      // ✅ Add to local state
      setMessages([...messages, data]);

      // ✅ Emit message to socket server
      socket?.emit("newMessage", data);
    } catch (error) {
      console.error("Error Sending Message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
