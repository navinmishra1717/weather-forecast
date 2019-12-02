(thirdPartyApiRequesterHelper => {
  'use strict';

  const request = require('request-promise');

  thirdPartyApiRequesterHelper.requestThirdPartyApi = async (req, request_url, headers, next, request_method) => {
    try {
      const options = headers
        ? {
            method: request_method && request_method === 'POST' ? 'POST' : 'GET',
            uri: request_url,
            json: true, // Automatically stringifies the body to JSON
            headers: headers,
          }
        : {
            method: request_method && request_method === 'POST' ? 'POST' : 'GET',
            uri: request_url,
            json: true, // Automatically stringifies the body to JSON
          };
      const response = await request(options);
      return response;
    } catch (err) {
      return next(err);
    }
  };
})(module.exports);
