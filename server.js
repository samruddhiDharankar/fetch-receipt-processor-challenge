const express = require("express");
const app = express();
const port = 3000;

const v1Routes = require("./v1/routes");

// Middleware to parse JSON
app.use(express.json());

// api route
app.use("/api/v1", v1Routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
