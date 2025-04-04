const fs = require("fs");
const path = require("path");

const pathToAccounts = path.join(__dirname, "../data/accounts.json");
const pathToTransactions = path.join(__dirname, "../data/transactions.json");

class transactionController {
  constructor() {
    this.postTransaction = (req, res) => {
      
      try {
        const transactions = JSON.parse(
          fs.readFileSync(pathToTransactions, "utf-8"),
          null,
          2
        );
        const acounts = JSON.parse(
          fs.readFileSync(pathToAccounts, "utf-8"),
          null,
          2
        );
        
        const { from, to, amount } = req.body;
        
        const accountFrom = acounts.find((elm) => elm.id == from);
        const accountTo = acounts.find((elm) => elm.id == to);
        
        accountFrom.balance -= amount;
        accountTo.balance += amount; 

        fs.writeFileSync(pathToAccounts, JSON.stringify(acounts, null, 2));

        transactions.push({
          id: Date.now(),
          accountId: from,
          amount,
          transactionType: "deposit",
          date: new Date().toISOString()
        });

        fs.writeFileSync(pathToTransactions, JSON.stringify(transactions, null, 2));
        res.status(200).send("Successfull");

      } catch (error) {
        res.status(500).send("Internal Server error");
      }
    };
  }
}

module.exports = new transactionController;
