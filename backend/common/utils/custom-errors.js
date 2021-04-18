class UserError extends Error {
    constructor(message, code = "") {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

Object.defineProperty(UserError.prototype, "toJSON", {
    value: function () {
        return {
            code: this.code,
            message: this.message,
        };
    },
    configurable: true,
    writable: true,
});

module.exports = {
    UserError,
};
