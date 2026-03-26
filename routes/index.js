const router = require("express").Router();
const homeController = require("../controllers/home");

router.get("/", homeController.games);


router.use("/games", require("./games"));
router.use("/movies", require("./movies"));



module.exports = router;