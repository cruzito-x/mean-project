const mongoose = require("mongoose");

const sellsSchema = new mongoose.Schema({
  transaction_id: String,
  amount: Number,
  date: String,
  payment_status: String,
  paid_by: String,
  email: String,
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
      discount: Number
    },
    {
      name: String,
      quantity: Number,
      price: Number,
      discount: Number
    }
  ],
  client_details: {
    client: String,
    phone: String,
    address: String,
    reference_point: String,
    shipping_cost: String,
    additional_comments: String
  }
});

const Sells = mongoose.model("Sells", sellsSchema);

module.exports = Sells;