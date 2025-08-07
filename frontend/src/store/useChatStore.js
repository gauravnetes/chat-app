import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null, // when an user is selected from the sidebar. the UI will be updated with that user's chat
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get() 

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
      set({ messages: [...messages, res.data] })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },  

  subscribeToMessages: () => {
    const { selectedUser } = get()
    if(!selectedUser) return

    const socket = useAuthStore.getState().socket; 

    socket.on("newMsg", (newMsg) => {
      const isMsgSentFromSelectedUser = newMsg.senderId === selectedUser._id; 

      if(!isMsgSentFromSelectedUser) return; 
      // get all the prev messages in History and add the newMsg in the end 
      set({
        messages: [...get().messages, newMsg]
      })
    })
  }, 

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket; 
    socket.off("newMsg")
  },
//   TODO: Optimize
  setSelectedUser: (selectedUser) => set({ selectedUser })
}));
