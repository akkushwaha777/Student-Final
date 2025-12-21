const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require('dotenv').config();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const studentRoutes = require("./routes/studentRoutes");
const taskRoutes = require("./routes/taskRoutes");
const productRoutes = require("./routes/productRoutes");
const app = express();
connectDB();

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));

// Security Improvements
app.disable('x-powered-by'); // Hide Express
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent DoS
app.use((req, res, next) => {
  // Security Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.get('/', (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes); // /api/users/register, etc
app.use("/api/auth", authRoutes);   // /api/auth/register, /api/auth/login
app.use("/api/resources", resourceRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/products", productRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
