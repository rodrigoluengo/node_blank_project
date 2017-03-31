require('./config');

// Model for test
let User = require('../models/User');

// End point test
const route = '/v1/user';

// Default User for test
let user;

//Our parent block
describe('Users', () =>
{

    // Before each test we empty the database
    beforeEach((done) =>
    {
        User.remove({}, err =>
        {
            getTestUser(done, (done, _user) =>
            {
                user = _user;
                done();
            });
        });
    });

    /**
     * Test the /GET route
     */
    describe('/GET user', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get(route)
                .set('Authorization', 'Bearer ' + user.token)
                .end((err, res) => {
                    res.should.have.status(HttpStatus.OK);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });



    /**
     * Test the /GET route
     */
    describe('/GET user', () => {
        it('it should GET a user', (done) => {
            chai.request(server)
                .get(route + '/' + user.id)
                .set('Authorization', 'Bearer ' + user.token)
                .end((err, res) => {
                    res.should.have.status(HttpStatus.OK);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });


    /**
     * Test the /GET route not found user
     */
    describe('/GET not found user', () => {
        it('it should GET a not found user', (done) => {
            chai.request(server)
                .get(route + '/58149e4643ddce3be052ddbe')
                .set('Authorization', 'Bearer ' + user.token)
                .end((err, res) => {
                    res.should.have.status(HttpStatus.NOT_FOUND);
                    done();
                });
        });
    });

    /**
     * Test the /POST route
     */
    describe('/POST user', () =>
    {
        it('it should POST user', (done) =>
        {
            chai.request(server)
                .post(route)
                .set('Authorization', 'Bearer ' + user.token)
                .send({
                    name: 'Vanussa Araujo Luengo',
                    email: 'vanussa@gmail.com',
                    password: 'KrirhO52$$',
                    profile: 'ADM',
                    status: 'ACT'
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
     * Test the /POST route
     */
    describe('/POST user', () =>
    {
        it('it should POST user with error validate', (done) =>
        {
            chai.request(server)
                .post(route)
                .set('Authorization', 'Bearer ' + user.token)
                .send({
                    name: 'Rodrigo Pereira Luengo',
                    email: 'rpl@outlook.com',
                    password: 'KrirhO52$$',
                    profile: 'ADM',
                    status: 'ACT'
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
     * Test the /PUT route
     */
    describe('/PUT user', () =>
    {
        it('it should PUT user', (done) =>
        {
            chai.request(server)
                .put(route + '/' + user.id)
                .set('Authorization', 'Bearer ' + user.token)
                .send({
                    name: 'Rodrigo Pereira',
                    email: 'rpl@outlook.com',
                    password: 'KrirhO52$$',
                    profile: 'ADM'
                })
                .end((err, res) =>
                {
                    res.should.have.status(HttpStatus.OK);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });


    /**
     * Test the /PUT route not found user
     */
    describe('/PUT user not found user', () =>
    {
        it('it should PUT user not found user', (done) =>
        {
            chai.request(server)
                .put(route + '/58149e4643ddce3be052ddbe')
                .set('Authorization', 'Bearer ' + user.token)
                .send({
                    name: 'Rodrigo Pereira',
                    email: 'rpl@outlook.com',
                    password: 'KrirhO52$$',
                    profile: 'ADM'
                })
                .end((err, res) =>
                {
                    res.should.have.status(HttpStatus.NOT_FOUND);
                    done();
                });
        });
    });


    /**
     * Test the /DELETE route
     */
    describe('/DELETE user', () =>
    {
        it('it should DELETE user', (done) =>
        {
            User.findOne({'name': 'Rodrigo Pereira Luengo'}).then(user =>
            {
                chai.request(server)
                    .delete(route + '/' + user._id)
                    .set('Authorization', 'Bearer ' + user.token)
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
     * Test the /DELETE route not found user
     */
    describe('/DELETE user not found', () =>
    {
        it('it should DELETE user not found', (done) =>
        {
            chai.request(server)
                .delete(route + '/58149e4643ddce3be052ddbe')
                .set('Authorization', 'Bearer ' + user.token)
                .end((err, res) =>
                {
                    res.should.have.status(HttpStatus.NOT_FOUND);
                    done();
                });

        });
    });


    /**
     * Test the /POST route for find user with credential, email and password
     */
    describe('/POST find user with credential', () =>
    {
        it('it should POST user email and password', (done) =>
        {
            chai.request(server)
                .post(route + '/credential')
                .send({
                    email: 'rpl@outlook.com',
                    password: 'KrirhO52$$'
                })
                .end((err, res) =>
                {
                    res.should.have.status(HttpStatus.OK);
                    console.log(res.body);
                    res.body.should.be.a('object');
                    done();
                });

        });
    });

});

