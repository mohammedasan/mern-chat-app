import { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';
const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          credentials: "include", // ✅ This sends the cookie (JWT) to the backend
        });
        const data = await res.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations }; // Return both loading and conversations
};

export default useGetConversation;

// import { useState, useEffect } from 'react';

// const useGetConversation = () => {
//   const [loading, setLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);

//   useEffect(() => {
//     const getConversations = async () => {
//       setLoading(true);

//       const token = import.meta.env.VITE_API_TOKEN;
//       console.log(import.meta.env);

//       // Access token from .env using VITE_ prefix

//       if (!token) {
//         console.error('No token found. Please set the token in your .env file.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:8000/api/users", {
//           headers: {
//             'Authorization': `Bearer ${token}`, // Authorization header with token
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!res.ok) {
//           const errorData = await res.json();
//           throw new Error(errorData.error || 'Failed to fetch conversations.');
//         }

//         const data = await res.json();
//         console.log('Fetched Conversations:', data);
//         setConversations(data);
//       } catch (error) {
//         console.error('Error fetching conversations:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getConversations();
//   }, []); // Empty dependency array ensures this runs once on component mount

//   return { loading, conversations }; // Return loading and conversations state
// };

// export default useGetConversation;
