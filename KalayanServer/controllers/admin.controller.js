const conn = require("../Connection");
const jwt = require("jsonwebtoken");

/* ================= ADMIN ================= */

exports.getdata = (_req, res) => {
  conn.query("SELECT * FROM login", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  conn.query(
    "SELECT * FROM login WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (!result.length)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = result[0];
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.User_Type },
        "LOGIN_SECRET_KEY"
      );

      res.cookie("login_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 86400000,
      });

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

exports.addCustomer = (req, res) => {
  const { Tv_id, Name, Mobile_No, Location, Language, Created_at } = req.body;
  conn.query(
    "INSERT INTO user (Tv_id,Name,Mobile_No,Location,Language,Created_at) VALUES (?,?,?,?,?,?)",
    [Tv_id, Name, Mobile_No, Location, Language, Created_at],
    (err, result) => {
      if (err) throw err;
      res.json(result);
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

exports.storeNotify = (req, res) => {
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

/* ================= CSV ================= */

exports.uploadCSV = (req, res) => {
  const { data, lan } = req.body;

  let table =
    lan === "en"
      ? "vedic_calender_english"
      : lan === "hi"
      ? "vedic_calender_hindi"
      : "vedic_calender_marathi";

  const values = data.map((item) => Object.values(item));

  conn.query(`INSERT INTO ${table} VALUES ?`, [values], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

/* ================= USERS ================= */

exports.allTv = (req, res) => {
  conn.query("SELECT * FROM user", (err, result) => {
    if (err) throw err;
    res.json(result);
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
