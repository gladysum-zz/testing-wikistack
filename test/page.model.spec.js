var chai = require("chai")
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

var Page = require('../models').Page;

var page;

describe('Page model', function () {
	beforeEach(function(){
		return Page.sync({force: true, logging: false});
	});
	beforeEach(function(){
		page = Page.build();
	});
  describe('Virtuals', function () {

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function(){
      	page.urlTitle = "test_value";
      	expect(page.route).to.be.equal("/wiki/test_value");
      });

    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function(){
      	page.content = "# test";
      	expect(page.renderedContent).to.be.equal('<h1 id="test">test</h1>\n');
      });
    });
  });

  describe('Class methods', function () {
  	beforeEach(function(){
		
  		var page1IsBeingCreated = Page.create({
	    	title: 'title1',
	    	content: 'content1',
	    	tags: ['tag1']
  		});
  		
  		var page2IsBeingCreated = Page.create({
	    	title: 'title2',
	    	content: 'content2',
	    	tags: ['tag2']
  		});
  		
  		var page3IsBeingCreated = Page.create({
	    	title: 'title3',
	    	content: 'content3',
	    	tags: ['tag1', 'tag2']
  		});

  		return Promise.all([page1IsBeingCreated, page2IsBeingCreated, page3IsBeingCreated]);
		
	});
    describe('findByTag', function () {
      
      it('gets pages with the search tag', function (done) {
		Page.findByTag('tag1')
		.then(function (pages) {
		    expect(pages).to.have.lengthOf(2);
		    done();
		})
		  .catch(done);
	  });

	  it('does not get pages without the search tag', function (done) {
		Page.findByTag('falafel')
		.then(function (pages) {
			expect(pages).to.have.lengthOf(0);
			done();
		})
		.catch(done);
	  });

    });
  });

  describe('Instance methods', function () {
    var page1IsBeingCreated;
    var page2IsBeingCreated;
    var page3IsBeingCreated;

    beforeEach(function(done){
		
  		page1IsBeingCreated = Page.create({
	    	title: 'title1',
	    	content: 'content1',
	    	tags: ['tag1']
  		});
  		
  		page2IsBeingCreated = Page.create({
	    	title: 'title2',
	    	content: 'content2',
	    	tags: ['tag2']
  		});
  		
  		page3IsBeingCreated = Page.create({
	    	title: 'title3',
	    	content: 'content3',
	    	tags: ['tag1', 'tag2']
  		});

  		Promise.all([page1IsBeingCreated, page2IsBeingCreated, page3IsBeingCreated])
  		.then(function(result){
  			page1IsBeingCreated = result[0];
  			page2IsBeingCreated = result[1];
  			page3IsBeingCreated = result[2];
  			done();
  		})
  		.catch(done);

		
	});

    describe('findSimilar', function () {
      it('never gets itself', function(done){
      	page1IsBeingCreated.findSimilar()
      	.then(function (pages) {
		    expect(pages).to.not.include(page1IsBeingCreated);
		    done();
		})
		  .catch(done);

      });
      
      xit('gets other pages with any common tags', function(done){
		
		page1IsBeingCreated.findSimilar()
      	.then(function (pages) {
		    expect(pages).to.include(page3IsBeingCreated);
		    done();
		})
		.catch(done);
      });
      
      it('does not get other pages without any common tags', function(done){
      	page1IsBeingCreated.findSimilar()
      	.then(function (pages) {
		    expect(pages).to.not.include(page2IsBeingCreated);
		    done();
		})
		  .catch(done);
      });
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});
