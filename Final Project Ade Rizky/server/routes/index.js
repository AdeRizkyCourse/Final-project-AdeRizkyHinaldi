const router = require("express").Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
});

const invoiceRoutes = require("./invoice");
const clientRoutes = require("./client");
const userRoutes = require("./user");
const dashboardRoutes = require("./dashboard");


router.use("/invoices", invoiceRoutes);
router.use("/clients", clientRoutes);
router.use("/users", userRoutes);
router.use("/dashboards", dashboardRoutes);

module.exports = router;