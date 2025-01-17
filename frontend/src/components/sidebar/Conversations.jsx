import Conversation from "./Conversation.jsx"
import  useGetConversation from "../../hooks/useGetConversation.jsx"
import { getRandomEmoji } from "../../utils/emojis.js";
const Conversations = () => {
  const {loading,conversations} =useGetConversation();
  console.log("CONVERSATIONS :",conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation 
          key={conversation.id} 
          conversation={conversation} 
          emoji={getRandomEmoji()}
          lastIdx={conversations.length - 1}
          />
      ))}
        {loading ? <span className="loading loading-spinner-large"></span> :null}
    </div>
  )
}

export default Conversations