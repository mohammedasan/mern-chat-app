
import Home from "./Pages/home/Home.jsx"
import { Routes, Route,Navigate } from "react-router-dom";
import Login from "./Pages/login/Login.jsx"
import Signup from "./Pages/signup/Signup.jsx"
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
function App() {
  const {authUser} = useAuthContext();
  console.log("authUser in App:", authUser);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser?<Home/>:<Navigate to={"/login"}/>}/>
        <Route path="/login" element={authUser?<Navigate to="/"/>:<Login/>}/>
        <Route path="/signup" element={authUser ? <Navigate to="/"/>:<Signup/>}/>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;