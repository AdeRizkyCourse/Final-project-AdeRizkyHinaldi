const router = require("express").Router();
const UserController = require("../controllers/UserController");


router.get('/', UserController.getPage);
router.post("/create", UserController.create);
router.get("/detail/:id", UserController.details);
router.delete("/delete/:id", UserController.delete);
router.put("/update/:id", UserController.update);


module.exports = router;