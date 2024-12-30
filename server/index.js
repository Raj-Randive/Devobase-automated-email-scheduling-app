import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config/index.config.js";
import dbConnect from "./connect/db.js";
import AuthRoutes from "./routes/auth.routes.js";
import emailRoutes from "./routes/email.routes.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors(
  {
    origin: ["http://localhost:5173", ""],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }
));
app.use(cookieParser());

// Database connection
dbConnect();

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/emails", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(config.PORT, () => {
  console.log(`Server running at http://localhost:${config.PORT}/`);
});
