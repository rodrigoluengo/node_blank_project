let mongoose = require('mongoose');
let Section = mongoose.models['Section'];

class SectionController
{


  /**
   * Search a Section
   * @param req
   * @param res
   */
  static search(req, res)
  {
    Section.find({}).then(sections =>
    {
      res.status(HttpStatus.OK).json(sections);
    })
    .catch(err =>
    {
      res.status(HttpStatus.NOT_FOUND).json(err);
    });
  }


  /**
   * Find a Section
   * @param req
   * @param res
   */
  static get(req, res)
  {
    Section.findOne({_id: req.params['id']}).then(section =>
    {
      res.status(HttpStatus.OK).json(section);
    })
    .catch(err =>
    {
      res.status(HttpStatus.NOT_FOUND).json(err);
    });
  }


  /**
   * Store a new Section
   * @param req
   * @param res
   */
  static post(req, res)
  {
    let section = req.body;
    section.userCreatedAt = req.user;
    section.owner = req.user.getOwner()._id;
    new Section(section).save().then(section =>
    {
      res.status(HttpStatus.CREATED).json(section);
    })
    .catch(err =>
    {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
    });
  }


  /**
   * Update a Section
   * @param req
   * @param res
   */
  static put(req, res)
  {
    let section = req.body;
    section.userUpdatedAt = req.user;
    Section
      .where({_id: req.params['id']})
      .update(section)
      .then(result => {

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
   * Delete a Section
   * @param req
   * @param res
   */
  static delete(req, res)
  {
    Section
      .remove({_id: req.params['id']})
      .then(response =>
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

};


module.exports = SectionController;
