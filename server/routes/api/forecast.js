const express = require('express');
const router = express.Router();

const forecastModule = require('../../modules/forecast/forecastController');

router.get('/', forecastModule.GetForecast);
module.exports = router;
