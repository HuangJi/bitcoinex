var bitcoinex = require('./bitcoinex');

bitcoinex.getPriceWith('okcoin', 'twd', function(err, result) {
	if (err) {
		console.error(err);
	}
	else {
		console.log(result.last);
		console.log(result);
	}
});

bitcoinex.getPriceWith('bitfinex', 'eur', function(err, result) {
	if (err) {
		console.error(err);
	}
	else {
		console.log(result);
	}
});


