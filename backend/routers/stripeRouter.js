const router = require("express").Router();
const express = require("express");
const { webHook } = require("../controllers/stripeController");
const cors = require("cors");

router.post(
  "/webhook",
  cors(),
  express.raw({ type: "application/json" }),
  webHook
);

module.exports = router;
