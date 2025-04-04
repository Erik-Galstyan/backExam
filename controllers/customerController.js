const fs = require("fs");
const path = require("path");

const pathToAccounts = path.join(__dirname, "../data/accounts.json");
const pathToTransactions = path.join(__dirname, "../data/transactions.json");

class customerController {
  constructor() {
    this.GetCustomerTransactions = (req, res) => {
      try {

        const transactions = JSON.parse(
          fs.readFileSync(pathToTransactions, "utf-8"),
          null,
          2
        );

        const accounts = JSON.parse(
          fs.readFileSync(pathToAccounts, "utf-8"),
          null,
          2
        );

        const { id: accountId } = req.params;
        const found = accounts.find((elm) => elm.id == accountId);

        if (found) {
          const foundingTransactions = transactions.filter(
            (elm) => elm.accountId == accountId
          );
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
