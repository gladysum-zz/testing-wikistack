var chai = require("chai")
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

describe('Testing suite capabilities', function () {
  xit('confirms basic arithmetic', function () {
    expect(2+2).to.equal(4);
  });
});

describe('Testing setTimeout', function () {
  xit('confirms setTimeout\'s timer accuracy', function () {
	  var start = new Date();
	  return setTimeout(function () {
	    var duration = new Date() - start;
	    expect(duration).to.be.closeTo(1000, 50);

	  	}, 1000);
  });
});

//tests the same thing as above with done
describe('Testing setTimeout', function (done) {
  xit('confirms setTimeout\'s timer accuracy', function () {
	  var start = new Date();
	  setTimeout(function () {
	    var duration = new Date() - start;
	    expect(duration).to.be.closeTo(1000, 50);
	    done();
	  	}, 1000);
  });
});

describe('Testing chai-spies', function(){
	xit('will invoke a function once per element', function(){
		var arr = [1, 2, 3];
		function addOne(num){
			return num++;
		}

		chaiAddOne = chai.spy(addOne);
		arr.forEach(chaiAddOne);
		expect(chaiAddOne).to.have.been.called.exactly(arr.length);
	})
});
