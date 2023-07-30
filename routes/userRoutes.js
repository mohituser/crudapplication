const express=require("express");

const { signup, login, forgotPassword, resetPassword, updateUserDetails, home, loginpage, update, forgotpass, resetpass, fetchUser } = require("../controllers/userController");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const router=express.Router();

router.route("/").get(home);

router.route("/fetch").get(fetchUser);
router.route("/loginpage").get(loginpage);
router.route("/login").post(login);
router.route("/forgotpass").get(forgotpass);
router.route("/update").get(update);
router.route("/signup").post(signup);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/password/reset/:token").get(resetpass);
router.route("/updateUserDetails").post(isLoggedIn,updateUserDetails);
module.exports=router;