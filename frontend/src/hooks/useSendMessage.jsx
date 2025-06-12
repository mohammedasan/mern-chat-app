import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`https://mern-chat-app-2-d3k2.onrender.com/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages([...messages, data]);

      // ✅ Emit socket event
      socket?.emit("sendMessage", {
        to: selectedConversation._id,
        from: authUser._id,
        message: data,
      });
    } catch (error) {
      console.error("Send message failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
