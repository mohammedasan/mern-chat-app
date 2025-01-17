import {useAuthContext} from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';
const Message = ({message}) => {
  const {authUser}=useAuthContext();
  const {selectedConversation}=useConversation();
  const fromMe=message.senderId===authUser._id;
  const formattedDate=extractTime(message.createdAt);
  const chatClassName=fromMe?"chat-end":"chat-start";
  const profileImage=fromMe?authUser.profilePic:selectedConversation.profilePic;
  const bubbleBgColor=fromMe?"bg-blue-500":"bg-gray-500";

  const shakeClass = message.shouldShake ? "shake" : "";
    return (
      <div className={`chat ${chatClassName}`}>
          <div className="chat-image avatar">
          <div className="w-10 rounded-full">
          <img src={profileImage} alt="Tailwind CSS chat bubble Component" />
          </div>
          </div>
  
          <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
          <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
            {formattedDate}
          </div>
      </div>
    )
  }
  
  export default Message