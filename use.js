var bitcoinex = require('./bitcoinex');

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
}