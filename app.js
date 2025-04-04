const fs = require("fs");
const path = require("path");
const experss = require("express");
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
const customerRoutes = require("./routes/customerRoutes.js");
const transactionRoutes = require("./routes/transactionRoutes.js");
app.use(experss.json());

app.use("/accounts", accountRoutes);
app.use("/customers", customerRoutes);
app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})