const router = require("express").Router();
const express = require("express");
const { webHook } = require("../controllers/stripeController");

router.post("/webhook", express.raw({ type: "application/json" }), webHook);

module.exports = router;
