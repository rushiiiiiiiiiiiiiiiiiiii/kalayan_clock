const express = require("express");
const cors = require("cors");
const path = require("path");
const conn = require("./Connection");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5101;

/* ================= CORS ================= */

app.use(
  cors({
    origin: [
      "http://localhost:3006",
      "http://192.168.0.103:3006"
    ],
    credentials: true
  })
);

/* ================= MIDDLEWARE ================= */

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/* ================= STATIC FILES ================= */

// Serve uploaded background images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve uploaded media files
app.use("/uploads/media", express.static(path.join(__dirname, "uploads/media")));

/* ================= ROUTES ================= */

// ADMIN & USER ROUTES (MVC)
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");

// Mount routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.use("/", adminRoutes);
app.use("/", userRoutes);

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
  res.send("Server is running...");
});

/* ================= AUTO STATUS RESET ================= */

// NOTE: This logic was in your old router — moved here permanently
setInterval(() => {
  const sql = "UPDATE user SET status='Inactive' WHERE status='Active'";
  conn.query(sql, (err) => {
    if (err) console.error("Status Update Error:", err);
  });
}, 60000); // every 1 minute

/* ================= SERVER ================= */

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
