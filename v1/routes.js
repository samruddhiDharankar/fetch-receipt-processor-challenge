const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid"); // Importing uuid for generating unique IDs
const {
  validateRetailer,
  validatePurchaseDate,
  validatePurchaseTime,
  validateItems,
  validateTotal,
} = require("../validation");

const { calculatePoints } = require("./model");
let receipts = []; // In-memory array to store receipts

// Get all receipts
router.get("/receipts/process", (req, res) => {
  res.json(receipts);
});

// Get points awarded for a specific receipt by ID
router.get("/receipts/:id/points", (req, res) => {
  const receipt = receipts.find((r) => r.id === req.params.id); // Find the receipt by ID
  console.log(receipt);
  if (!receipt) return res.status(404).send("No receipt found for that id");
  const points = calculatePoints(receipt); // Calculate points for the found receipt
  res.json({ points: points });
});

// Submit a receipt for processing
router.post("/receipts/process", (req, res) => {
  const { retailer, purchaseDate, purchaseTime, items, total } = req.body;

  // Check if any required fields are missing
  if (!retailer || !purchaseDate || !purchaseTime || !items || !total) {
    return res
      .status(400)
      .json({ error: "One or more required fields are missing" });
  }

  // Validate the retailer field
  if (!validateRetailer(retailer)) {
    return res.status(400).json({ error: "Invalid retailer value" });
  }

  // Validate the purchase date
  if (!validatePurchaseDate(purchaseDate)) {
    return res.status(400).json({ error: "Invalid purchaseDate value" });
  }

  // Validate the purchase time
  if (!validatePurchaseTime(purchaseTime)) {
    return res.status(400).json({ error: "Invalid purchaseTime value" });
  }

  // Validate the items array
  if (!validateItems(items)) {
    return res.status(400).json({ error: "Invalid items value" });
  }

  // Validate the total amount
  if (!validateTotal(total)) {
    return res.status(400).json({ error: "Invalid total value" });
  }

  // Create a new receipt object
  const newReceipt = {
    id: uuidv4(), // Generate a unique ID for the receipt
    retailer,
    purchaseDate,
    purchaseTime,
    items,
    total,
  };

  receipts.push(newReceipt); // Add the new receipt to the array

  res.status(201).json({ id: newReceipt.id }); // Return the ID of the new receipt
});

module.exports = router;
