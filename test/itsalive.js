var expect = require("chai").expect;

describe('Testing suite capabilities', function () {
  xit('confirms basic arithmetic', function () {
    expect(2+2).to.equal(4);
  });
});

describe('Testing setTimeout', function () {
  it('confirms setTimeout\'s timer accuracy', function () {
	  var start = new Date();
	  return setTimeout(function () {
	    var duration = new Date() - start;
	    expect(duration).to.be.closeTo(1000, 50);

	  	}, 1000);
  });
});
