import React from 'react'
import {useState} from 'react'
import  {useAuthContext}  from '../context/AuthContext';
import toast from 'react-hot-toast';
const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const login = async ({username,password}) => {
        // console.log("username:", username);  
        // console.log("password:", password);
        const success = handleInputErrors(username,password);
        if(!success)
        {
            return;
        }
        console.log("Going Uselogin"); // Logs when login is being triggered
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({username,password})
            });
            const data = await res.json();
            console.log(data);
            if(data.error)
            {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return {loading,login};
}

export default useLogin;



function handleInputErrors(username, password) {
    // console.log("Validating inputs:", { fullName, username, password, confirmPassword, gender });  // Log the inputs being validated

    if (!username || !password) {
        toast.error("Please fill all the fields");
        return false;
    }
    return true;
}

