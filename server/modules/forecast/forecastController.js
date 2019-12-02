const httpStatus = require('http-status');
const otherHelper = require('../../helper/otherHelper');
const thirdPartyHelper = require('../../helper/apicall.helper');
const forecastController = {};

forecastController.GetForecast = async (req, res, next) => {
  try {
    const reqUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Kathmandu&APPID=5353be1f128b7deff21c6df5b7004738&cnt=40';
    const forecastData = await thirdPartyHelper.requestThirdPartyApi(req, reqUrl, null, next, 'GET');
    return otherHelper.sendResponse(res, httpStatus.OK, true, forecastData, null, 'Forecast data get success!!', null);
  } catch (err) {
    next(err);
  }
};

module.exports = forecastController;
