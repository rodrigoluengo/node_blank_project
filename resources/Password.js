var crypto = require('crypto');
module.exports = {
    encrypt: function(password)
    {
        return crypto.createHmac('sha256', env.get('app.key'))
            .update(password.toString())
            .digest('hex');
    },
    compare: function(purePassword, hashPassword)
    {
        return this.encrypt(purePassword) === hashPassword;
    }
};
