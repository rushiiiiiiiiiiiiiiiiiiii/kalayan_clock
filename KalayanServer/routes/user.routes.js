const router = require("express").Router();
const user = require("../controllers/user.controller");

/* ================= AUTH ================= */
router.post("/Tv_login", user.tvLogin);
router.get("/tv-check-auth", user.tvCheckAuth);

/* ================= STATUS ================= */
router.get("/status", user.status);
router.get("/Get_notification", user.getNotificationByTV);
router.post("/receive", user.receiveSignal);

/* ================= NAKSHATRA ================= */
router.get("/Nakshtra", user.todayNakshatra);

/* ================= MEDIA ================= */
router.get("/media-files", user.mediaFiles);
router.get("/user-schedule", user.userSchedule);

/* ================= SUBSCRIPTION ================= */
router.get("/subscription/:user_id", user.getSubscription);

module.exports = router;
