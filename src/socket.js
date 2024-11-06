import { io } from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production"
    ? "https://sketchboard-6mq5.onrender.com"
    : "http://localhost:9005";
// const URL = "http://localhost:9005";
export const socket = io(URL);
