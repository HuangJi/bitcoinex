var http = require('http');
var https = require('https');
var request = require('request');
var rp = require('request-promise');

var COINBASE_SPOT_PRICE_API = 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
	COINBASE_EXCHANGE_PRICE_API = 'https://api.exchange.coinbase.com//products/BTC-USD/stats',
	BITSTAMP_EXCHANGE_PRICE_API = 'https://www.bitstamp.net/api/ticker/',
	BITFINEX_EXCHANGE_PRICE_API = 'https://api.bitfinex.com/v1/pubticker/BTCUSD',
	MAICOIN_USD_PRICE_API = 'https://api.maicoin.com/v1/prices/usd',
	OKCOIN_USD_PRICE_API = 'https://www.okcoin.com/api/ticker.do?ok=1',
	BITOEX_USD_PRICE_API = 'https://www.bitoex.com/api/v1/get_rate',
	DAILY_USD_PRICE_API = 'https://api.coinbase.com/v2/prices/historic?days=1',
	USD_EXCHANGE_RATES_API = 'https://api.coinbase.com/v2/exchange-rates?currency=USD';

var USDTWD, USDEUR, USDCNY;

function getAveragePrice(exchangeName, currency) {
	if (exchangeName === 'coinbase') {
		getCoinbaseUSDPrice();
	}
}

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

function getUSD() {
	return 123;
}


function getExchangeRates(currency, callback) {
	request(getOptions(url), function(error, response, body) {
		if( !error && response.statusCode === 200 ) {
            if (currency === 'USDTWD') {
				return callback(null, body)
			}
			else {
				return callback(null, 'fuck');
			}
        }
        else {
            //something went wrong, fail out
            return callback(error);
        }
	})
}

function getCoinbasePrice() {
	return rp(getOptions(COINBASE_PRICE_API))
		.then(function(body) {
			console.log(body);
			return body;
		})
		.catch(function(err) {
			console.log('error!');
			return err;
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
				// console.log(body);
				priceObject = {
					exchangeName: exchangeName,
					currency: currency,
					high: parseFloat(body.high),
					low: parseFloat(body.low)
				};
				// console.log(priceObject);
				request(getOptions(COINBASE_SPOT_PRICE_API), function(error, response, body) {
					priceObject.now = parseFloat(body.data.rates.USD);
					console.log(priceObject);
					callback(null, priceObject);
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
					now: parseFloat(body.last)
				};
				callback(null, priceObject);
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
					now: parseFloat(body.last_price)
				};
				callback(null, priceObject);
			}
		});
	}
	else {
		return 'shit';
	}
}

module.exports = {
    getCoinbasePrice: getCoinbasePrice,
    getAveragePrice: getAveragePrice,
    getExchangeRates: getExchangeRates,
    getPriceWith: getPriceWith,
    URL: 'abcdefg',
    getUSD: getUSD,
    USDTWD: USDTWD,
    USDEUR: USDEUR,
    USDCNY: USDCNY
}