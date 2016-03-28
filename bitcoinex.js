var http = require('http');
var https = require('https');
var request = require('request');
var rp = require('request-promise');

var COINBASE_SPOT_PRICE_API = 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
	COINBASE_EXCHANGE_PRICE_API = 'https://api.exchange.coinbase.com//products/BTC-USD/stats',
	BITSTAMP_EXCHANGE_PRICE_API = 'https://www.bitstamp.net/api/ticker/',
	BITFINEX_EXCHANGE_PRICE_API = 'https://api.bitfinex.com/v1/pubticker/BTCUSD',
	OKCOIN_EXCHANGE_PRICE_API = 'https://www.okcoin.com/api/v1/ticker.do?symbol=btc_usd',
	MAICOIN_USD_PRICE_API = 'https://api.maicoin.com/v1/prices/usd',
	OKCOIN_USD_PRICE_API = 'https://www.okcoin.com/api/ticker.do?ok=1',
	BITOEX_USD_PRICE_API = 'https://www.bitoex.com/api/v1/get_rate',
	DAILY_USD_PRICE_API = 'https://api.coinbase.com/v2/prices/historic?days=1',
	USD_EXCHANGE_RATES_API = 'https://api.coinbase.com/v2/exchange-rates?currency=USD';

function getOptions(url) {
	var options = {
	    uri:url,
	    headers: {
	        'User-Agent': 'request'
	    },
	    json:true // Automatically parses the JSON string in the response 
	};
	return options;
}

function getExchangeRates(callback) {
	request(getOptions(USD_EXCHANGE_RATES_API), function(error, response, body) {
		if (error) {
			console.error(error);
		}
		else {
			var ratesObject = {
				usdtwd: body.data.rates.TWD,
				usdeur: body.data.rates.EUR,
				usdcny: body.data.rates.CNY
			};
			callback(null, ratesObject);
		}
	});
}

function handleResult(err, result) {
	if (err) {
		console.error(err.stack || err.message);
		return;
	}
	return result;
}

function convertRate(priceObject, currency, callback) {
	getExchangeRates(function (err, ratesObject) {
		if (err) {
			console.error(err);
		}
		else {
			if (currency === 'usd') ;
			else if (currency === 'twd') {
				priceObject.high = priceObject.high * ratesObject.usdtwd;
				priceObject.low = priceObject.low * ratesObject.usdtwd;
				priceObject.last = priceObject.last * ratesObject.usdtwd;
			}
			else if (currency === 'eur') {
				priceObject.high = priceObject.high * ratesObject.usdeur;
				priceObject.low = priceObject.low * ratesObject.usdeur;
				priceObject.last = priceObject.last * ratesObject.usdeur;
			}
			else if (currency === 'cny') {
				priceObject.high = priceObject.high * ratesObject.usdcny;
				priceObject.low = priceObject.low * ratesObject.usdcny;
				priceObject.last = priceObject.last * ratesObject.usdcny;
			}
		}
		callback(null, priceObject);
	});
}

function getPriceWith(exchangeName, currency, callback) {
	if (exchangeName === 'coinbase') {
		request(getOptions(COINBASE_EXCHANGE_PRICE_API), function(error, response, body) {
			if (error) {
				console.error(error);
			}
			else {
				var priceObject = {};
				priceObject = {
					exchangeName: exchangeName,
					currency: currency,
					high: parseFloat(body.high),
					low: parseFloat(body.low)
				};
				request(getOptions(COINBASE_SPOT_PRICE_API), function(error, response, body) {
					priceObject.last = parseFloat(body.data.rates.USD);
					convertRate(priceObject, currency, function(err, convertedObject) {
						callback(null, convertedObject);
					});
				});
			}
		});
	}
	else if (exchangeName === 'bitstamp') {
		request(getOptions(BITSTAMP_EXCHANGE_PRICE_API), function(error, response, body) {
			if (error) {
				console.error(error);
				// callback(error, priceObject);
			}
			else {
				var priceObject = {
					exchangeName: exchangeName,
					currency: currency,
					high: parseFloat(body.high),
					low: parseFloat(body.low),
					last: parseFloat(body.last)
				};
				convertRate(priceObject, currency, function(err, convertedObject) {
					callback(null, convertedObject);
				});
				// callback(null, priceObject);
			}
		});
	}
	else if (exchangeName === 'bitfinex') {
		request(getOptions(BITFINEX_EXCHANGE_PRICE_API), function(error, response, body) {
			if (error) {
				console.error(error);
				// callback(error, priceObject);
			}
			else {
				var priceObject = {
					exchangeName: exchangeName,
					currency: currency,
					high: parseFloat(body.high),
					low: parseFloat(body.low),
					last: parseFloat(body.last_price)
				};
				convertRate(priceObject, currency, function(err, convertedObject) {
					callback(null, convertedObject);
				});
				// callback(null, priceObject);
			}
		});
	}
	else if (exchangeName === 'okcoin') {
		request(getOptions(OKCOIN_EXCHANGE_PRICE_API), function(error, response, body) {
			if (error) {
				console.error(error);
			}
			else {
				var priceObject = {
					exchangeName: exchangeName,
					currency: currency,
					high: parseFloat(body.ticker.high),
					low: parseFloat(body.ticker.low),
					last: parseFloat(body.ticker.last)
				};
				convertRate(priceObject, currency, function(err, convertedObject) {
					callback(null, convertedObject);
				});
				// callback(null, priceObject);
			}
		});
	}
	else {
		return 'shit';
	}
}

module.exports = {
    getPriceWith: getPriceWith,
    getExchangeRates: getExchangeRates,
    handleResult: handleResult
}