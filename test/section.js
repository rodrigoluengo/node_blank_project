require('./config');
let Section = require('../models/Section');

const route = '/v1/section';
let user;

//Our parent block
describe('Section', () => {

    beforeEach((done) => { // Before each test we empty the database

        Section.remove({}, err =>
        {
            getTestUser(done, (done, _user) => {
                user = _user;
                done();
            });

        });

    });

    /**
     * Test the /POST route
     */
    describe('/POST section', () =>
    {
        it('it should POST section', (done) =>
        {
            chai.request(server)
                .post(route)
                .set('Authorization', 'Bearer ' + user.token)
                .send({
                    owner: user,
                    name: 'Departamento Padrão',
                    type: 'EXP',
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
     * Test the /POST route with validation error
     */
    describe('/POST section with validation error', () =>
    {
        it('it should POST section with validation error', (done) =>
        {
            chai.request(server)
                .post(route)
                .set('Authorization', 'Bearer ' + user.token)
                .send({
                    owner: user,
                    name: ' ',
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
     * Test the /GET route
     */
    describe('/GET all section', () =>
    {
        it('it should GET section', (done) =>
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
    describe('/GET specify section', () =>
    {
        it('it should GET specify section', (done) =>
        {
            new Section({
                owner: user,
                name: 'Departamento Padrão',
                type: 'EXP',
                status: 'ACT',
                userCreatedAt: user
            }).save().then(section =>
            {
                chai.request(server)
                    .get(route + '/' + section._id)
                    .set('Authorization', 'Bearer ' + user.token)
                    .send(section)
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
    describe('/PUT a section', () =>
    {
        it('it should PUT section', (done) =>
        {
            new Section({
                owner: user,
                name: 'Departamento Padrão!!!',
                type: 'EXP',
                status: 'ACT',
                userCreatedAt: user
            }).save().then(section =>
            {
                chai.request(server)
                    .put(route + '/' + section._id)
                    .set('Authorization', 'Bearer ' + user.token)
                    .send(section)
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
    describe('/DELETE a section', () =>
    {
        it('it should DELETE section', (done) =>
        {
            new Section({
                owner: user,
                name: 'Departamento Padrão',
                type: 'EXP',
                status: 'ACT',
                userCreatedAt: user
            }).save().then(section =>
            {
                chai.request(server)
                    .delete(route + '/' + section._id)
                    .set('Authorization', 'Bearer ' + user.token)
                    .end((err, res) =>
                    {
                        res.should.have.status(HttpStatus.OK);
                        done();
                    });
            });

        });
    });


    /**
     * Test Entity Section repeat name with same owner
     */
    describe('Entity a Section with a unique name', () =>
    {
        it('it should Section with a unique name', () =>
        {
            let jsonSection = {
                owner: user,
                name: 'Departamento Padrão',
                type: 'EXP',
                status: 'ACT',
                userCreatedAt: user
            };

            return new Section(jsonSection).save().then(section =>
            {
                return new Section(jsonSection).save().catch(err =>
                {
                    expect(err.errors.name.message).to.equal('Já existe um Departamento com este nome');
                });
            });

        });
    });

});
