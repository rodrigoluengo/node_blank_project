let mongoose = require('mongoose');
let Product = mongoose.models['Product'];


class ProductController
{


  /**
   * Search a Product
   * @param req
   * @param res
   */
  static search(req, res)
  {
    Product.find({}).then(products =>
    {
      res.status(HttpStatus.OK).json(products);
    })
    .catch(err =>
    {
      res.status(HttpStatus.NOT_FOUND).json(err);
    });
  }


  /**
   * Find a Product
   * @param req
   * @param res
   */
  static get(req, res)
  {
    Product.findOne({_id: req.params['id']}).then(product =>
    {
      res.status(HttpStatus.OK).json(product);
    })
    .catch(err =>
    {
      res.status(HttpStatus.NOT_FOUND).json(err);
    });
  }


  /**
   * Store a Product
   * @param req
   * @param res
   */
  static post(req, res)
  {
    let product = req.body;
    product.userCreatedAt = req.user;
    new Product(product).save().then(product =>
    {
      res.status(HttpStatus.CREATED).json(product);
    })
    .catch(err =>
    {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(err);
    });
  }


  /**
   * Update a Product
   * @param req
   * @param res
   */
  static put(req, res)
  {
    let product = req.body;
    product.userUpdatedAt = req.user;
    Product
      .where({_id: req.params['id']})
      .update(product)
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
   * Delete a Product
   * @param req
   * @param res
   */
  static delete(req, res)
  {
    Product
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

}


module.exports = ProductController;
