require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config/db");
const cloudinary = require("./config/cloudinary");

const userRouter = require("./routers/userRouter");
const categoryRouter = require("./routers/categoryRouter");
const productRouter = require("./routers/productRouter");
const subProductRouter = require("./routers/subProductRouter");
const orderRouter = require("./routers/orderRouter");
const bookRouter = require("./routers/bookRouter");
const stripeRouter = require("./routers/stripeRouter");

const app = express();
app.use(
  cors({
    origin: [
      "https://rentify-app.netlify.app",
      "https://rentify-dashboard-app.netlify.app, ",
      "https://checkout.stripe.com",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
  })
);
app.use(morgan("dev"));
cloudinary();

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/subproduct", subProductRouter);
app.use("/order", orderRouter);
app.use("/book", bookRouter);
app.use("/stripe", stripeRouter);

app.get("/", (req, res) => {
  res.send("This is a rent project");
});

db(app);
