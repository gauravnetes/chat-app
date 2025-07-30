import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        // as this route has been protected, we can grab the user id from the request 
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({
            _id: {
                $ne: loggedInUserId // fetch all users except the current logged in user
            }
        }).select("-password"); 

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.error("Error in getUserForSidebar: ", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
         const myId = req.user._id 

         const messages = await Message.find({
            // find all the messages where either I or sender send the message
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }, 
            ]
         })

         res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body 
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl; 
        if(image) {
            const uploadRes = await cloudinary.uploader.upload(image); 
            imageUrl = uploadRes.secure_url 
        }

        const newMsg = new Message({
            senderId, 
            receiverId, 
            text, 
            image: imageUrl, 
        }); 

        await newMsg.save()

        // TODO: realtime messaging to be implemented with socket.io

        res.status(201).json(newMsg)
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message); 
        res.status(500).json({error: "Internal Server Error"})
    }
}

