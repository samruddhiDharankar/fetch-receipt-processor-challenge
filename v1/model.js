// Function to calculate points based on receipt details
function calculatePoints(receipt) {
  let points = 0;

  // Add points based on the number of alphanumeric characters in the retailer name
  points += checkAlphanumeric(receipt.retailer);
  console.log("points checkAlphanumeric ", points);

  // Add points if the total is a round dollar amount
  if (checkDollarAmount(receipt.total)) {
    points += 50;
  }
  console.log("points checkDollarAmount ", points);

  // Add points if the total is a multiple of 0.25
  if (checkTotalMultiple(receipt.total)) {
    points += 25;
  }
  console.log("points checkTotalMultiple ", points);

  // Add points based on the number of items (5 points for every 2 items)
  points += 5 * parseInt(receipt.items.length / 2);
  console.log("points 5 points for every 2 items ", points);
  // Add points based on the trimmed length of item descriptions
  points += TrimLength(receipt.items);
  console.log("points trimmed ", points);
  // Add points if the purchase date is an odd day
  if (checkOddDay(receipt.purchaseDate)) {
    points += 6;
  }
  console.log("points odd ", points);
  // Add points if the purchase time is between 02:00 and 04:00
  if (checkPurchaseTime(receipt.purchaseTime)) {
    points += 10;
  }
  console.log("points time ", points);

  return points;
}

// Function to count the number of alphanumeric characters in a string
function checkAlphanumeric(name) {
  const alphaChars = name.match(/[a-zA-Z0-9]/g);
  if (!alphaChars) {
    return 0;
  }
  return alphaChars.length;
}

// Function to check if the total is a round dollar amount (no cents)
function checkDollarAmount(total) {
  const totalFloat = parseFloat(total);
  return Number.isInteger(totalFloat);
}

// Function to check if the total is a multiple of 0.25
function checkTotalMultiple(total) {
  return total % 0.25 === 0;
}

// Function to add points based on the trimmed length of item descriptions
function TrimLength(items) {
  let points = 0;
  items.forEach((item) => {
    if (item.shortDescription.trim().length % 3 === 0) {
      points += Math.ceil(item.price * 0.2);
    }
  });

  return points;
}

// Function to check if the purchase date is an odd day
function checkOddDay(date) {
  const dateArray = date.split("-");
  if (dateArray[2] % 2 === 1) {
    return true;
  }
  return false;
}

// Function to check if the purchase time is between 02:00 and 04:00
function checkPurchaseTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const timeInMinutes = hours * 60 + minutes;
  const startTimeInMinutes = 14 * 60; // 2:00 PM
  const endTimeInMinutes = 16 * 60; // 4:00 PM
  return (
    timeInMinutes >= startTimeInMinutes && timeInMinutes < endTimeInMinutes
  );
}

// Export the calculatePoints function to be used in other modules
module.exports = {
  calculatePoints,
};
