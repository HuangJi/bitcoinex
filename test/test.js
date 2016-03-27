var bitcoinex = require('../bitcoinex');
var expect = require('chai').expect;
var rp = require('request-promise');
var request = require('request');


describe('less than 64 bytes', function() {
  it('should be successful', function() {
    expect('avc').to.equal('avc');
  });
});

describe('Coinbase API', function() {
  it('should be right amount', function() {
    expect(bitcoinex.getUSD()).to.equal(123);
  });
});

describe('fuck API', function() {
  it('should be right amount', function() {
    expect(1+2).to.equal(3);
  });
});

describe('url', function() {
  it('should be right amount', function() {
    expect(bitcoinex.URL).to.equal('abcdefg');
  });
});

describe('Coinbase API using rp directly', function() {
  it('should be right currency', function() {
  	var options = {
	    uri:'https://api.coinbase.com/v2/prices/spot',
	    headers: {
	        'User-Agent': 'Request-Promise'
	    },
	    json:true 
		};
		rp(options)
			.then(function(body) {
				expect(body.data.currency).to.equal('USD');
			})
			.catch(function(err) {
				console.log('error!');
				return err;
		});
  });
});

describe('Coinbase API using bitcoinex api', function() {
  it('should be right currency type', function(done) {
    // expect(1).to.equal(99);
  	bitcoinex.getCoinbaseUSDPrice()
  		.then(function (body) {
	  		// console.log(body);
        expect(2).to.equal(2);
        expect(body).to.have.property('data');
        expect(parseFloat(body.data.amount)).to.be.a('number');
		  	expect(body.data.currency).to.equal('USD');
        done();
  	});
  });
});

describe('Bitstamp API using bitcoinex api', function() {
  it('should be right type', function(done) {
    // expect(1+2).to.equal(33);

    bitcoinex.getBitstampUSDPrice()
      .then(function (body) {
        // expect(1+2).to.equal(3);
        // console.log(body);
        // expect(1).to.equal(1);
        expect(parseFloat(body.last)).to.be.a('number');
        done();
    });
  });
});