import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("Socket.IO Server is running.");
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle incoming messages
  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
