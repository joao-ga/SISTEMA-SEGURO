const router = require("express").Router();
const clientController = require('../controller/clientController');

router
    .route("/clients")
    .post((req, res) => clientController.create(req, res));
router
    .route("/clients")
    .get((req, res) => clientController.getAll(req, res));
router
    .route("/clients/inurance/:plate")
    .get((req, res) => clientController.get(req, res));
router
    .route("/clients/:name")
    .delete((req, res) => clientController.delete(req, res));
router
    .route("/clients/:name")
    .put((req, res) => clientController.update(req, res));
router
    .route("/validity/:id")
    .get((req, res) => clientController.getNextMonth(req, res));
module.exports = router;