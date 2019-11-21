const express = require("express");
const router = express.Router();
const OrdersController = require("../controllers/OrdersController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/newOrder", OrdersController.newOrder);

module.exports = router;
//t