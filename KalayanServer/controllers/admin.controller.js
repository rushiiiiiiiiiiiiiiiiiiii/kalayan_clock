const conn = require("../Connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
/* ================= ADMIN ================= */
const logActivity = (userId, action, description) => {
  const sql =
    "INSERT INTO activity_logs (user_id, action, description) VALUES (?, ?, ?)";
  conn.query(sql, [userId, action, description], (err) => {
    if (err) console.error("Activity Log Error:", err);
  });
};

exports.getdata = (_req, res) => {
  conn.query("SELECT * FROM login", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  conn.query(
    "SELECT * FROM login WHERE Email=? AND Password=?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (!result.length) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = result[0];

      // Generate JWT
      const token = jwt.sign(
        {
          id: user.Id,
          email: user.Email,
          role: user.User_type,
        },
        "LOGIN_SECRET_KEY"
      );

      // Set cookie
      res.cookie("login_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        // maxAge: 86400000,
      });

      // LOG ACTIVITY
      logActivity(
        user.Id,
        "ADMIN_LOGIN",
        `Admin (${user.Email}) logged into the system`
      );

      res.json({ message: "Login Successful" });
    }
  );
};

/* ================= PASSWORD ================= */

exports.forgetPassword = (req, res) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  conn.query(
    "UPDATE login SET otp=? WHERE email=?",
    [otp, req.body.email],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
};

exports.removeOtp = (req, res) => {
  setTimeout(() => {
    conn.query(
      "UPDATE login SET otp=NULL WHERE email=?",
      [req.body.email],
      () => {}
    );
  }, 3600000);
};

exports.updatePass = (req, res) => {
  conn.query(
    "UPDATE login SET password=? WHERE email=?",
    [req.body.password, req.body.email],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
};

/* ================= CUSTOMER ================= */

exports.addCustomer = async (req, res) => {
  const { Name, Mobile_No, Location, Language, Created_at, password } =
    req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  conn.query(
    "INSERT INTO user (Name, Mobile_No, Location, Language, password, Created_at) VALUES (?,?,?,?,?,?)",
    [Name, Mobile_No, Location, Language, hashPassword, Created_at],
    (err, result) => {
      if (err) throw err;

      const newTvId = result.insertId;

      const adminId = req.user?.id || null;
      const adminEmail = req.user?.email || null;

      // Log activity
      logActivity(
        adminId,
        "ADD_CUSTOMER",
        `${adminEmail} added → New Tv with TV_id: ${newTvId}, Name: ${Name}`
      );

      res.json({
        success: true,
        message: "Customer added successfully",
        Tv_id: newTvId,
        data: result,
      });
    }
  );
};

exports.addPerson = (req, res) => {
  const { email, Mobile_No, password, User_Type } = req.body;
  conn.query(
    "INSERT INTO login VALUES (NULL,?,?,?,?)",
    [email, Mobile_No, password, User_Type],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
};

exports.getNotification = (req, res) => {
  const { id } = req.params;
  const sql = `
  SELECT * FROM notification 
  WHERE Tv_id=?
  ORDER BY id DESC 
  LIMIT 1
  `;

  conn.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};
/* ================= CALENDAR ================= */

exports.getData = (req, res) => {
  const id = req.params.id;
  const { date } = req.body;

  let table =
    id === "English"
      ? "vedic_calender_english"
      : id === "Hindi"
      ? "vedic_calender_hindi"
      : "vedic_calender_marathi";

  const sql = `
    SELECT * FROM ?? 
    WHERE STR_TO_DATE(Gregorian_date, '%d/%b/%y') >= STR_TO_DATE(?, '%d/%b/%y')
    ORDER BY STR_TO_DATE(Gregorian_date,'%d/%b/%y') ASC LIMIT 10`;

  conn.query(sql, [table, date], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getAllCalendar = (req, res) => {
  let id = req.params.id;
  let sql =
    id === "English"
      ? "SELECT * FROM vedic_calender_english"
      : id === "Hindi"
      ? "SELECT * FROM vedic_calender_hindi"
      : "SELECT * FROM vedic_calender_marathi";

  conn.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.updateDetails = (req, res) => {
  conn.query(
    "UPDATE vedic_calender_marathi SET Suryoday=?, Suryasta=? WHERE id=?",
    [req.body.Suryoday, req.body.Suryasta, req.body.id],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
};

/* ================= NOTIFICATION ================= */

exports.sendNotification = (req, res) => {
  const { TV_id, Marathi_text, Start_time, End_time } = req.body;
  conn.query(
    "INSERT INTO notification VALUES (NULL,?,?,?,?)",
    [TV_id, Marathi_text, Start_time, End_time],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.fetchNotiication = (req, res) => {
  conn.query("SELECT * FROM user", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.adminLogout = (req, res) => {
  const adminId = req.user?.id;
  const adminEmail = req.user?.email;
  console.log(adminEmail);
  logActivity(adminId, "ADMIN LOGOUT", `Admin ${adminEmail} got log out`);

  res.clearCookie("login_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
  res.json({ success: true, message: "Admin Logged out successfully" });
};

exports.storeNotify = (req, res) => {
  const text = req.body;
  conn.query(
    "INSERT INTO storenotification (text) VALUES (?)",
    [req.body.text],
    (err, result) => {
      if (err) throw err;
      res.json("added successfully");
    }
  );
};

/* ================= UPLOAD BG ================= */

exports.uploadbg = (req, res) => {
  const { filename, originalname, mimetype } = req.file;
  conn.query(
    "INSERT INTO bgimages VALUES (NULL,?,?,?)",
    [originalname, `./uploads/${filename}`, mimetype],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
};

exports.getImages = (req, res) => {
  conn.query("SELECT * FROM bgimages", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};
exports.getallStoreNotification = (req, res) => {
  conn.query("SELECT * FROM storenotification", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
/* ================= CSV ================= */

// exports.uploadCSV = (req, res) => {
//   try {
//     const { data, lan } = req.body;

//     if (!Array.isArray(data) || data.length === 0) {
//       return res.status(400).json({ error: "No CSV data received" });
//     }

//     const REQUIRED_COLUMNS = 17; // number of columns in row

//     // Validate each row
//     for (let i = 0; i < data.length; i++) {
//       const row = Object.values(data[i]);

//       if (row.length !== REQUIRED_COLUMNS) {
//         return res.status(400).json({
//           error: `Row ${i + 1} has incorrect number of columns.`,
//           expected: REQUIRED_COLUMNS,
//           received: row.length,
//         });
//       }
//     }

//     // Select language table
//     const table =
//       lan === "en"
//         ? "vedic_calender_english"
//         : lan === "hi"
//         ? "vedic_calender_hindi"
//         : "vedic_calender_marathi";

//     const values = data.map((item) => Object.values(item));

//     const sql = `INSERT INTO ${table} VALUES ?`;

//     conn.query(sql, [values], (err, result) => {
//       if (err) {
//         console.error("CSV Insert Error:", err);
//         return res.status(400).json({
//           error: "CSV format mismatch or incorrect data",
//           details: err.sqlMessage,
//         });
//       }

//       const adminId = req.user?.id;
//       const adminEmail = req.user?.email;
//       logActivity(
//         adminId,
//         "Uploaded CSV file",
//         `${adminEmail} uploaded the csv to ${table} with ${result.affectedRows} rows`
//       )
//       res.status(200).json({
//         message: "CSV uploaded successfully",
//         affectedRows: result.affectedRows,
//       });
//     });
//   } catch (error) {
//     console.error("Server Crash Prevented:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.uploadCSV = async (req, res) => {
  const { data, lan } = req.body;

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
    typeof item["दिनविशेष"] === "string" ? item["दिनविशेष"].trim() : null, // Dinvishesh
    item["अयन"] || null,
    item["ऋतू"] || null,
    item["विक्रम संवत"] || null,
    item["शक संवत"] || null,
  ]);

  // console.log("Sample row for insert:");

  const table =
    lan === "en"
      ? "vedic_calender_english"
      : lan === "hi"
      ? "vedic_calender_hindi"
      : lan === "mr"
      ? "vedic_calender_marathi"
      : null;

  if (!table) {
    return res.status(400).json({ error: "Invalid language" });
  }

  const sql = `
    INSERT INTO ${table} (
      gregorian_date, indian_date, vedic_date, war,
      purnimant_tithi, amant_tithi, nakshatra, yog,
      DivaKaran, RatriKaran, suryoday, suryasta,
      Dinvishesh, ayan, Rutu, VikramSamvat, shaksavant
    ) VALUES ?
    ON DUPLICATE KEY UPDATE
      indian_date = VALUES(indian_date),
      vedic_date = VALUES(vedic_date),
      war = VALUES(war),
      purnimant_tithi = VALUES(purnimant_tithi),
      amant_tithi = VALUES(amant_tithi),
      nakshatra = VALUES(nakshatra),
      yog = VALUES(yog),
      DivaKaran = VALUES(DivaKaran),
      RatriKaran = VALUES(RatriKaran),
      suryoday = VALUES(suryoday),
      suryasta = VALUES(suryasta),
      Dinvishesh = VALUES(Dinvishesh),
      ayan = VALUES(ayan),
      Rutu = VALUES(Rutu),
      VikramSamvat = VALUES(VikramSamvat),
      shaksavant = VALUES(shaksavant)
  `;

  conn.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    const adminId = req.user?.id;
    const adminEmail = req.user?.email;
    logActivity(
      adminId,
      "UPLOADED CSV FILE",
      `Admin ${adminEmail} Uploaded the CSV to ${table} with ${result.affectedRows} rows`
    );
    res.status(200).json({ message: "Data uploaded successfully", result });
  });
};

/* ================= USERS ================= */

exports.allTv = (req, res) => {
  conn.query("SELECT * FROM user", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};
exports.AddNakshatra = (req, res) => {
  const dataArray = req.body;

  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  const requiredFields = [
    "Nakshatra Mandal",
    "Date",
    "रवि",
    "चंद्र",
    "मंगल",
    "बुध",
    "गुरु",
    "शुक्र",
    "शनि",
    "राहू",
    "केतु",
  ];

  const sql = `
    INSERT INTO planets 
    (Nakshatra_mandal, date, Ravi, Chandra, mangal, Budh, Guru, Shukra, Shani, Rahu, Ketu)
    VALUES ?
  `;

  // Build a 2D array of values
  const values = dataArray.map((data) => [
    data["Nakshatra Mandal"],
    data["Date"],
    data["रवि"],
    data["चंद्र"],
    data["मंगल"],
    data["बुध"],
    data["गुरु"],
    data["शुक्र"],
    data["शनि"],
    data["राहू"],
    data["केतु"],
  ]);
  for (let i = 0; i < dataArray.length; i++) {
    const data = dataArray[i];
    for (const field of requiredFields) {
      if (!data[field] && data[field] !== 0) {
        // treat 0 as valid
        return res.status(400).json({
          error: `Missing value for field "${field}" in record at index ${i}`,
        });
      }
    }
  }

  conn.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Failed to insert data" });
    }
    const adminId = req.user?.id;
    const adminEmail = req.user?.email;
    logActivity(
      adminId,
      "UPLOADED NAKSHATRA DATA",
      `Admin ${adminEmail} Uploaded the Nakshatra data Successfully`
    );
    return res.status(200).json({
      message: "Bulk insert successful",
      rowsInserted: result.affectedRows,
    });
  });
};

exports.deleteEnglish = (req, res) => {
  conn.query("DELETE FROM vedic_calender_english", (err) => {
    res.send("Deleted");
  });
};

// const conn = require("../Connection");
// const jwt = require("jsonwebtoken");

// /* ================= ADMIN AUTH ================= */

// exports.getdata = (_req, res) => {
//   const sql = "SELECT * FROM login";
//   conn.query(sql, (err, result) => {
//     if (err) throw err;
//     return res.json(result);
//   });
// };

// exports.login = (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const sql = "SELECT * FROM login WHERE email = ? AND password = ?";

//     conn.query(sql, [email, password], (err, result) => {
//       if (err) return res.status(500).json({ error: "Internal Server Error" });

//       if (result.length === 0) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }

//       const user = result[0];

//       const token = jwt.sign(
//         { id: user.id, email: user.email, role: user.User_Type },
//         "LOGIN_SECRET_KEY"
//       );

//       res.cookie("login_token", token, {
//         httpOnly: true,
//         secure: false,
//         sameSite: "none",
//         maxAge: 86400000,
//       });

//       return res.status(200).json({ message: "Login Successful" });
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

// /* ================= PASSWORD ================= */

// exports.forgetPassword = (req, res) => {
//   const { email } = req.body;

//   function getRandomFourDigit() {
//     return Math.floor(1000 + Math.random() * 9000);
//   }

//   const sql = "UPDATE login SET otp = ? WHERE email = ?";
//   conn.query(sql, [getRandomFourDigit(), email], (error, result) => {
//     if (error) throw error;
//     return res.json(result);
//   });
// };

// exports.removeOtp = (req, res) => {
//   setTimeout(() => {
//     const { email } = req.body;
//     const sql = "UPDATE login SET otp = null WHERE email = ?";
//     conn.query(sql, [email], (err, result) => {
//       if (err) throw err;
//       return res.json(result);
//     });
//   }, 3600000);
// };

// exports.updatePass = (req, res) => {
//   const { email, password } = req.body;
//   const sql = "UPDATE login SET password = ? WHERE email = ?";
//   conn.query(sql, [password, email], (err, result) => {
//     if (err) throw err;
//     return res.json(result);
//   });
// };

// /* ================= CUSTOMER ================= */

// exports.addCustomer = (req, res) => {
//   const { Tv_id, Name, Mobile_No, Location, Language, Created_at, Updated_at } =
//     req.body;

//   const sql = `INSERT INTO user
//   (Tv_id, Name, Mobile_No, Location, Language, Created_at)
//   VALUES (?, ?, ?, ?, ?, ?)`;

//   conn.query(
//     sql,
//     [Tv_id, Name, Mobile_No, Location, Language, Created_at, Updated_at],
//     (err, result) => {
//       if (err) throw err;
//       return res.json(result);
//     }
//   );
// };

// exports.addPerson = (req, res) => {
//   const { email, Mobile_No, password, User_Type } = req.body;
//   const sql = `INSERT INTO login (email, Mobile_No, password, User_Type) VALUES (?, ?, ?, ?)`;
//   conn.query(sql, [email, Mobile_No, password, User_Type], (err, result) => {
//     if (err) throw err;
//     return res.json(result);
//   });
// };

// /* ================= CALENDAR ================= */

// exports.getData = (req, res) => {
//   const { date } = req.body;
//   const id = req.params.id;

//   if (!date) return res.status(400).json({ error: "Date is required" });

//   let tableName;
//   if (id === "English") tableName = "vedic_calender_english";
//   else if (id === "Hindi") tableName = "vedic_calender_hindi";
//   else tableName = "vedic_calender_marathi";

//   const sql = `
//     SELECT Id,Gregorian_date,Indian_date,Vedic_date,War,
//     Purnimant_tithi,Amant_tithi,Nakshatra,Yog,DivaKaran,
//     RatriKaran,Suryoday,Suryasta,Dinvishesh,Ayan,Rutu,
//     VikramSamvat,shaksavant
//     FROM ??
//     WHERE STR_TO_DATE(Gregorian_date, '%d/%b/%y') >= STR_TO_DATE(?, '%d/%b/%y')
//     ORDER BY STR_TO_DATE(Gregorian_date, '%d/%b/%y') ASC
//     LIMIT 10
//   `;

//   conn.query(sql, [tableName, date], (err, result) => {
//     if (err) return res.status(500).json({ error: "Database query failed" });
//     if (!result.length)
//       return res.status(404).json({ message: "No record found" });
//     res.json(result);
//   });
// };

// exports.getAllCalendar = (req, res) => {
//   const id = req.params.id;

//   let sql;
//   if (id == "English") sql = "SELECT * FROM vedic_calender_english";
//   else if (id == "Hindi") sql = "SELECT * FROM vedic_calender_Hindi";
//   else sql = "SELECT * FROM vedic_calender_marathi";

//   conn.query(sql, (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// };

// exports.updateDetails = (req, res) => {
//   const { Suryoday, Suryasta, id } = req.body;
//   const query =
//     "UPDATE vedic_calender_marathi SET Suryoday=?, Suryasta=? WHERE id=?";

//   conn.query(query, [Suryoday, Suryasta, id], (err, result) => {
//     if (err) throw err;
//     return res.json(result);
//   });
// };

// /* ================= NOTIFICATION ================= */

// exports.getNotification = (req, res) => {
//   const { id } = req.params;
//   const sql = `
//   SELECT * FROM notification
//   WHERE Tv_id=?
//   ORDER BY id DESC
//   LIMIT 1
//   `;

//   conn.query(sql, [id], (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// };

// exports.receive = (req, res) => {
//   const { id } = req.params;
//   conn.query(
//     "INSERT INTO receive (Tv_id,Create_at) VALUES (?,?)",
//     [id, new Date()],
//     (err, result) => {
//       if (err) throw err;
//       res.json(result);
//     }
//   );
// };

// exports.storeNotify = (req, res) => {
//   const data = req.body;
//   conn.query(
//     "INSERT INTO storenotification (text) VALUES (?)",
//     [data.text],
//     (err, result) => {
//       if (err) throw err;
//       res.json("added successfully");
//     }
//   );
// };

// exports.sendNotification = (req, res) => {
//   const { TV_id, Marathi_text, Start_time, End_time } = req.body;

//   conn.query(
//     "INSERT INTO notification (TV_id,Marathi_text, Start_time, End_time) VALUES (?,?,?,?)",
//     [TV_id, Marathi_text, Start_time, End_time],
//     (err, result) => {
//       if (err)
//         return res.status(500).json({ error: "Database error during insert" });

//       res.json({ message: "Notification inserted successfully", result });
//     }
//   );
// };

// /* ================= SUBSCRIPTION ================= */

// exports.UploadPlan = (req, res) => {
//   const { TV_id, Subscription_type, amount, date } = req.body;
//   conn.query(
//     "INSERT INTO subscriptions (TV_id,Subscription_type,amount,date) VALUES (?,?,?,?)",
//     [TV_id, Subscription_type, amount, date],
//     (err, result) => {
//       if (err) throw err;
//       res.json({ message: "Subscription inserted successfully", result });
//     }
//   );
// };

// /* ================= UPLOAD BG ================= */

// exports.uploadbg = (req, res) => {
//   const { originalname, mimetype, filename } = req.file;
//   const filePath = `./uploads/${filename}`;

//   conn.query(
//     "INSERT INTO bgimages (name,image,contentType) VALUES (?,?,?)",
//     [originalname, filePath, mimetype],
//     (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json({ message: "Image uploaded successfully", id: result.insertId });
//     }
//   );
// };

// exports.getImages = (req, res) => {
//   conn.query("SELECT * FROM bgimages", (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// };

// /* ================= CSV ================= */

// exports.uploadCSV = (req, res) => {
//   const { data, lan } = req.body;

//   const values = data.map((item) => [
//     item["Gregorian Date"]?.replace(/"/g, "") || null,
//     item["Indian Date"] || null,
//     item["Vedic Date"]?.replace(/"/g, "") || null,
//     item["वार"] || null,
//     item["पूर्णिमान्त तिथी"] || null,
//     item["आमान्त तिथी"] || null,
//     item["नक्षत्र"] || null,
//     item["योग"] || null,
//     item["दिवा करण"] || null,
//     item["रात्री करण"] || null,
//     item["suryoday"] || null,
//     item["suryasta"] || null,
//     item["दिनविशेष"]?.trim() || null,
//     item["अयन"] || null,
//     item["ऋतू"] || null,
//     item["विक्रम संवत"] || null,
//     item["शक संवत"] || null,
//   ]);

//   const table =
//     lan === "en"
//       ? "vedic_calender_english"
//       : lan === "hi"
//       ? "vedic_calender_hindi"
//       : "vedic_calender_marathi";

//   const sql = `INSERT INTO ${table} (
//     gregorian_date,indian_date,vedic_date,war,
//     purnimant_tithi,amant_tithi,nakshatra,yog,
//     DivaKaran,RatriKaran,suryoday,suryasta,
//     Dinvishesh,ayan,Rutu,VikramSamvat,shaksavant
//   ) VALUES ? ON DUPLICATE KEY UPDATE
//     indian_date=VALUES(indian_date),
//     vedic_date=VALUES(vedic_date),
//     war=VALUES(war),
//     purnimant_tithi=VALUES(purnimant_tithi),
//     amant_tithi=VALUES(amant_tithi),
//     nakshatra=VALUES(nakshatra),
//     yog=VALUES(yog),
//     DivaKaran=VALUES(DivaKaran),
//     RatriKaran=VALUES(RatriKaran),
//     suryoday=VALUES(suryoday),
//     suryasta=VALUES(suryasta),
//     Dinvishesh=VALUES(Dinvishesh),
//     ayan=VALUES(ayan),
//     Rutu=VALUES(Rutu),
//     VikramSamvat=VALUES(VikramSamvat),
//     shaksavant=VALUES(shaksavant)
//   `;

//   conn.query(sql, [values], (err, result) => {
//     if (err) throw err;
//     res.json({ message: "Data uploaded successfully", result });
//   });
// };

// /* ================= USERS ================= */

// exports.allTv = (req, res) => {
//   conn.query("SELECT * FROM user", (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// };

// exports.deleteEnglish = (req, res) => {
//   conn.query("DELETE FROM vedic_calender_english", (err) => {
//     if (err) return res.status(500).send("Error deleting data");
//     res.send("All data deleted successfully");
//   });
// };
