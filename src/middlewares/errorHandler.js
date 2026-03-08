// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;

    const response = {
        status,
        message: err.name === 'BadRequestError' ? "Bad Request" : "Something went wrong",
        data: err.message,
    };

    if (err.errors) {
        response.data = { message: err.message, errors: err.errors };
    }

    res.status(status).json(response);
};
