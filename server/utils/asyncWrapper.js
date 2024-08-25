const asyncWrapper = (fn) => {
    return (req, res, next) => {
      fn(req, res, next).catch(error => {

        if (error.name === 'SequelizeValidationError') {
          error.statusCode = 400; // Bad Request for validation errors
        } else if (error.name === 'NotFoundError') {
          error.statusCode = 404; // Not Found for resource not found
        } else if (error.name === 'UnauthorizedError') {
          error.statusCode = 401; // Unauthorized for authentication issues
        }
        return next(error)
      });
    };
  };

module.exports = asyncWrapper