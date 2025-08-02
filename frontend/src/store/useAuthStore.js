import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null, // initially authUser state will be null, as we don't know that the user is authenticated or not
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true, // loading state

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      set({ authUser: res.data }); // user gets authenticated as soon as they sign up.
      toast.success("Account Created Successfully");
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    } finally {
        set({ isSigningUp: false })
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true }); 
    try {
      const res = await axiosInstance.post("/auth/login", data)
      set({ authUser: res.data })
      toast.success("Logged In Successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIn: false }); 
    }
  }, 

  logout: async () => {
    try {
        await axiosInstance.post("/auth/logout")
        set({ authUser: null })
        toast.success("Logged out successfully")
    } catch (error) {
        toast.error(error.response.data.message)
    }
  }, 

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true })
    try {
      const res = axiosInstance.put("/auth/update-profile", data)
      set({ authUser: (await res).data }) 
      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("Error in  Update Profile",  error) 
      toast.error(error.response.data.message)
    } finally {
      set({ isUpdatingProfile: false })
    }
  } 
}));
