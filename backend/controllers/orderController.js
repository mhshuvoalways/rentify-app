const Order = require("../Model/Order");
const OrderQue = require("../Model/OrderQue");
const Booked = require("../Model/Booked");
const Product = require("../Model/Product");
const serverError = require("../utils/serverError");
const orderValidation = require("../validations/orderValidation");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");

const addOrder = async (req, res) => {
  const { shippingAddress, totalPrice, products } = req.body;
  const validation = orderValidation(shippingAddress);
  if (validation.isValid) {
    const originalProducts = [];
    const productIds = [];
    products.map((el) => productIds.push(el._id));
    const produ = await Product.find({ _id: { $in: productIds } });
    produ.map((pro) => {
      products.map((proGet) => {
        if (
          pro._id.toString() === proGet._id.toString() &&
          pro.price === proGet.price / proGet.quantity
        ) {
          originalProducts.push({
            name: pro.title,
            price: pro.price,
            quantity: proGet.quantity,
          });
        }
      });
    });
    try {
      const customer = await stripe.customers.create({
        metadata: {
          userId: req.user._id,
        },
      });
      const orderObj = {
        user: req.user._id,
        userId: customer.id,
        shippingAddress,
        products,
        totalPrice,
      };
      OrderQue(orderObj).save();
      const session = await stripe.checkout.sessions.create({
        line_items: originalProducts.map((el) => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: el.name,
              },
              unit_amount: el.price * 100,
            },
            quantity: el.quantity,
          };
        }),
        customer: customer.id,
        mode: "payment",
        payment_method_types: ['card'],
        success_url: `${process.env.FRONTEND_URL}/myaccount`,
        cancel_url: `${process.env.FRONTEND_URL}/book`,
      });
      res.status(200).json({
        sessionUrl: session.url,
      });
    } catch (err) {
      serverError(res);
    }
  } else {
    res.status(400).json(validation.error);
  }
};

const orderInCase = (req, res) => {
  const { shippingAddress, totalPrice, products } = req.body;
  const validation = orderValidation(shippingAddress);
  if (validation.isValid) {
    const orderObj = {
      user: req.user._id,
      shippingAddress,
      products,
      totalPrice,
      paymentMethod: {
        cash: "Cash",
        tranId: uuidv4(),
      },
    };
    new Order(orderObj)
      .save()
      .then((response) => {
        res.status(200).json(response);
        Booked.deleteMany({ user: req.user._id }).exec();
      })
      .catch(() => {
        serverError(res);
      });
  } else {
    res.status(400).json(validation.error);
  }
};

const createOrder = (orderObj, res, paymentMethod) => {
  OrderQue.findOneAndDelete({ userId: orderObj.id })
    .then((user) => {
      const newObj = {
        user: user.user,
        shippingAddress: user.shippingAddress,
        products: user.products,
        totalPrice: user.totalPrice,
        status: "completed",
        paymentMethod,
      };
      new Order(newObj)
        .save()
        .then(async () => {
          Booked.deleteMany({ user: user.user }).exec();
          OrderQue.deleteMany({ user: user.user }).exec();
        })
        .catch(() => {
          serverError(res);
        });
    })
    .catch(() => {
      serverError(res);
    });
};

const getOrders = (req, res) => {
  Order.find()
    .populate("user")
    .select("-password")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const getMyOrders = (req, res) => {
  const id = req.user._id;
  Order.find({ user: id })
    .populate("user")
    .select("-password")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const updateOrders = (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  Order.findOneAndUpdate({ _id: id }, { status: status }, { new: true })
    .populate("user")
    .select("-password")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const deleteOrder = (req, res) => {
  const id = req.params.id;
  Order.findOneAndDelete({ _id: id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  addOrder,
  getOrders,
  getMyOrders,
  updateOrders,
  createOrder,
  deleteOrder,
  orderInCase
};
