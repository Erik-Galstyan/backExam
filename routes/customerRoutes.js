const experss = require("express");
const path = require("path");

const pathToCustomersController = path.join(
  __dirname,
  "../controllers/customerController.js"
);

const { GetCustomerTransactions } = require(pathToCustomersController);

const router = experss.Router();

router.get("/:id/transactions", (req, res) =>
  GetCustomerTransactions(req, res)
);

module.exports = router;
