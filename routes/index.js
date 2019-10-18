var express = require("express");
var router = express.Router();

// Get service status
router.get("/", function(req, res, next) {
  res.send("ws-geodata-api-service working");
});

module.exports = router;
