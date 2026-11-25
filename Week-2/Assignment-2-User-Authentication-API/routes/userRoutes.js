
const express = require("express");
const router = express.Router();
const protect = require("../config/authMiddleware");

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Protected profile accessed successfully!",
        userId: req.user
    });
});

module.exports = router;
