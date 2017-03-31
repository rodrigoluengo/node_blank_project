// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

global.chai = require('chai');
global.expect = chai.expect;
global.chaiHttp = require('chai-http');
global.server = require('../server');

global.should = chai.should();
global.HttpStatus = require('http-status-codes');
global.User = require('../models/User');
global.env = require('../config/env');

chai.use(chaiHttp);

global.getTestUser = (done, beforeEach) =>
{
    User.findOne({profile: 'ADM'}).then(user =>
    {
        if(user)
        {
            beforeEach(done, user);
        }
        else
        {
            let _user = env.get('user');
            new User(_user).save().then(user =>
            {
                beforeEach(done, user);
            }).catch(err =>
            {
                console.log(err);
                beforeEach(done, null);
            });
        }

    }).catch(err =>
    {
        console.log(err);
        beforeEach(done, null);
    });


};