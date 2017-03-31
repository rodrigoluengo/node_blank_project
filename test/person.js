require('./config');
let Media = require('../models/Person');
let fs = require('fs');

const route = '/v1/person';
let user;

//Our parent block
describe('Person', () => {

    beforeEach((done) => { // Before each test we empty the database

        Media.remove({}, err => {
            getTestUser(done, (done, _user) => {
                user = _user;
                done();
            });

        });

    });


    /**
     * Test the /POST route
     */
    describe('/POST person', () => {
        it('it should POST person', (done) => {
            chai.request(server)
                .post(route)
                .set('Authorization', 'Bearer ' + user.token)
                .send({
                    owner: user,
                    type: 'F',
                    email: 'rpl@outlook.com',
                    fullname: 'Rodrigo Pereira Luengo',
                    status: 'ACT',
                    taxDocument: {
                        type: 'CPF',
                        number: '33008886892'
                    },
                    addresses: [{
                        street: "Avenida Faria Lima",
                        streetNumber: "2927",
                        complement: "8",
                        district: "Itaim",
                        city: "São Paulo",
                        state: "SP",
                        country: "BRA",
                        zipCode: "01234000"
                    }],
                    phones: [{
                        countryCode: 55,
                        areaCode: 11,
                        number: 954763954,
                        default: true
                    },{
                        countryCode: 55,
                        areaCode: 11,
                        number: 46921700,
                        default: false
                    }]
                })
                .end((err, res) => {
                    res.should.have.status(HttpStatus.CREATED);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

});