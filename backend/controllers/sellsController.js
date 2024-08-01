const express = require("express");
const Sells = require("../models/sellsModel");

exports.saveReceiptData = async (req, res) => {
  console.log(req.body);

  try {
    const sell = new Sells(req.body);
    await sell.save();

    res.status(200).json(sell);
  } catch (error) {
    // Maneja cualquier error que ocurra
    res.status(500).json({ message: error.message });
  }
}
