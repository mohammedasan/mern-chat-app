// import Sidebar from "../../component/sidebar/Sidebar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import MessageContainer from "../../components/Messages/MessageContainer.jsx";
// import MessageContainer from "../../component/messages/MessageContainer.jsx"
const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 
    bg-clip-padding backdrop-filer backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
    </div>
  )
}

export default Home;