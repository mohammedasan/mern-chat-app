// import { useState } from "react";

// import toast from "react-hot-toast";
// const useSignup = () => {
//     console.log("Going Usesignup");
//     const [loading,setLoading] = useState(false);

//     const signup = async({fullName,username,password,confirmPassword,gender}) => {
//     const success = handleInputErrors({fullName,username,password,confirmPassword,gender})

//     if(!success) return;
//     setLoading(true);
//     try{

//         const res = await fetch("http://localhost:8000/api/auth/signup",{
//             method:"POST",
//             headers : {"Content-Type" : "application/json"},
//             body : JSON.stringify({fullName,username,password,confirmPassword,gender})
            
//         })

//         const data = await res.json();
//         console.log(data);

//     }catch(error)
//     {
//         toast.error(error.message)
//     } finally{
//         setLoading(false);
//     }

//     }

//     return {loading , signup};
// }

// export default useSignup;


// function handleInputErrors({fullName,username,password,confirmPassword,gender})
// {
//     if(!fullName || !username || !password || !confirmPassword || !gender)
//     {
//         toast.error('Please fill all the fields')
//         return false
//     }

//     if(password !== confirmPassword)
//     {
//         toast.error('Password do not match')
//         return false
//     }
    
//     if(password.length < 6)
//         {
//             toast.error('Password must be atleast 6 characters')
//             return false
            
//     }
//     return true
// }
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser}=useAuthContext();
    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        console.log("Going Usesignup"); // Logs when signup is being triggered

        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("https://mern-chat-app-2-d3k2.onrender.com/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            });

            const data = await res.json();
            if(data.error)
            {
                throw new Error(data.error)
            }
            localStorage.setItem('chat-user',JSON.stringify(data))
            setAuthUser(data);
            console.log("API Response:", data);  // Logs API response for debugging

            if (res.ok) {
                toast.success("Signup successful!");
            } else {
                toast.error(data.message || "Something went wrong during signup");
            }

        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};  

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    // console.log("Validating inputs:", { fullName, username, password, confirmPassword, gender });  // Log the inputs being validated

    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}
