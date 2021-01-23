const router = require("express").Router();

const user_controllers = require("../controllers/user_controllers");

const auth = require("../middleware/auth");

router.post("/adduser", user_controllers.addUser);

router.post("/login", user_controllers.login);

router.put("/update", auth, user_controllers.update);

router.get("/getUser", auth, user_controllers.getUser);

module.exports = router;
