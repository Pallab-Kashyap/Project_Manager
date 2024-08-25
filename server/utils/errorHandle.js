const errorHandle = (error, req, res, next) => {
    console.log(error);
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status: false,
        message: error.message
    })
}

module.exports = errorHandle