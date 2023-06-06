const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    console.log(err.stack);
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // error for mongoose cast error and invalid object id error
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = 'Resource not found'
        statusCode = 400
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}


export { notFound, errorHandler };