const experss = require("express");
const path = require("path");

const pathToTransactionsController = path.join(
  __dirname,
  "../controllers/transactionController.js"
);

const { postTransaction } = require(pathToTransactionsController);

const router = experss.Router();

router.post("/:id/transactions", (req, res) => postTransaction(req, res));

module.exports = router;
