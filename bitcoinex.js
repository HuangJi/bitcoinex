var http = require('http');
var https = require('https');
var request = require('request');
var rp = require('request-promise');

var COINBASE_USD_PRICE_API = 'https://api.coinbase.com/v2/prices/spot',
	BITSTAMP_USD_PRICE_API = 'https://www.bitstamp.net/api/ticker/',
	MAICOIN_USD_PRICE_API = 'https://api.maicoin.com/v1/prices/usd',
	OKCOIN_USD_PRICE_API = 'https://www.okcoin.com/api/ticker.do?ok=1',
	BITFINEX_USD_PRICE_API = 'https://api.bitfinex.com/v1/pubticker/BTCUSD',
	BITOEX_USD_PRICE_API = 'https://www.bitoex.com/api/v1/get_rate',
	DAILY_USD_PRICE_API = 'https://api.coinbase.com/v2/prices/historic?days=1';


module.exports = {
    getCoinbaseUSDPrice: getCoinbaseUSDPrice,
    getAveragePrice: getAveragePrice,
    getBitstampUSDPrice: getBitstampUSDPrice,
    getUSD: getUSD,
    URL: 'abcdefg'
}

function getAveragePrice(exchangeName, currency) {
	if (exchangeName === 'coinbase') {
		getCoinbaseUSDPrice();
	}
}

function getUSD() {
	return 123;
}

function getCoinbaseUSDPrice() {
	var options = {
	    uri:COINBASE_USD_PRICE_API,
	    headers: {
	        'User-Agent': 'Request-Promise'
	    },
	    json:true // Automatically parses the JSON string in the response 
	};
	return rp(options)
		.then(function(body) {
			console.log(body);
			return body;
		})
		.catch(function(err) {
			console.log('error!');
			return err;
		});
}

function getBitstampUSDPrice() {
	var options = {
	    uri:BITSTAMP_USD_PRICE_API,
	    headers: {
	        'User-Agent': 'Request-Promise'
	    },
	    json:true // Automatically parses the JSON string in the response 
	};
	return rp(options)
		.then(function(body) {
			console.log(body);
			return body;
		})
		.catch(function(err) {
			console.log('error!');
			return err;
		});
}