require('./config');
let Product = require('../models/product');
let Section = require('../models/section');

const route = '/v1/product';
let user;
let section;

//Our parent block
describe('Product', () => {

    beforeEach((done) => { // Before each test we empty the database

        Product.remove({}, err => {
            getTestUser(done, (done, _user) => {
                user = _user;
                done();
            });

        });

        Section.findOne({}).then(_section =>
        {
            section = _section;
        });

    });

    /**
     * Test the /POST route
     */
    describe('/POST product', () =>
    {
        it('it should POST product', (done) =>
        {
            chai.request(server)
                .post(route)
                .set('Authorization', 'Bearer ' + user.token)
                .send({
                    owner: user,
                    section: section,
                    name: 'Produto Padrão',
                    status: 'ACT',
                    price: 9.99
                })
                .end((err, res) =>
                {
                    res.should.have.status(HttpStatus.CREATED);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });


    /**
     * Test the /POST route with validation error
     */
    describe('/POST product with validation error', () =>
    {
        it('it should POST product with validation error', (done) =>
        {
            chai.request(server)
                .post(route)
                .set('Authorization', 'Bearer ' + user.token)
                .send({
                    owner: user,
                    name: ' ',
                    status: 'ACT',
                    price: -10.99
                })
                .end((err, res) =>
                {
                    res.should.have.status(HttpStatus.UNPROCESSABLE_ENTITY);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });


    /**
     * Test the /GET route
     */
    describe('/GET all product', () =>
    {
        it('it should GET product', (done) =>
        {
            chai.request(server)
                .get(route)
                .set('Authorization', 'Bearer ' + user.token)
                .end((err, res) =>
                {
                    res.should.have.status(HttpStatus.OK);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });


    /**
     * Test the /GET route
     */
    describe('/GET specify product', () =>
    {
        it('it should GET specify product', (done) =>
        {
            new Product({
                owner: user,
                section: section,
                name: 'Produto Padrão',
                status: 'ACT',
                price: 29.99,
                userCreatedAt: user
            }).save().then(product =>
            {
                chai.request(server)
                    .get(route + '/' + product._id)
                    .set('Authorization', 'Bearer ' + user.token)
                    .send(product)
                    .end((err, res) =>
                    {
                        res.should.have.status(HttpStatus.OK);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });


    /**
     * Test the /PUT route
     */
    describe('/PUT a product', () =>
    {
        it('it should PUT product', (done) =>
        {
            new Product({
                owner: user,
                section: section,
                name: 'Product Padrão!!!',
                status: 'ACT',
                price: 10.99,
                userCreatedAt: user
            }).save().then(product =>
            {
                chai.request(server)
                    .put(route + '/' + product._id)
                    .set('Authorization', 'Bearer ' + user.token)
                    .send(product)
                    .end((err, res) =>
                    {
                        res.should.have.status(HttpStatus.OK);
                        res.body.should.be.a('object');
                        done();
                    });
            });

        });
    });


    /**
     * Test the /DELETE route
     */
    describe('/DELETE a product', () =>
    {
        it('it should DELETE product', (done) =>
        {
            new Product({
                owner: user,
                section: section,
                name: 'Product Padrão a ser removido',
                status: 'ACT',
                price: 10.99,
                userCreatedAt: user
            }).save().then(product =>
            {
                chai.request(server)
                    .delete(route + '/' + product._id)
                    .set('Authorization', 'Bearer ' + user.token)
                    .end((err, res) =>
                    {
                        res.should.have.status(HttpStatus.OK);
                        done();
                    });
            });

        });
    });

});