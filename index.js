import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";
import BookRoutes from "./books/routes.js"; 
import CommentRoutes from "./comments/routes.js";
import ChapterRoutes from "./chapters/routes.js";
const CONNECTION_STRING =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sese";
mongoose.connect(CONNECTION_STRING);

// Check if connected successfully
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB");
  console.log(`Database name: ${db.name}`);
});

const app = express();
app.use(cors({
    credentials: true,
    //origin:process.env.FRONTEND_URL_LOCAL,
    origin: process.env.NODE_ENV === "PRODUCTION" ? process.env.FRONTEND_URL : process.env.FRONTEND_URL_LOCAL,
  })
);
app.options('*', cors());
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

// 应用 session 中间件
app.use(session(sessionOptions));



// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
UserRoutes(app);
BookRoutes(app);
CommentRoutes(app);


ChapterRoutes(app);
// Default route
app.get("/", (req, res) => {
  res.send("Hello World sese reading!");
});
// Server start
app.listen(process.env.PORT || 4000);
app.listen(56100, () => {
  console.log("Server is running on port 56100");
});

