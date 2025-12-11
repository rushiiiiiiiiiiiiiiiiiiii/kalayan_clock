const router = require("express").Router();
const admin = require("../controllers/admin.controller");
const adminAuth = require("../middlewares/Ownerauth.middleware");
const upload = require("../middlewares/upload.middleware");

/* ================= PUBLIC ROUTES ================= */
router.post("/login", admin.login);
router.post("/logout", adminAuth,  admin.adminLogout);
router.post("/forgetPassword", admin.forgetPassword);
router.post("/remove_otp", admin.removeOtp);
router.post("/update_pass", admin.updatePass);

/* ================= PROTECTED ROUTES ================= */
router.use(adminAuth);

/* ================= ADMIN DATA ================= */
router.get("/getdata", admin.getdata);

/* ================= CUSTOMER ================= */
router.post("/add_customer", admin.addCustomer);
router.post("/add_customer", admin.addCustomer);
router.post("/add-nakshatra", admin.AddNakshatra);

/* ================= CALENDAR ================= */
router.post("/get_data/:id", admin.getData);
router.get("/get_all_data/:id", admin.getAllCalendar);
router.post("/update_details", admin.updateDetails);

/* ================= NOTIFICATION ================= */
router.post("/send_notification", admin.sendNotification);
router.get("/fetch_notification", admin.fetchNotiication);
router.get("/fetch_storenotification", admin.getallStoreNotification);
router.post("/store_notify", admin.storeNotify);

/* ================= IMAGE ================= */
router.post("/uploadbg", upload.single("image"), admin.uploadbg);
router.get("/image", admin.getImages);

/* ================= CSV ================= */
router.post("/uploadCSV", admin.uploadCSV);

/* ================= USERS ================= */
router.get("/All_tv", admin.allTv);

/* ================= DELETE ================= */
router.get("/delete-usn-express", admin.deleteEnglish);

module.exports = router;
