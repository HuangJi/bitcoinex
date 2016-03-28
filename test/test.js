var bitcoinex = require('../bitcoinex');
var expect = require('chai').expect;
var rp = require('request-promise');
var request = require('request');

describe('Test method \'getPriceWith\' with Coinbase API.', function() {
  it('should be right type', function(done) {
    bitcoinex.getPriceWith('coinbase', 'usd', function(err, convertedObject) {
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      done();
    });
  });
});

describe('Test method \'getPriceWith\' with Bitstamp API.', function() {
  it('should be right type', function(done) {
    bitcoinex.getPriceWith('bitstamp', 'twd', function(err, convertedObject) {
      console.log(convertedObject);
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      expect(convertedObject.low).to.be.above(10000);
      done();
    });
  });
});

describe('Test method \'getPriceWith\' with Okcoin API.', function() {
  it('should be right type', function(done) {
    bitcoinex.getPriceWith('okcoin', 'usd', function(err, convertedObject) {
      console.log(convertedObject);
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      done();
    });
  });
});

describe('Test method \'getPriceWith\' with cny currency and Coinbase API.', function() {
  it('should be right type', function(done) {
    bitcoinex.getPriceWith('coinbase', 'cny', function(err, convertedObject) {
      console.log(convertedObject);
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      expect(convertedObject.low).to.be.above(1000);
      done();
    });
  });
});

describe('Test method \'getPriceWith\' with eur currency and Bitfinex API.', function() {
  it('should be right type', function(done) {
    bitcoinex.getPriceWith('bitfinex', 'eur', function(err, convertedObject) {
      console.log(convertedObject);
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      done();
    });
  });
});