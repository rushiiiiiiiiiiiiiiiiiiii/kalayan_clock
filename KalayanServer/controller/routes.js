const express = require("express");
const router = express.Router();
const conn = require("../Connection");
const multer = require("multer");

const path = require("path");
const fs = require("fs");
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

router.get("/getdata", async (_req, res) => {
  const sql = "SELECT * FROM login";
  try {
    conn.query(sql, (err, result) => {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    conn.query(sql, [email, password], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        return res.status(200).json({
          data: result[0],
          message: "Login Successful",
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/forgetPassword", async (req, res) => {
  try {
    const { email } = req.body;
    function getRandomFourDigit() {
      return Math.floor(1000 + Math.random() * 9000);
    }
    const sql = "UPDATE login SET otp = ? WHERE email = ?";

    conn.query(sql, [getRandomFourDigit(), email], async (error, result) => {
      if (error) throw error;
      return res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/remove_otp", (req, res) => {
  try {
    setTimeout(() => {
      const { email } = req.body;
      const sql = "UPDATE login SET otp = null WHERE email = ?";
      conn.query(sql, [email], (err, result) => {
        if (err) throw err;
        return res.json(result);
      });
    }, 3600000);
  } catch (error) {
    console.log(error);
  }
});
router.post("/update_pass", async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = "UPDATE login SET password = ? WHERE email = ?";
    conn.query(sql, [password, email], async (err, result) => {
      if (err) throw err;
      return res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/add_customer", async (req, res) => {
  const { Tv_id, Name, Mobile_No, Location, Language, Created_at, Updated_at } =
    req.body;
  console.log(req.body);
  const sql = `INSERT INTO user 
                 (Tv_id, Name, Mobile_No, Location, Language,  Created_at) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

  conn.query(
    sql,
    [Tv_id, Name, Mobile_No, Location, Language, Created_at, Updated_at],
    async (err, result) => {
      if (err) throw err;
      return res.json(result);
    }
  );
});
router.post("/add_person", async (req, res) => {
  const { email, Mobile_No, password, User_Type } = req.body;
  const sql = `INSERT INTO login (email, Mobile_No, password, User_Type) VALUES (?, ?, ?, ?)`;
  conn.query(
    sql,
    [email, Mobile_No, password, User_Type],
    async (err, result) => {
      if (err) throw err;
      return res.json(result);
    }
  );
});
router.get("/get_data/:id", async (req, res) => {
  const id = req.params.id
  console.log(id)
  const currentDates = new Date(); // or new Date("2025-04-21")
  const day = String(currentDates.getDate()).padStart(2, "0"); // Get day (e.g., '28')
  const month = currentDates.toLocaleString("default", { month: "short" }); // Get abbreviated month (e.g., 'Apr')
  const year = String(currentDates.getFullYear()).slice(-2); // Get last 2 digits of the year (e.g., '25')

  // Format as 'DD-MMM-YY' (e.g., '28-Apr-25')
  const formatted = `${day}/${month}/${year}`
  console.log("Formatted Gregorian Date:", formatted); // Just for debugging

  // const sql = "SELECT * FROM vedic_calender_marathi WHERE Gregorian_date = ?";
  // conn.query(sql, [formatted], (err, result) => {
  //   if (err) {
  //     console.error("DB Error:", err);
  //     return res.status(500).json({ error: "Database Error" });
  //   }
  //   if (result.length === 0) {
  //     console.warn("No matching record found for", formatted);
  //   }
  //   if(result.length>0){

  //     return res.status(200).json(result);
  //   }
  //   else{
  //     return res.status(404).json("Data not founc")
  //   }
  // });
  if (id == "English") {
    const sql = "SELECT * FROM vedic_calender_english WHERE Gregorian_date >= ? ORDER BY Gregorian_date ASC LIMIT 10;";
    conn.query(sql, formatted, async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.status(200).json(result)
      }
      if (result.length === 0) {
        console.warn("No matching record found for", formatted);
      }
      else {
        return res.status(404).json("Data not founc")
      }
    });
  }
  else if (id == "Hindi") {
    const sql = "SELECT * FROM vedic_calender_hindi WHERE Gregorian_date >= ? ORDER BY Gregorian_date ASC LIMIT 10;";
    conn.query(sql, formatted, async (err, result) => {
      if (err) throw err
      if (result.length > 0) {
        return res.status(200).json(result);
      }
      if (result.length === 0) {
        console.warn("No matching record found for", formatted);
      }
      else {
        return res.status(404).json("Data not founc")
      }
    });
  }
  else {
    const sql = "SELECT * FROM vedic_calender_marathi WHERE Gregorian_date >= ? ORDER BY Gregorian_date ASC LIMIT 10;";
    conn.query(sql, formatted, async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.status(200).json(result);
      }
      if (result.length === 0) {  
        console.warn("No matching record found for", formatted);
      }
      else {
        return res.status(404).json("Data not founc")
      }
    });
  }

});

router.get("/get_all_data/:id", async (req, res) => {
  const id = req.params.id
  if (id == "English") {
    const sql = "SELECT * FROM vedic_calender_english";
    conn.query(sql, async (err, result) => {
      if (err) throw err;
      return res.json(result);
    });
  }
  else if (id == "Hindi") {
    const sql = "SELECT * FROM vedic_calender_Hindi";
    conn.query(sql, async (err, result) => {
      if (err) throw err;
      return res.json(result);
    });
  }
  else {

    const sql = "SELECT * FROM vedic_calender_marathi";
    conn.query(sql, async (err, result) => {
      if (err) throw err;
      return res.json(result);
    });
  }
});
router.post("/update_details", async (req, res) => {
  const { Suryoday, Suryasta, id } = req.body;
  console.log(req.body);
  const query =
    "UPDATE vedic_calender_marathi SET Suryoday = ?, Suryasta = ? WHERE id = ?;";
  conn.query(query, [Suryoday, Suryasta, id], (err, result) => {
    if (err) throw err;
    return res.json(result);
  });
  
});
// router.post("/notification/:id", async (req, res) => {
//     const { id } = req.params;
//     const { text } = req.body
//     const sql = "INSERT INTO specific_notify (Tv_id,Eng_Text) VALUES (?,?)"
//     conn.query(sql,[id,text],async(err,result)=>{
//         if (err) throw err;
//         return  res.json(result)
//     })
// })
router.get("/Get_notification/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM `notification` WHERE Tv_id=?";
  conn.query(sql, [id], async (err, result) => {
    if (err) throw err;
    console.log(result);
    return res.json(result);
  });
});
router.post("/receive/:id", (req, res) => {
  const { id } = req.params;
  const sql = "INSERT INTO receive (Tv_id,Create_at) VALUES (?,?)";
  conn.query(sql, [id, new Date()], async (err, result) => {
    if (err) throw err;
    return res.json(result);
  });
});
router.post("/store_notify", async (req, res) => {
  const data = req.body;
  const sql = "INSERT INTO storenotification (text) VALUES (?);";
  if (!data) {
    return res.status(400).json({ error: "Text is required" });
  }
  conn.query(sql, [data.text], (err, result) => {
    console.log(data);
    if (err) throw err;
    return res.json("added successfully");
  });
});


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = path.join(__dirname, "./uploads");

//     // Ensure the directory exists
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     cb(null, "uploads/"); // Save in uploads folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Unique filename
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "uploads"; // default

    if (req.url.includes("/upload-media")) {
      folder = "uploads/media";
    }

    // Resolve path to project root (kaalayaserver1/uploads or uploads/media)
    const uploadDir = path.join(__dirname, "../", folder);

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${timestamp}${ext}`)
  },
});

const upload = multer({ storage: storage });

router.post("/uploadbg", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { originalname, mimetype, filename } = req.file;
  const filePath = `./uploads/${filename}`; // Store file path instead of binary

  const query =
    "INSERT INTO bgimages (name, image, contentType) VALUES (?, ?, ?)";
  conn.query(query, [originalname, filePath, mimetype], (err, result) => {
    if (err) {
      console.log("MySQL Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res
      .status(201)
      .json({
        message: "Image uploaded successfully",
        id: result.insertId,
        path: filePath,
      });
  });
});

// API to fetch an image by ID
router.get("/image", (req, res) => {
  const query = "SELECT * from bgimages";
  conn.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json(results);
  });
});


router.post("/Upload_Plan", async (req, res) => {
  const { TV_id, Subscription_type, amount, date } = req.body;
  const sql =
    "INSERT INTO subscriptions (TV_id, Subscription_type, amount, date) VALUES (?, ?, ?, ?)";
  const values = [TV_id, Subscription_type, amount, date];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    res
      .status(200)
      .json({ message: "Subscription inserted successfully", result });
  });
});


router.post("/uploadCSV", (req, res) => {
  const {data,lan} = req.body;
  if (!Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ error: "No data received" });
  }

  const values = data.map((item) => [
    item["Gregorian Date"]?.replace(/"/g, "") || null,
    item["Indian Date"] || null,
    item["Vedic Date"]?.replace(/"/g, "") || null,
    item["वार"] || null,
    item["पूर्णिमान्त तिथी"] || null,
    item["आमान्त तिथी"] || null,
    item["नक्षत्र"] || null,
    item["योग"] || null,
    item["दिवा करण"] || null,
    item["रात्री करण"] || null,
    item["suryoday"] || null,
    item["suryasta"] || null,
    item["दिनविशेष "]?.trim() || null,
    item["अयन"] || null,
    item["ऋतू"] || null,
    item["विक्रम संवत"] || null,
    item["शक संवत"] || null,
  ]);

  if(lan=="en"){
      const sql = `
      INSERT INTO vedic_calender_english (
        gregorian_date, indian_date, vedic_date, war, 
        purnimant_tithi, amant_tithi, nakshatra, yog,
        DivaKaran, RatriKaran, suryoday, suryasta, 
        Dinvishesh, ayan, Rutu,VikramSamvat,shaksavant
      ) VALUES ?
    `;
     conn.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    res.status(200).json({ message: "Data Uploaded successfully", result });
  });
  }
  if(lan=="hi"){
      const sql = `
      INSERT INTO vedic_calender_hindi (
        gregorian_date, indian_date, vedic_date, war, 
        purnimant_tithi, amant_tithi, nakshatra, yog,
        DivaKaran, RatriKaran, suryoday, suryasta, 
        Dinvishesh, ayan, Rutu,VikramSamvat,shaksavant
      ) VALUES ?
    `;
     conn.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    res.status(200).json({ message: "Data Uploaded successfully", result });
  })
  }
  if(lan=="mr"){
      const sql = `
      INSERT INTO vedic_calender_marathi (
        gregorian_date, indian_date, vedic_date, war, 
        purnimant_tithi, amant_tithi, nakshatra, yog,
        DivaKaran, RatriKaran, suryoday, suryasta, 
        Dinvishesh, ayan, Rutu,VikramSamvat,shaksavant
      ) VALUES ?
    `;
     conn.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    res.status(200).json({ message: "Data Uploaded successfully", result });
  });
  }
  // const sql = `
  //     INSERT INTO vedic_calender_marathi (
  //       gregorian_date, indian_date, vedic_date, war, 
  //       purnimant_tithi, amant_tithi, nakshatra, yog,
  //       DivaKaran, RatriKaran, suryoday, suryasta, 
  //       Dinvishesh, ayan, Rutu,VikramSamvat,shaksavant
  //     ) VALUES ?
  //   `;

 
})


router.get("/status/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE user SET status = 'Active' WHERE Tv_id = ?;";
  conn.query(sql, [id], (err, result) => {
    if (err) throw err;
    return res.json("Tv is active");
  });
});


const updateStatus = () => {
  const sql = "UPDATE user SET status = 'Inactive' WHERE status = 'Active'";
  conn.query(sql, (err, result) => {
    if (err) {
      console.error("Error updating status:", err);
    } else {
      return
    }
  });
};
setInterval(updateStatus, 60000); // 10 minutes in ms

router.get("/All_tv", async (req, res) => {
  const sql = "SELECT * FROM user";
  conn.query(sql, (err, result) => {
    if (err) throw err;
    return res.json(result);
  });
});

router.post("/send_notification", (req, res) => {
  const { TV_id, notificationData, time } = req.body;
  console.log("Received:", req.body);

  // First, check if the record with this TV_id exists
  const checkSql = "SELECT * FROM notification WHERE TV_id = ?";
  conn.query(checkSql, [TV_id], (err, results) => {
    if (err) {
      console.error("Error checking TV_id:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      // Record exists – do UPDATE
      const updateSql =
        "UPDATE notification SET Marathi_text = ?, time = ? WHERE TV_id = ?";
      conn.query(updateSql, [notificationData, time, TV_id], (err, result) => {
        if (err) {
          console.error("Error updating record:", err);
          return res
            .status(500)
            .json({ error: "Database error during update" });
        }
        return res.json({
          message: "Notification updated successfully",
          result,
        });
      });
    } else {
      // Record doesn't exist – do INSERT
      const insertSql =
        "INSERT INTO notification (Marathi_text, TV_id, time) VALUES (?, ?, ?)";
      conn.query(insertSql, [notificationData, TV_id, time], (err, result) => {
        if (err) {
          console.error("Error inserting record:", err);
          return res
            .status(500)
            .json({ error: "Database error during insert" });
        }
        return res.json({
          message: "Notification inserted successfully",
          result,
        });
      });
    }
  });
});

const checkAndDeleteNotifications = () => {
  setInterval(() => {
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0"); // Ensure two digits for hours
      const minutes = now.getMinutes().toString().padStart(2, "0"); // Ensure two digits for minutes
      return `${hours}:${minutes}`; // Return time in HH:MM format
    };

    // Usage
    const currentTime = getCurrentTime(); // Current time in HH:MM format

    // Query to find notifications where the time is less than or equal to the current time
    const query = "SELECT * FROM notification WHERE Start_time <= ?";
    conn.query(query, [currentTime], (err, notifications) => {
      if (err) {
        console.error("Error checking notifications:", err);
      } else {
        notifications.forEach((notification) => {
          // Send the notification (for example, logging it here)
          console.log(
            `Sending Notification: ${notification.notificationData} to TV_ID: ${notification.TV_id}`
          );

          // Delete the notification after sending it
          const deleteQuery = "DELETE FROM notification WHERE id = ?";
          conn.query(deleteQuery, [notification.id], (err) => {
            if (err) {
              console.error("Error deleting notification:", err);
            } else {
              console.log(
                `Notification with ID: ${notification.id} deleted after sending`
              );
            }
          });
        });
      }
    });
  }, 60000); // Check every minute
};

// Start the interval to check notifications
checkAndDeleteNotifications();

router.post("/Tv_login", async (req, res) => {
  try {
    const { Mobile_No, password } = req.body;

    const sql = "SELECT * FROM user WHERE Mobile_No	 = ?  AND password = ?";
    conn.query(sql, [Mobile_No, password], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
        return res.status(200).json({
          data: result[0],
          message: "Login Successful",
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.post("/schedule-media", (req, res) => {
  const { mediaId, scheduleDate, scheduleTime } = req.body;
  console.log(req.body);
  conn.query(
    "INSERT INTO media_schedules (media_id, schedule_date, schedule_time) VALUES (?, ?, ?)",
    [mediaId, scheduleDate, scheduleTime],
    (error, results) => {
      if (error) {
        console.error("Database insert error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.json({ message: "Media scheduled successfully" });
    }
  );
});

router.get("/media-files", (req, res) => {
  const sql = "select * from media_files";
  conn.query(sql, (err, result) => {
    if (err) res.status(500).json(err.message);
    res.status(200).json(result);
  });
});

router.get("/user-schedule", (req, res) => {
  conn.query(
    `
    SELECT 
      s.id, 
      f.title, 
      f.filename, 
      f.media_type, 
      s.schedule_date, 
      s.schedule_time
    FROM media_schedules s
    JOIN media_files f ON s.media_id = f.id
    WHERE TIMESTAMP(s.schedule_date, s.schedule_time) >= NOW()
    ORDER BY s.schedule_date ASC, s.schedule_time ASC
  `,
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.json(results);
    }
  );
});

router.post("/upload-media", upload.single("media"), (req, res) => {
  const { title, mediaType } = req.body;
  const filename = req.file.filename;

  const query = `
    INSERT INTO media_files (title, filename, media_type)
    VALUES (?, ?, ?)
  `;

  conn.query(query, [title, filename, mediaType], (err, result) => {
    if (err) {
      console.error("DB Insert Error:", err);
      return res.status(500).json({ error: "Failed to store media info" });
    }

    res
      .status(200)
      .json({ message: "Media uploaded successfully", id: result.insertId });
  });
})


router.get("/api/user/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const query = `
    SELECT s.*, tv.is_enabled
    FROM subscriptions s
    LEFT JOIN tv_access tv ON s.user_id = tv.user_id
    WHERE s.user_id = ?
    ORDER BY s.end_date DESC
    LIMIT 1
  `;
  conn.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0] || {});
  });
});
router.get("/Nakshtra", async (req, res) => {
  try {
    // 1. Get today's date in local time and format to 'YYYY-MM-DD'
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // '2025-06-20'

    // 2. SQL query — assuming `Date` column is DATE (not DATETIME)
    const query = `SELECT * FROM planets WHERE Date = ?`;

    // 3. Run the query
    conn.query(query, [today], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "No matching records for today" });
      }

      return res.json(result);
    });
  } catch (err) {
    console.error("Error in /Nakshtra route:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
