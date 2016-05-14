var bitcoinex = require('./bitcoinex');

bitcoinex.getBrokerPriceWith('maicoin', 'twd', function(err, result) {
	console.log(result);
});

bitcoinex.getBrokerPriceWith('bitoex', 'twd', function(err, result) {
	console.log(result);
});

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


