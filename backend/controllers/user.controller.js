import User from "../models/user.models.js"
import generateTokenAndSetCookie from "../utils/generateTokens.js";
export const getUsersForSidebar = async (req, res) => {
    try {
      // Check if the user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized access" });
      }
  
      console.log("Inside getUsersForSidebar");
      const loggedInUserId = req.user._id;
      console.log("Logged In User Id:", loggedInUserId);
      const filteredUsers = await User.find({ _id:   { $ne: loggedInUserId } })
        .select("-password")
        .limit(25); // You can change this to suit your needs (for pagination)
  
      console.log("Filtered Users:", filteredUsers);
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.error("Error in getUsersForSidebar", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  