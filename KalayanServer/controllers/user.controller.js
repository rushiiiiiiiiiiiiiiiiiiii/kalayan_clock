const conn = require("../Connection");
const jwt = require("jsonwebtoken");

/* ================= AUTH ================= */

exports.tvCheckAuth = (req, res) => {
  const token = req.cookies.tv_token;
  if (!token) return res.json({ auth: false });

  jwt.verify(token, "TV_SECRET_KEY", (err, decoded) => {
    if (err) return res.json({ auth: false });
    res.json({ auth: true, user: decoded });
  });
};

exports.tvLogin = (req, res) => {
  const { Mobile_No, password } = req.body;

  conn.query(
    "SELECT * FROM user WHERE Mobile_No=? AND password=?",
    [Mobile_No, password],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (!result.length)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { Tv_id: result[0].Tv_id, Mobile_No: result[0].Mobile_No },
        "TV_SECRET_KEY"
      );

      res.cookie("tv_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 315360000000,
      });

      res.json({ message: "Login Successful" });
    }
  );
};

/* ================= STATUS ================= */

exports.status = (req, res) => {
  const token = req.cookies.tv_token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  jwt.verify(token, "TV_SECRET_KEY", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    conn.query(
      "UPDATE user SET status='Active' WHERE Tv_id=?",
      [decoded.Tv_id],
      () => res.json("TV Active")
    );
  });
};


/* ================= MEDIA ================= */

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

/* ================= NOTIFICATION ================= */

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
  const token = req.cookies.tv_token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  jwt.verify(token, "TV_SECRET_KEY", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    conn.query(
      "INSERT INTO receive (Tv_id,Create_at) VALUES (?,NOW())",
      [decoded.Tv_id],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Received" });
      }
    );
  });
};


/* ================= NAKSHATRA ================= */

exports.todayNakshatra = (_req, res) => {
  conn.query(
    "SELECT * FROM planets ORDER BY id DESC LIMIT 1",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

/* ================= SUBSCRIPTION ================= */

exports.getSubscription = (req, res) => {
  conn.query(
    "SELECT * FROM subscriptions WHERE TV_id=? ORDER BY id DESC LIMIT 1",
    [req.params.user_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};


// const conn = require("../Connection");
// const jwt = require("jsonwebtoken");

// /* ================= AUTH ================= */

// exports.tvCheckAuth = (req, res) => {
//   const token = req.cookies.tv_token;
//   if (!token) return res.json({ auth: false });

//   jwt.verify(token, "TV_SECRET_KEY", (err, decoded) => {
//     if (err) return res.json({ auth: false });
//     res.json({ auth: true, user: decoded });
//   });
// };

// exports.tvLogin = (req, res) => {
//   const { Mobile_No, password } = req.body;

//   conn.query(
//     "SELECT * FROM user WHERE Mobile_No=? AND password=?",
//     [Mobile_No, password],
//     (err, result) => {
//       if (err) return res.status(500).json({ error: err });

//       if (!result.length)
//         return res.status(401).json({ message: "Invalid credentials" });

//       const user = result[0];

//       const token = jwt.sign(
//         { Tv_id: user.Tv_id, Mobile_No: user.Mobile_No },
//         "TV_SECRET_KEY"
//       );

//       res.cookie("tv_token", token, {
//         httpOnly: true,
//         sameSite: "lax",
//         secure: false,
//         maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
//       });

//       res.json({ message: "Login Successful" });
//     }
//   );
// };

// /* ================= STATUS ================= */

// exports.status = (req, res) => {
//   const id = req.params.id;
//   conn.query(
//     "UPDATE user SET status='Active' WHERE Tv_id=?",
//     [id],
//     (err) => {
//       if (err) throw err;
//       res.json("Tv is active");
//     }
//   );
// };

// /* ================= MEDIA ================= */

// exports.mediaFiles = (req, res) => {
//   conn.query("SELECT * FROM media_files", (err, result) => {
//     if (err) res.status(500).json(err.message);
//     res.json(result);
//   });
// };

// exports.userSchedule = (req, res) => {
//   conn.query("SELECT * FROM media_schedules", (err, results) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json(results);
//   });
// };
