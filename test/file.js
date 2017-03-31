require('./config');
let File = require('../models/File');
let fs = require('fs');

const route = '/v1/file';
let user;

//Our parent block
describe('File', () => {

  beforeEach((done) => { // Before each test we empty the database

    File.remove({}, err => {
      getTestUser(done, (done, _user) => {
        user = _user;
        done();
      });

    });

  });


  /**
   * Test the /POST route
   */
  describe('/POST file', () => {
    it('it should POST file', (done) => {
      chai.request(server)
        .post(route)
        .set('Authorization', 'Bearer ' + user.token)
        .send({
          owner: user
        })
        .attach('file', fs.readFileSync(__dirname + '/files/rodrigo.jpg'), 'rodrigo.jpg')
        .end((err, res) => {
          res.should.have.status(HttpStatus.OK);
          console.log(res.body);
          res.body.should.be.a('array');
          done();
        });
    });
  });

});
