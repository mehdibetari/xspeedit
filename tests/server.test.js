//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('[UNIT TESTS] ===> Server', () => {
    describe('  [GET] / ', () => {
        it('it should GET index.html content', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.include('<title>XspeedIt</title>');
                    done();
                });
        });
    });
    
    describe('  [GET] /packager', () => {
        it('it should GET an Empty Array', (done) => {
            chai.request(server)
                .get('/packager')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.be.eql(2);
                    res.body.packagedBoxes.should.be.a('array');
                    res.body.packagedBoxes.length.should.be.eql(0);
                    res.body.count.should.be.eql(0);
                    done();
                });
        });
    });
    
    describe('  [GET] /packager/00000000000000', () => {
        it('it should GET an Array of strings', (done) => {
            chai.request(server)
                .get('/packager/00000000000000')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.be.eql(2);
                    res.body.packagedBoxes.should.be.a('array');
                    res.body.packagedBoxes.length.should.be.eql(0);
                    res.body.count.should.be.eql(0);
                    done();
                });
        });
    });
    
    describe('  [GET] /packager/111111111111', () => {
        it('it should GET an Array of strings', (done) => {
            chai.request(server)
                .get('/packager/111111111111')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.be.eql(2);
                    res.body.packagedBoxes.should.be.a('array');
                    res.body.packagedBoxes.length.should.be.eql(2);
                    res.body.count.should.be.eql(2);
                    done();
                });
        });
    });
    
    describe('  [GET] /packager/87943125642122145', () => {
        it('it should GET an Array of strings', (done) => {
            chai.request(server)
                .get('/packager/87943125642122145')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.be.eql(2);
                    res.body.packagedBoxes.should.be.a('array');
                    res.body.packagedBoxes.length.should.be.eql(7);
                    res.body.count.should.be.eql(7);
                    done();
                });
        });
    });
        
    describe('  [GET] /packager/163841689525773', () => {
        it('it should GET an Array of strings', (done) => {
            chai.request(server)
                .get('/packager/163841689525773')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.be.eql(2);
                    res.body.packagedBoxes.should.be.a('array');
                    res.body.packagedBoxes.length.should.be.eql(8);
                    res.body.count.should.be.eql(8);
                    done();
                });
        });
    });
    
    describe('  [GET] /packager/164874580008748645000011111111534631354', () => {
        it('it should GET an Array of strings', (done) => {
            chai.request(server)
                .get('/packager/164874580008748645000011111111534631354')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.be.eql(2);
                    res.body.packagedBoxes.should.be.a('array');
                    res.body.packagedBoxes.length.should.be.eql(13);
                    res.body.count.should.be.eql(13);
                    done();
                });
        });
    });
    
    describe('  [GET] /packager/qwertyuiopasdfghjklzxcvbnm<>?!@#$%^&*()_-/*-+\][|}{"\'', () => {
        it('it should GET an Array of strings', (done) => {
            chai.request(server)
                .get('/packager/qwertyuiopasdfghjklzxcvbnm<>?!@#$%^&*()_-/*-+\][|}{"\'')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.be.eql(2);
                    res.body.packagedBoxes.should.be.a('array');
                    res.body.packagedBoxes.length.should.be.eql(0);
                    res.body.count.should.be.eql(0);
                    done();
                });
        });
    });
    
    describe('  [GET] /packager/1234567890qwertyuiopasdfghjklzxcvbnm<>?!@#$%^&*()_-/*-+\][|}{"\'', () => {
        it('it should GET an Array of strings', (done) => {
            chai.request(server)
                .get('/packager/1234567890qwertyuiopasdfghjklzxcvbnm<>?!@#$%^&*()_-/*-+\][|}{"\'')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    Object.keys(res.body).length.should.be.eql(2);
                    res.body.packagedBoxes.should.be.a('array');
                    res.body.packagedBoxes.length.should.be.eql(5);
                    res.body.count.should.be.eql(5);
                    done();
                });
        });
    });

});
