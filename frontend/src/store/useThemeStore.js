 import { create } from "zustand";

 export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "dark", 
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme)
        set({ theme }) // set updates the theme state 
    }
 }))