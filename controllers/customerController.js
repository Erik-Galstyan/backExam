const fs = require("fs");
const path = require("path");

const pathToCustomers = path.join(__dirname, "../data/customers.json");
const pathToTransactions = path.join(__dirname, "../data/transactions.json");

class customerController {
  constructor() {
    this.GetCustomerTransactions = (req, res) => {
      try {
        const customers = JSON.parse(
          fs.readFileSync(pathToCustomers, "utf-8"),
          null,
          2
        );

        const transactions = JSON.parse(
          fs.readFileSync(pathToTransactions, "utf-8"),
          null,
          2
        );

        const { id: customerId } = req.params;        
        const found = customers.find((elm) => elm.id == customerId);
        
        if (found) {
          const foundingTransactions = transactions.filter(elm => elm.accountId == customerId);
          res.status(200).json(foundingTransactions);
        } else {
          res.status(400).send("not found");
        }
      } catch (error) {
        res.status(500).send("server error");
      }
    };
  }
}

module.exports = new customerController();
