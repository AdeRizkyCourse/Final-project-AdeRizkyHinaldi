const router = require("express").Router();
const ClientController = require("../controllers/ClientController");


router.get('/', ClientController.getPage);
router.post("/create", ClientController.create);
router.get("/detail/:id", ClientController.details);
router.delete("/delete/:id", ClientController.delete);
router.put("/update/:id", ClientController.update);


module.exports = router;