import React from 'react'
import {useState} from 'react'
import useConversation from '../zustand/useConversation'
const useSendMessage = () => {
  const[loading,setLoading] = useState(false);
  const {messages,setMessages,selectedConversation} = useConversation();
  const sendMessage=async(message)=>{
    setLoading(true);
    try{
      const res=await fetch(`/api/messages/send/${selectedConversation._id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({message}),
      });
      if(!res.ok)
      {
        const errorData=await res.json();
        throw new Error(errorData.error||"Failed to send message");
      }
      const data=await res.json();
      console.log("Message Sent:",data);
      setMessages([...messages,data]);
    }
    catch(error)
    {
      console.error("Error Sending Message:",error.message);
    }
    finally{
      setLoading(false);
    }
  }
  return {sendMessage,loading};
}

export default useSendMessage
