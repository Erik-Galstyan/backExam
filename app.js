const experss = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const pathToCustomers = path.join(__dirname, "./data/customers.json"); 
const app = experss();


function createCustomers() {
  fs.writeFileSync(pathToCustomers, JSON.stringify([
    {
      "id": "C001",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890"
    },
    {
      "id": "C002",
      "name": "Alice Doe",
      "email": "Alice@example.com",
      "phone": "456-476-7890"
    },
    {
      "id": "C003",
      "name": "Mark Doe",
      "email": "Mark@example.com",
      "phone": "999-456-7890"
    },
    {
      "id": "C004",
      "name": "Maxs Doe",
      "email": "Max@example.com",
      "phone": "888-456-7890"
    }
  ], null, 2));
  
}

createCustomers();

const accountRoutes = require("./routes/accountRoutes.js");
const transactionRoutes = require("./routes/transactionRoutes.js");
const customerRoutes = require("./routes/customerRoutes.js");
app.use(experss.json());

app.use("/accounts", accountRoutes);
app.use("/customers", customerRoutes);
app.use("/transactions", customerRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})