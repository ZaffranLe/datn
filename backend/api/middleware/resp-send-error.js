const { UserError } = require("../../common/utils/custom-errors");

async function responseError(req, res, next) {
    res.sendError = (error, controller = "Unknown", action = "Unknown") => {
        console.error(error);
        const errorMsg = error.message ? error.message : error;
        let _status = 500;
        if (error instanceof UserError) {
            _status = 400;
        } else {
            console.error(`${controller} => ${action}: `, errorMsg);
        }
        res.status(_status).json({
            data: null,
            message: errorMsg,
        });
    };

    next();
}

module.exports = responseError;
