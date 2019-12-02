const express = require('express');
const router = express.Router();

// All route of forecast
const forecastRoutes = require('./api/forecast');
router.use('/forecast', forecastRoutes);
module.exports = router;
