const router = require("express").Router();
const controlRegister = require("../Controller/controlRegister");
const auth = require("../Middleware/auth");

router.post("/", controlRegister.user_register);
router.get("/", auth, controlRegister.welcome_user);

module.exports = router;
