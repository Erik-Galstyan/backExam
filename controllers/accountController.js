const fs = require("fs");
const path = require("path");

const pathToAccounts = path.join(__dirname, "../data/accounts.json");
const pathToCustomers = path.join(__dirname, "../data/customers.json");

class accountController {
  constructor() {
    this.accountGetById = (req, res) => {
      try {
        const accounts = JSON.parse(
          fs.readFileSync(pathToAccounts, "utf-8"),
          null,
          2
        );
        const { id: accountId } = req.params;
        const found = accounts.find((elm) => elm.id == accountId);

        if (found) {
          res.status(200).json(found);
        } else {
          res.status(404).send("Not Found");
        }
      } catch (error) {
        res.status(500).send("Internal Server error");
      }
    };

    this.accountPost = (req, res) => {
      try {
        const accounts = JSON.parse(
          fs.readFileSync(pathToAccounts, "utf-8"),
          null,
          2
        );
        const { accountNumber, balance, accountType, customerId } = req.body;

        if (!accountNumber || !balance || !accountType || !customerId) {
          res.status(400).send("Bad Request");
          return;
        }

        accounts.push({
          id: Date.now(),
          accountNumber,
          balance,
          accountType,
          customerId
        });

        fs.writeFileSync(pathToAccounts, JSON.stringify(accounts, null, 2));
        res.status(201).send("Created successfully");
      } catch (error) {
        res.status(500).send("Internal Server error");
      }
    };

    this.getAllAccounts = (req, res) => {
      try {
        const accounts = JSON.parse(
          fs.readFileSync(pathToAccounts, "utf-8"),
          null,
          2
        );
        res.status(200).json(accounts);
      } catch (error) {
        res.status(500).send("Internal Server error");
      }
    };

    this.updateAccount = (req, res) => {
      try {
        const accounts = JSON.parse(
          fs.readFileSync(pathToAccounts, "utf-8"),
          null,
          2
        );

        const { id: accountId } = req.params;
        const found = accounts.find((elm) => elm.id == accountId);
        const { accountNumber, balance, accountType } = req.body;

        if (!accountNumber && !balance && !accountType) {
          res.status(400).send("Bad Request");
          return;
        }

        if (found) {
          found.accountNumber = accountNumber;
          found.balance = balance;
          found.accountType = accountType;
          fs.writeFileSync(pathToAccounts, JSON.stringify(accounts, null, 2));
          res.status(200).send("Successfull");
        } else {
          res.status(404).send("Not Found");
        }
      } catch (error) {
        res.status(500).send("Internal Server error");
      }
    };
    this.deleteAccount = (req, res) => {
      try {
        const accounts = JSON.parse(
          fs.readFileSync(pathToAccounts, "utf-8"),
          null,
          2
        );
        const { id: accountId } = req.params;
        const indexOfFound = accounts.indexOf((elm) => elm.id == accountId);
        accounts.splice(indexOfFound, 1);
        fs.writeFileSync(pathToAccounts, JSON.stringify(accounts, null, 2));
        res.status(200).send("Successfull");


      } catch (error) {
        res.status(500).send("Internal Server error");
      }
    }
  }
}

module.exports = new accountController;
