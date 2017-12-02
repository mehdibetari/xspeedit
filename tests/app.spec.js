const app = require('../server');
const http = require('http');
const Browser = require('zombie');
const assert = require('assert');

describe('[END2END TESTS] ===> XspeedIt page', function() {
    before(() => {
        this.server = http.createServer(app).listen(7777);
        this.browser = new Browser({ site: 'http://localhost:7777' });
    });
    before((done) => {
        this.browser.visit('/', done);
    });
    it("should have defined headless browser", () => {
        assert.equal(typeof this.browser != "undefined", true);
        assert.equal(this.browser instanceof Browser, true);
    });
    it('should show contact a form', () => {
        let browser = this.browser;
        assert.ok(this.browser.success);
        assert.equal(this.browser.text('h1'), 'XspeedIt');
        assert.equal(this.browser.assert.element('form'));
        assert.equal(this.browser.assert.element('input'));
    });
    it('should javascript is running', () => {
        let browser = this.browser;
        before(function(done) {
            browser
                .fill('chain','123')
                .fire('input','click');
            done();
        });
    
        it('should be successful', function() {
            browser.assert.success();
        });
    
        it('should see welcome page', function() {
            browser.assert.className('div.label-action', 'label-action visible');
        });
    });
    after((done) => {
        this.server.close(done);
    });
});