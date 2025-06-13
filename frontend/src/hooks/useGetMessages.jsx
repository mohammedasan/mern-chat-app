import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { socket } = useSocketContext();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) {
        setMessages([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `https://mern-chat-app-2-d3k2.onrender.com/api/messages/${selectedConversation._id}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();

    // ✅ Listen for real-time new messages
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selectedConversation._id || newMessage.receiverId === selectedConversation._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [selectedConversation?._id, setMessages, socket]);

  return { messages, loading };
};

export default useGetMessages;
