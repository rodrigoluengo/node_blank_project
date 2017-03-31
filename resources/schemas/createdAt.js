module.exports = function (next)
{
    this.createdAt = new Date;
    next();
}