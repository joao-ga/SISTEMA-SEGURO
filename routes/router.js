const router = require("express").Router()

//insurance router
const insuranceRouter = require("./insurance");
router.use("/", insuranceRouter);


//client router
const clientRouter = require("./client")
router.use("/", clientRouter)

module.exports = router;