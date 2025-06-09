const router = require("express").Router();

const controlLogin = require("../controller/controlLogin");

router.post("/", controlLogin.user_login);


module.exports = router;
