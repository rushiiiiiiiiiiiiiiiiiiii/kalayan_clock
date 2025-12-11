const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");

// ========= AUTH ========= //
router.post("/Tv_login", user.tvLogin);
router.get("/tv-check-auth", user.tvCheckAuth);
router.get("/status", user.status);
router.get("/image", user.fetchImages);
router.get("/advertise", user.advertise);

// ========= NOTIFICATIONS ========= //
router.get("/Get_notification", user.getNotificationByTV);

router.post("/receive/:id", user.receiveSignal);
router.get("/notification", user.getNotificationByTV);

// ========= MEDIA ========= //
router.get("/media-files", user.mediaFiles);
router.get("/user-schedule", user.userSchedule);

// ========= SUBSCRIPTION ========= //
// router.get("/subscription/:user_id", user.getSubscription);

// ========= NAKSHATRA ========= //
router.get("/today-nakshatra", user.todayNakshatra);
router.get("/Nakshtra", user.todayNakshatra);
router.post("/add-nakshatra", user.addNakshatra);

// ========= VEDIC CALENDAR ========= //
router.get("/get_all_data/:id", user.getAllData);
router.post("/get_data/:id", user.getData);
router.post("/update_details", user.updateDetails);

module.exports = router;




// const router = require("express").Router();
// const user = require("../controllers/user.controller");
// const tvAuth = require('../middlewares/Userauth.middleware')

// /* ================= AUTH ================= */
// router.post("/Tv_login", user.tvLogin); // NO auth for login
// router.get("/tv-check-auth", tvAuth, user.tvCheckAuth);

// /* ================= STATUS ================= */
// router.get("/status", tvAuth, user.status);
// router.get("/Get_notification", tvAuth, user.getNotificationByTV);
// router.post("/receive", tvAuth, user.receiveSignal);

// /* ================= NAKSHATRA ================= */
// router.get("/Nakshtra", tvAuth, user.todayNakshatra);

// /* ================= MEDIA ================= */
// router.get("/media-files", tvAuth, user.mediaFiles);
// router.get("/user-schedule", tvAuth, user.userSchedule);

// /* ================= SUBSCRIPTION ================= */
// router.get("/subscription/:user_id", tvAuth, user.getSubscription);

// module.exports = router;
