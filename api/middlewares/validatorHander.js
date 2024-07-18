const boom = require ('@hapi/boom');

function validatorHandler(schema, propetry) {
  return (req, res, next) => {
    const data = req[propetry];
    const {error} = schema.validate(data, { abortEarly: false});
    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
