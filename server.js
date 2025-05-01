require("dotenv").config();
const { PORT } = require("./config/constants");

// Require the necessary modules
const app = require("express")();
const server = require("./config/server")(app);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
