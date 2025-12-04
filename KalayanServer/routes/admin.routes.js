const router = require("express").Router();
const admin = require("../controllers/admin.controller");

/* ================= ADMIN ================= */
router.get("/getdata", admin.getdata);
router.post("/login", admin.login);

/* ================= PASSWORD ================= */
router.post("/forgetPassword", admin.forgetPassword);
router.post("/remove_otp", admin.removeOtp);
router.post("/update_pass", admin.updatePass);

/* ================= CUSTOMER ================= */
router.post("/add_customer", admin.addCustomer);
router.post("/add_person", admin.addPerson);

/* ================= CALENDAR ================= */
router.post("/get_data/:id", admin.getData);
router.get("/get_all_data/:id", admin.getAllCalendar);
router.post("/update_details", admin.updateDetails);

/* ================= NOTIFICATION ================= */
router.post("/send_notification", admin.sendNotification);
router.post("/store_notify", admin.storeNotify);

/* ================= IMAGE ================= */
const upload = require("../middlewares/upload.middleware");
router.post("/uploadbg", upload.single("image"), admin.uploadbg);
router.get("/image", admin.getImages);

/* ================= CSV ================= */
router.post("/uploadCSV", admin.uploadCSV);

/* ================= USERS ================= */
router.get("/All_tv", admin.allTv);

/* ================= DELETE ================= */
router.get("/delete-usn-express", admin.deleteEnglish);

module.exports = router;
