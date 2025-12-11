const conn = require("../Connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// ================= AUTH ================= //
const logActivity = (userId, action, description) => {
  const sql =
    "INSERT INTO activity_logs (user_id, action, description) VALUES (?, ?, ?)";
  conn.query(sql, [userId, action, description], (err) => {
    if (err) console.error("Activity Log Error:", err);
  });
};

exports.tvCheckAuth = (req, res) => {
  const token = req.cookies.tv_token;
  if (!token) return res.json({ auth: false });

  jwt.verify(token, "TV_SECRET_KEY", (err, decoded) => {
    if (err) return res.json({ auth: false });
    res.json({ auth: true, user: decoded });
  });
};

exports.tvLogin = async (req, res) => {
  const { Mobile_No, password } = req.body;

  conn.query(
    "SELECT * FROM user WHERE Mobile_No=?",
    [Mobile_No],
    async (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result.length)
        return res.status(401).json({ message: "Invalid credentials" });
      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).send({
          message: "Invalid Password",
          success: false,
        });
      }
      const token = jwt.sign(
        { Tv_id: result[0].Tv_id, Mobile_No: result[0].Mobile_No },
        "TV_SECRET_KEY"
      );

      res.cookie("tv_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      });
      const userId = result[0].Tv_id;
      const userName = result[0].Name;
      const userNo = result[0].Mobile_No;
      logActivity(
        userId,
        "TV USER LOGEDIN",
        `User ${userName} with Mobile No ${userNo} got logedin`
      );

      res.json({ message: "Login Successful" });
    }
  );
};

exports.status = (req, res) => {
  conn.query(
    "UPDATE user SET status='Active' WHERE Tv_id=?",
    [req.params.id],
    () => res.json("TV Active")
  );
};

// ================= MEDIA ================= //

exports.mediaFiles = (_req, res) => {
  conn.query("SELECT * FROM media_files", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.userSchedule = (_req, res) => {
  conn.query("SELECT * FROM media_schedules", (err, result) => {
    res.json(result);
  });
};
exports.advertise = (_req, res) => {
  res.json({
    message: "No advertisement yet",
    success: true,
  });
};
exports.fetchImages = (req, res) => {
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
};
// ================= NOTIFICATION ================= //

exports.getNotificationByTV = (req, res) => {
  const token = req.cookies.tv_token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  jwt.verify(token, "TV_SECRET_KEY", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    conn.query(
      "SELECT * FROM notification WHERE Tv_id=? ORDER BY id DESC LIMIT 1",
      [decoded.Tv_id],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
      }
    );
  });
};

exports.receiveSignal = (req, res) => {
  conn.query(
    "INSERT INTO receive (Tv_id,Create_at) VALUES (?,NOW())",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Received" });
    }
  );
};

// ================= NAKSHATRA ================= //

exports.todayNakshatra = (_req, res) => {
  conn.query(
    "SELECT * FROM planets ORDER BY id DESC LIMIT 1",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.addNakshatra = (req, res) => {
  const dataArray = req.body;

  if (!Array.isArray(dataArray)) {
    return res.status(400).json({ error: "Invalid data format" });
  }

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

  const sql = `
    INSERT INTO planets 
    (Nakshatra_mandal, date, Ravi, Chandra, mangal, Budh, Guru, Shukra, Shani, Rahu, Ketu)
    VALUES ?
  `;

  conn.query(sql, [values], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Inserted successfully", rows: result.affectedRows });
  });
};

// Fetch Inactive Tvs

exports.fetchUserActivation = (req, res) => {
  conn.query("SELECT * FROM user WHERE Status='Inactive'", (err, result) => {
    if (err) throw err;

    // Log each inactive TV
    result.forEach((tv) => {
      logActivity(null, "TV_INACTIVE", `TV ${tv.Tv_id} is inactive`);
    });

    res.json({
      message: "Inactive TVs fetched successfully",
      success: true,
      result,
    });
  });
};

// ================= VEDIC CALENDAR ================= //

exports.getAllData = (req, res) => {
  const table =
    req.params.id === "English"
      ? "vedic_calender_english"
      : req.params.id === "Hindi"
      ? "vedic_calender_hindi"
      : "vedic_calender_marathi";

  conn.query(`SELECT * FROM ${table}`, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getData = (req, res) => {
  const table =
    req.params.id === "English"
      ? "vedic_calender_english"
      : req.params.id === "Hindi"
      ? "vedic_calender_hindi"
      : "vedic_calender_marathi";

  const sql = `
    SELECT * FROM ${table}
    WHERE STR_TO_DATE(Gregorian_date, '%d/%b/%y') >= STR_TO_DATE(?, '%d/%b/%y')
    ORDER BY STR_TO_DATE(Gregorian_date, '%d/%b/%y')
    LIMIT 10
  `;

  conn.query(sql, [req.body.date], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.updateDetails = (req, res) => {
  const { Suryoday, Suryasta, id } = req.body;

  conn.query(
    "UPDATE vedic_calender_marathi SET Suryoday=?, Suryasta=? WHERE id=?",
    [Suryoday, Suryasta, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
