const express = require("express");
const router = express.Router();
router.get("/reg", (req, res) => {
  res.send("reg page of site");
});
router.get("/auth", (req, res) => {
  res.send("Login page");
});
router.get("/dashboard", (req, res) => {
  res.send("Page dashboard");
});
module.exports = router;