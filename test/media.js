require('./config');
let Media = require('../models/Media');
let fs = require('fs');

const route = '/v1/media';
let user;

//Our parent block
describe('Media', () => {

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
    describe('/POST media', () => {
        it('it should POST media', (done) => {
            chai.request(server)
                .post(route)
                .set('Authorization', 'Bearer ' + user.token)
                .send({
                    owner: user,
                    type: 'IMG',
                })
                .attach('image', fs.readFileSync(__dirname + '/files/rodrigo.jpg'), 'rodrigo.jpg')
                .end((err, res) => {
                    res.should.have.status(HttpStatus.OK);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

});