# Bitcoinex

Expect to support exchanges real time price as below in 0.2.x:

- Coinbase
- Bitstamp
- Bitfinex
- Maicoin
- Bitoex
- OKCoin

## Usage

```
var bitcoinex = require('bitcoinex');

bitcoinex.getAveragePrice('coinbase', 'usd'); // {exchangeName, currency}
// it will return {currency:'usd', price: 412.42}

```

### coming soon...