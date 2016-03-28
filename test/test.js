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

describe('Test method \'getPriceWith\' with Coinbase API.', function() {
  it('should be right type', function(done) {
    bitcoinex.getPriceWith('coinbase', 'usd', function(err, priceObject) {
      expect(parseFloat(priceObject.high)).to.be.a('number');
      expect(parseFloat(priceObject.now)).to.be.a('number');
      expect(parseFloat(priceObject.low)).to.be.a('number');
      done();
    });
  });
});

describe('Test method \'getPriceWith\' with Bitstamp API.', function() {
  it('should be right type', function(done) {
    bitcoinex.getPriceWith('bitstamp', 'usd', function(err, priceObject) {
      expect(parseFloat(priceObject.high)).to.be.a('number');
      expect(parseFloat(priceObject.now)).to.be.a('number');
      expect(parseFloat(priceObject.low)).to.be.a('number');
      expect(parseFloat(priceObject.high)).to.be.above(parseFloat(priceObject.low));
      done();
    });
  });
});