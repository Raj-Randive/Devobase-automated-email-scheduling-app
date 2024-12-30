const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("./config/index.config.js");
const dbConnect = require("./connect/db.js");

const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Database connection
dbConnect();

// Routes
// app.use("/api/auth", AuthRoutes);
// app.use("/api/emails", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(config.PORT, () => {
  console.log(`Server running at http://localhost:${config.PORT}/`);
});
