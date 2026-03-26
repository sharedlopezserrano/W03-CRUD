const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocs));

module.exports = router;