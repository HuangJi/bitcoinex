var bitcoinex = require('../bitcoinex');
var expect = require('chai').expect;
var rp = require('request-promise');
var request = require('request');

describe('Test method \'getPriceWith\' with several exchanges and multiple currency.', function() {
  it('Coinbase API with usd currency', function(done) {
    bitcoinex.getPriceWith('coinbase', 'usd', function(err, convertedObject) {
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      done();
    });
  });
  it('Bitstamp API with twd currency', function(done) {
    bitcoinex.getPriceWith('bitstamp', 'twd', function(err, convertedObject) {
      console.log(convertedObject);
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      expect(convertedObject.low).to.be.above(10000);
      done();
    });
  });
  it('Okcoin API with usd currency', function(done) {
    bitcoinex.getPriceWith('okcoin', 'usd', function(err, convertedObject) {
      console.log(convertedObject);
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      done();
    });
  });
  it('Okcoin API with cny currency', function(done) {
    bitcoinex.getPriceWith('okcoin', 'cny', function(err, convertedObject) {
      console.log(convertedObject);
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      done();
    });
  });
  it('Bitstamp API with eur currency', function(done) {
    bitcoinex.getPriceWith('bitstamp', 'eur', function(err, convertedObject) {
      console.log(convertedObject);
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      done();
    });
  });
  it('Coinbase API with cny currency', function(done) {
    bitcoinex.getPriceWith('coinbase', 'cny', function(err, convertedObject) {
      console.log(convertedObject);
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      expect(convertedObject.low).to.be.above(1000);
      done();
    });
  });
  it('Bitfinex API with eur currency', function(done) {
    bitcoinex.getPriceWith('bitfinex', 'eur', function(err, convertedObject) {
      console.log(convertedObject);
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      done();
    });
  });
  it('Itbit API with twd currency', function(done) {
    bitcoinex.getPriceWith('itbit', 'twd', function(err, convertedObject) {
      console.log(convertedObject);
      expect(convertedObject.high).to.be.a('number');
      expect(convertedObject.last).to.be.a('number');
      expect(convertedObject.low).to.be.a('number');
      done();
    });
  });
});