require("dotenv").config();
const app = require("./src/app");
const connetDB = require("./src/db/db");

connetDB();

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
