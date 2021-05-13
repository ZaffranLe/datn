const config = {
    development: {
        mysql: {
            connectionLimit: 500,
            host: "localhost",
            user: "DEFAULT_USER",
            password: "DEFAULT_PASSWORD",
            database: "DEFAULT_DATABASE",
        },
    },
    environment: "development",
};

module.exports = config;
