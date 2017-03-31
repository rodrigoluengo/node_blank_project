let mongoose = require('mongoose');
let User = mongoose.models['User'];

class UserController
{


  /**
   * Search Users
   * @param req
   * @param res
   */
  static search(req, res)
  {
    User.find({}).populate('owner', 'name').then(user =>
    {
      res.json(user);
    }).catch(err =>
    {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
    });
  }


  /**
   * Find an User
   * @param req
   * @param res
   */
  static get(req, res)
  {
    User.findById(req.params['id']).then(user =>
    {
      let status = HttpStatus.OK;
      if(user == null)
      status = HttpStatus.NOT_FOUND;

      res.status(status).json(user);
    })
    .catch(err =>
    {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
    });
  }


  /**
   * Store a new User
   * @param req
   * @param res
   */
  static post(req, res)
  {
    let user = new User(req.body);
    let promise = user.save();
    promise.then(user =>
    {
      res.status(HttpStatus.CREATED).json(user);
    })
    .catch(err =>
    {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
    });
  }


  /**
   * Update an User
   * @param req
   * @param res
   */
  static put(req, res)
  {
    User.where({_id: req.params['id']})
        .update(req.body)
        .then(result =>
        {
          let status = HttpStatus.OK;
          if(!result.ok)
            status = HttpStatus.UNPROCESSABLE_ENTITY;
          if(!result.n)
            status = HttpStatus.NOT_FOUND;

          res.status(status).json(result);
        })
        .catch(err =>
        {
          res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
        });
  }


  /**
   * Delete an User
   * @param req
   * @param res
   */
  static delete(req, res)
  {
    User.remove({_id: req.params['id']}).then(response =>
    {
      let status = HttpStatus.OK;
      if(!response.result.n)
      status = HttpStatus.NOT_FOUND;
      res.status(status).json(response.result);
    })
    .catch(err =>
    {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
    });
  }


  /**
   * Find User by email and password
   * @param req
   * @param res
   */
  static credentials(req, res)
  {
    User.findByCredential(req.body).then(user =>
    {
      let status = HttpStatus.OK;
      if(user == null)
        status = HttpStatus.NOT_FOUND;

      res.status(status).json(user);
    })
    .catch(err =>
    {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
    });
  }

}

module.exports = UserController;
