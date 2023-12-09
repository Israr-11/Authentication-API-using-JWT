const router = require("express").Router();
const controlLogin = require("../Controller/controlLogin");

router.post("/", controlLogin.user_login);

module.exports = router;
