import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8888;

// allow cors
app.use(
  cors({
    origin: ["http://localhost:3000", "https://gym-website-lemon-nu.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// allow cookie
app.use(cookieParser());
// allow json
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Fit life gym's backend is up and runnign on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello there!!, via backend serevr.");
});

// routes
import memberRouter from "./routes/member.route";
app.use("/api/v1", memberRouter);
import postRouter from "./routes/post.route";
app.use("/api/v1", postRouter)
import adminRouter from "./routes/admin.route"
app.use("/api/v1", adminRouter)
