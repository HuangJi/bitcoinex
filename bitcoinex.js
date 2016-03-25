var http = require('http');
var https = require('https');
var request = require('request');

exports.getCoinbaseUSDPrice = function () {
	request('https://api.coinbase.com/v2/prices/spot', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var body = JSON.parse(body);
	    console.log(body.data.amount)
	  }
	});
};