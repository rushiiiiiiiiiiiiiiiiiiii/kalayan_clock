  const express = require("express");
  const cors = require("cors");
  const path = require("path");
  const conn = require("./Connection");
  const app = express();
  const PORT = 5100;
  const router=require("./controller/routes")
  // Middleware
  app.use(cors());

  app.use(express.json());
  // ✅ Serve static files from the 'uploads' directory
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.use("/uploads/media", express.static(path.join(__dirname, "uploads")));
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  
  app.use(router)
  // Test Route
  app.get("/", (req, res) => {
    res.send("Server is running...");
  });
  // app.get("/get-image", (req, res) => {
  //     const imagePath = path.join(__dirname+"/uploads/1740654788944-AVLogo.jpg");
  //     res.sendFile(imagePath);
  //   });



 

// Admin: manually enable or disable TV access

  // Start Server
  app.listen(PORT,'192.168.0.114',() => {
    console.log(`Server is running on http://192.168.0.114:${PORT}`);
  });
