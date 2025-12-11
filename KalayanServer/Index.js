const express = require("express");
const cors = require("cors");
const path = require("path");
const conn = require("./Connection");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");

const app = express();
const PORT = 5101;

/* ================= CORS ================= */

app.use(
  cors({
    origin: [
      "http://localhost:3005",
      "http://localhost:3006",
      "http://localhost:3007",

      // Kalayan Frontend
      "http://192.168.0.103:3005",
      "http://192.168.0.103:3006",
      "http://192.168.0.103:3007",

      // Admin Frontend (117)
      "http://192.168.0.117:3005",
      "http://192.168.0.117:3006",

      // Admin Frontend (103 — THIS IS YOUR REAL CURRENT FRONTEND)
      "http://192.168.0.103:3000",
      "http://192.168.0.103:3005",
    ],
    credentials: true,
  })
);

/* ================= MIDDLEWARE ================= */

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const logActivity = (userId, action, description) => {
  const sql =
    "INSERT INTO activity_logs (user_id, action, description) VALUES (?, ?, ?)";
  conn.query(sql, [userId, action, description], (err) => {
    if (err) console.error("Activity Log Error:", err);
  });
};

cron.schedule("0 * * * *", () => {
  // every hour
  conn.query("SELECT * FROM user WHERE Status='Inactive'", (err, result) => {
    if (err) return console.log("Cron error:", err);

    result.forEach((tv) => {
      logActivity(
        null, // user_id should be null because TV is NOT an admin
        "TV_INACTIVE",
        `TV ${tv.Tv_id} is inactive`
      );
    });

    console.log("Inactive TV logs inserted");
  });
});

/* ================= STATIC FILES ================= */

// Serve uploaded background images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve uploaded media files
app.use(
  "/uploads/media",
  express.static(path.join(__dirname, "uploads/media"))
);

/* ================= ROUTES ================= */

// ADMIN & USER ROUTES (MVC)
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");

// Mount routes

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// app.use("/", adminRoutes);

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
