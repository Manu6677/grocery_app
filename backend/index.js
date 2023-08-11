require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Stripe = require("stripe");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// mongo connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("database Connected");
}

// User schema
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  confirmPassword: { type: String },
  image: { type: String },
});

// const userCred = mongoose.model("userCred", userSchema);
const userCredentials = mongoose.model("userCredentials", userSchema);

// api connection
app.get("/", (req, res) => {
  res.send("Server is Running");
});

// api signup
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, image } = req.body;
  try {
    // console.log(req.body);
    // const usermail = req.body.email;
    const exists = await userCredentials.findOne({ usermail: req.body.email });
    if (exists) {
      res.status.json({ message: "Email already in use", alert: false });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const data = await userCredentials.create({
        firstName,
        lastName,
        email,
        password: hash,
        image,
      });
      res.status(200).json({ data, alert: true });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// api login
app.post("/login", async (req, res) => {
  try {
    // console.log(req.body);

    const existemail = await userCredentials.findOne({ email: req.body.email });
    // console.log(existemail, "userEmail");
    // console.log(existemail.password, "password");

    const match = await bcrypt.compare(req.body.password, existemail.password);

    // if (match) { console.log("match true"); }

    if (!match) {
      res.status(200).json({ message: "Not correct password" });
    }
    if (existemail && match) {
      res.status(200).json({ existemail, alert: true });
    }
  } catch (err) {
    res.status(404).json({ alert: false });
  }
});

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-Product Schema and its apis -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productDetails = mongoose.model("productDetails", productSchema);

// productDetails api's post new product
app.post("/newproduct", async (req, res) => {
  try {
    const data = await productDetails.create(req.body);
    res.status(200).json({ data, alert: true });
  } catch (err) {
    res.status(200).json({ message: "Not valid" });
  }
});

// productDetails api's get all products

app.get("/products", async (req, res) => {
  const allProduct = await productDetails.find();
  res.send(allProduct);
});

// Payment gateway

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post("/checkout-payment", async (req, res) => {
  // console.log(req.body);
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1NdGC9SEhjupLeBLgERrPgHk" }],

      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "USD",
            product_data: {
              name: item.name,
              // image: [item.image],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };
    // const session = await stripe.checkout.sessions.create(params);
    // console.log("session", session);
    // res.status(200).json("session id", session.id);

    const session = await stripe.checkout.sessions.create(params);
    // console.log(session);
    res.status(200).json(session.id);
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

app.listen(PORT, () => {
  console.log("Server is Running at PORT " + PORT);
});
