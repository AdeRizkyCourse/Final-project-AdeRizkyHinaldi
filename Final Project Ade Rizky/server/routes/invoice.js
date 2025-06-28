const router = require("express").Router();
const InvoiceController = require("../controllers/InvoiceController");


router.get('/', InvoiceController.getPage);
router.post("/create", InvoiceController.create);
router.get("/detail/:id", InvoiceController.details);
router.delete("/delete/:id", InvoiceController.delete);
router.put("/update/:id", InvoiceController.update);
router.get("/show/:id", InvoiceController.show);

module.exports = router;