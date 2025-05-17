"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8888;
// allow cors
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://gym-website-lemon-nu.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));
// allow cookie
app.use((0, cookie_parser_1.default)());
// allow json
app.use(express_1.default.json());
app.listen(PORT, () => {
    console.log(`Fit life gym's backend is up and runnign on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Hello there!!, via backend serevr.");
});
// routes
const member_route_1 = __importDefault(require("./routes/member.route"));
app.use("/api/v1", member_route_1.default);
const post_route_1 = __importDefault(require("./routes/post.route"));
app.use("/api/v1", post_route_1.default);
const admin_route_1 = __importDefault(require("./routes/admin.route"));
app.use("/api/v1", admin_route_1.default);
