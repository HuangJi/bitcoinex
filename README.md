# Bitcoinex [![Build Status](https://travis-ci.org/HuangJi/bitcoinex.svg?branch=master)](https://travis-ci.org/HuangJi/bitcoinex)

An easy API library let developers get exchanges real time bitcoin price.

Now only supporting Coinbase, Bitstamp, Bitfinex real time prices.

I Expected to support exchanges real time price as below in 0.2.x:

- Coinbase
- Bitstamp
- Bitfinex
- Maicoin
- Bitoex
- OKCoin

And another market information in 0.3.x, welcome to open issues.

## Usage

### Install

```
npm install bitcoinex
```
### Example
```js
var bitcoinex = require('bitcoinex');

// (exchaneName, currency, callback)
// exchangeName now only support 'coinbase', 'bitstamp', 'bitfinex'
// currency now only support 'usd'

bitcoinex.getPriceWith('bitstamp', 'usd', function(err, priceObject) {
	if (err) {
		console.error(err);
	}
	else {
		console.log(priceObject.now);
	}
	/* priceObject
	{ exchangeName: 'bitstamp',
      currency: 'usd',
      high: 427.99,
      low: 415.82,
      now: 423 }
    */
});
```

### v0.2.x is coming soon...