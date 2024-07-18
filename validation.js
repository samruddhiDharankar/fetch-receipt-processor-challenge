// Function to check if the data is not null and is of type string
function validateData(data) {
  if (!data || typeof data !== "string") {
    return false;
  }
  return true;
}

// Function to validate the short description
function validateShortDescription(shortDescription) {
  const regexShortDescription = /^[\w\s\-]+$/; // Allows alphanumeric characters, whitespace, and hyphens
  if (
    !validateData(shortDescription) ||
    !regexShortDescription.test(shortDescription)
  ) {
    return false;
  }
  return true;
}

// Function to validate the price
function validatePrice(price) {
  const regexPrice = /^\d+\.\d{2}$/; // Ensures the price format is like 12.34
  if (!validateData(price) || !regexPrice.test(price)) {
    return false;
  }
  return true;
}

// Function to validate the retailer name
function validateRetailer(retailer) {
  const regexRetailer = /^[a-zA-Z0-9&\s]+$/; // Allows alphanumeric characters, ampersand, and whitespace
  if (!validateData(retailer) || !regexRetailer.test(retailer)) {
    return false;
  }
  return true;
}

// Function to validate the purchase date
function validatePurchaseDate(purchaseDate) {
  const regexDate = /^\d{4}-\d{2}-\d{2}$/; // Ensures the date format is YYYY-MM-DD
  if (!validateData(purchaseDate) || !regexDate.test(purchaseDate)) {
    return false;
  }
  return true;
}

// Function to validate the purchase time
function validatePurchaseTime(purchaseTime) {
  const regexTime = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // Ensures the time format is HH:MM in 24-hour format
  if (!validateData(purchaseTime) || !regexTime.test(purchaseTime)) {
    return false;
  }
  return true;
}

// Function to validate the items array
function validateItems(items) {
  // Check if items is an array and has at least one element
  if (!Array.isArray(items) || items.length < 1) {
    return false;
  }
  // Validate each item in the array
  return items.every(
    (item) =>
      validateShortDescription(item.shortDescription) &&
      validatePrice(item.price)
  );
}

// Function to validate the total price
function validateTotal(total) {
  const regexTotal = /^\d+\.\d{2}$/; // Ensures the total format is like 12.34
  if (!validateData(total) || !regexTotal.test(total)) {
    return false;
  }
  return true;
}

// Exporting the validation functions to be used in other modules
module.exports = {
  validateRetailer,
  validatePurchaseDate,
  validatePurchaseTime,
  validateItems,
  validateTotal,
};
