// ✅ FILE: frontend/hooks/useGetMessages.jsx
import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { socket } = useSocketContext();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return setMessages([]);
      setLoading(true);

      try {
        const res = await fetch(`https://mern-chat-app-2-d3k2.onrender.com/api/messages/${selectedConversation._id}`, {
          credentials: "include"
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setMessages(data);
      } catch (err) {
        console.error("Error loading messages:", err.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
    return () => setMessages([]);
  }, [selectedConversation?._id]);

  useEffect(() => {
    // ✅ Listen for new messages
    socket?.on("newMessage", (newMsg) => {
      if (newMsg.senderId === selectedConversation?._id)
        setMessages((prev) => [...prev, newMsg]);
    });

    return () => socket?.off("newMessage");
  }, [socket, selectedConversation?._id]);

  return { messages, loading };
};

export default useGetMessages;