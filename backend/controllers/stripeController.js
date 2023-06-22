const { createOrder } = require("./orderController");

const serverError = require("../utils/serverError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.WEBHOOK_SECRET;

const webHook = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      await stripe.customers
        .retrieve(event.data.object.customer)
        .then((userRes) => {
          const newObj = {
            cash: "Stripe",
            tranId: event.data.object.payment_intent,
          };
          createOrder(userRes, response, newObj);
        })
        .catch(() => {
          serverError(response);
        });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
};

module.exports = {
  webHook,
};
