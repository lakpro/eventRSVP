const express = require("express");
const app = express();
const PORT = 5000;
const eventRoutes = require("./routes/eventRoutes");
const cors = require("cors");

// Middleware to parse JSON
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

// Routes
app.use("/api/events", eventRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
