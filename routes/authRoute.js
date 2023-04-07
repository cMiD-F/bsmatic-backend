const express = require("express");
const {createUser} = require("../controller/userController");
const router = express.Router();

router.post("/registro", createUser);
module.exports = router;