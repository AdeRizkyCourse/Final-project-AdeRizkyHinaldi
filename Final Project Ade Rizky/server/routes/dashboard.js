const router = require("express").Router();
const DashboardController = require("../controllers/DashboardController");


router.get('/', DashboardController.getPage);

module.exports = router;