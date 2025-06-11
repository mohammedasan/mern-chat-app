import { useEffect, useState } from "react"
import useConversation  from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
    const [loading ,setLoading] = useState(false)
    const {messages,setMessages,selectedConversation} = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation?._id) {
                setMessages([]); // Clear messages when no conversation is selected
                return;
              }
            setLoading(true)
            try{
                const res = await fetch(`https://mern-chat-app-2-d3k2.onrender.com/api/messages/${selectedConversation._id}`);
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                    
                        setMessages(data)
                    
            }
            catch(error)
            {
                toast.error(error.message);
            }
            finally{
                setLoading(false)
            }
        }
        getMessages();
    return () => {
      setMessages([]); // Clear messages when switching conversations
    };
    },[selectedConversation?._id,setMessages])

    return {messages,loading}
}

export default useGetMessages