const experss = require("express");
const path = require("path");

const pathToAccountsController = path.join(
  __dirname,
  "../controllers/accountController.js"
);

const { accountGetById, accountPost, getAllAccounts, updateAccount, deleteAccount } = require(pathToAccountsController);

const router = experss.Router();

router.delete("/:id", (req, res) => deleteAccount(req, res));
router.get("/:id", (req, res) => accountGetById(req, res));
router.put("/:id", (req, res) => updateAccount(req, res));
router.get("/", (req, res) => getAllAccounts(req, res));
router.post("/", (req, res) => accountPost(req, res));

module.exports = router;
