console.log("--- RENDER ENVIRONMENT VARIABLES ---");
console.log(JSON.stringify(process.env, null, 2));
console.log("------------------------------------");

import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

import path from "path";

dotenv.config();

const PORT = process.env.PORT;

// const __dirname = path.resolve();

// // to extract json data out of body
// // run this beofore calling any routes as the routes will be needing
// // parsing json data which won't work if run before express.json() middleware
app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  // connectDB();
});
