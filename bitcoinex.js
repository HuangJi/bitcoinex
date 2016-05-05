var http = require('http');
var https = require('https');
var request = require('request');
var rp = require('request-promise');

function Bitcoinex() {
    this.uris = {
        COINBASE_SPOT_PRICE_API : 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
        COINBASE_EXCHANGE_PRICE_API : 'https://api.exchange.coinbase.com//products/BTC-USD/stats',
        BITSTAMP_EXCHANGE_PRICE_API : 'https://www.bitstamp.net/api/ticker/',
        BITFINEX_EXCHANGE_PRICE_API : 'https://api.bitfinex.com/v1/pubticker/BTCUSD',
        OKCOIN_EXCHANGE_PRICE_API : 'https://www.okcoin.com/api/v1/ticker.do?symbol=btc_usd',
        ITBIT_EXCHANGE_PRICE_API : 'https://api.itbit.com/v1/markets/XBTUSD/ticker',
        MAICOIN_USD_PRICE_API : 'https://api.maicoin.com/v1/prices/usd',
        MAICOIN_TWD_PRICE_API : 'https://api.maicoin.com/v1/prices/twd',
        OKCOIN_USD_PRICE_API : 'https://www.okcoin.com/api/ticker.do?ok=1',
        ITBIT_EXCHANGE_PRICE_API : 'https://api.itbit.com/v1/markets/XBTUSD/ticker',
        BITOEX_USD_PRICE_API : 'https://www.bitoex.com/api/v1/get_rate',
        BITOEX_TWD_PRICE_API : 'https://www.bitoex.com/api/v1/get_rate',
        DAILY_USD_PRICE_API : 'https://api.coinbase.com/v2/prices/historic?days=1',
        USD_EXCHANGE_RATES_API : 'https://api.coinbase.com/v2/exchange-rates?currency=USD'
    };
    this.ratesObject = null;
}

Bitcoinex.prototype.getExchangeRates = function(callback) {
    request(this.getOptions(this.uris.USD_EXCHANGE_RATES_API), function(error, response, body) {
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

Bitcoinex.prototype.getBrokerPriceWith = function(exchangeName, currency, callback) {
    var self = this;
    if (exchangeName === 'maicoin' && currency === 'twd') {
        request(this.getOptions(this.uris.MAICOIN_TWD_PRICE_API), function(error, response, body) {
            if (error) {
                console.error(error);
                callback(error, null);
            }
            else {
                callback(null, body);
            }
        });
    }
    else if (exchangeName === 'bitoex' && currency === 'twd') {
        request(this.getOptions(this.uris.BITOEX_TWD_PRICE_API), function(error, response, body) {
            if (error) {
                console.error(error);
                callback(error, null);
            }
            else {
                callback(null, body);
            }
        });
    }
}

Bitcoinex.prototype.getPriceWith = function(exchangeName, currency, callback) {
    var self = this;
    if (exchangeName === 'coinbase') {
        request(this.getOptions(this.uris.COINBASE_EXCHANGE_PRICE_API), function(error, response, body) {
            if (error) {
                console.error(error);
                callback(error, null);
            }
            else {
                var priceObject = self.getPriceObject(exchangeName, currency, body.high, body.low, null);
                request(self.getOptions(self.uris.COINBASE_SPOT_PRICE_API), function(error, response, body) {
                    priceObject.last = parseFloat(body.data.rates.USD);
                    self.convertRate(priceObject, currency, function(err, convertedObject) {
                        callback(null, convertedObject);
                    });
                });
            }
        });
    }
    else if (exchangeName === 'bitstamp') {
        request(this.getOptions(this.uris.BITSTAMP_EXCHANGE_PRICE_API), function(error, response, body) {
            if (error) {
                console.error(error);
                callback(error, null);
            }
            else {
                var priceObject = self.getPriceObject(exchangeName, currency, body.high, body.low, body.last);
                self.convertRate(priceObject, currency, function(err, convertedObject) {
                    callback(null, convertedObject);
                });
            }
        });
    }
    else if (exchangeName === 'bitfinex') {
        request(this.getOptions(this.uris.BITFINEX_EXCHANGE_PRICE_API), function(error, response, body) {
            if (error) {
                console.error(error);
                callback(error, null);
            }
            else {
                var priceObject = self.getPriceObject(exchangeName, currency, body.high, body.low, body.last_price);
                self.convertRate(priceObject, currency, function(err, convertedObject) {
                    callback(null, convertedObject);
                });
            }
        });
    }
    else if (exchangeName === 'okcoin') {
        request(this.getOptions(this.uris.OKCOIN_EXCHANGE_PRICE_API), function(error, response, body) {
            if (error) {
                console.error(error);
                callback(error, null);
            }
            else {
                var priceObject = self.getPriceObject(exchangeName, currency, body.ticker.high, body.ticker.low, body.ticker.last);
                self.convertRate(priceObject, currency, function(err, convertedObject) {
                    callback(null, convertedObject);
                });
            }
        });
    }
    else if (exchangeName === 'itbit') {
        request(this.getOptions(this.uris.ITBIT_EXCHANGE_PRICE_API), function(error, response, body) {
            if (error) {
                console.error(error);
                callback(error, null);
            }
            else {
                var priceObject = self.getPriceObject(exchangeName, currency, body.highToday, body.lowToday, body.lastPrice);
                self.convertRate(priceObject, currency, function(err, convertedObject) {
                    callback(null, convertedObject);
                });
            }
        });
    }
    else {
        return 'shit';
    }
}


Bitcoinex.prototype.getOptions = function(url) {
    var options = {
        uri:url,
        headers: {
            'User-Agent': 'request'
        },
        json:true // Automatically parses the JSON string in the response 
    };
    return options;
}

Bitcoinex.prototype.getPriceObject = function(exchangeName, currency, high, low, last) {
    var priceObject = {
        exchangeName: exchangeName,
        currency: currency,
        high: parseFloat(high),
        low: parseFloat(low),
        last: parseFloat(last)
    };
    return priceObject;
}

Bitcoinex.prototype.convertRate = function (priceObject, currency, callback) {
    this.getExchangeRates(function (err, ratesObject) {
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

module.exports = new Bitcoinex();