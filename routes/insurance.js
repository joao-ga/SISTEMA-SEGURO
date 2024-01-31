const router = require("express").Router();
const insuranceController = require("../controller/insuranceController");

router
    .route("/insurance")
    .post((req, res) => insuranceController.create(req, res));
router
    .route("/insurance")
    .get((req, res) => insuranceController.getAll(req, res));
router
    .route("/insurance/:id")
    .get((req, res) => insuranceController.get(req, res));
router
    .route("/insurance/:id")
    .delete((req, res) => insuranceController.delete(req, res));
router
    .route("/insurance/:id")
    .put((req, res) => insuranceController.update(req, res));

module.exports = router;