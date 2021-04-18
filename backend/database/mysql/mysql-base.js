const mysql = require("mysql");

module.exports = function (logger, config) {
    const self = this;

    self.pool = mysql.createPool(config);

    this.getConnection = function getConnection() {
        return new Promise(function (resolve, reject) {
            self.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(connection);
                }
            });
        });
    };

    this.beginTransaction = function beginTransaction(con) {
        return new Promise(function (resolve, reject) {
            con.beginTransaction(function (err) {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    };

    this.commitTransaction = function commitTransaction(con) {
        return new Promise(function (resolve, reject) {
            con.commit(function (err) {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    };

    this.rollbackTransaction = function rollbackTransaction(con) {
        return new Promise(function (resolve, reject) {
            con.rollback(function (err) {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    };

    this.query = function query(sql, params) {

        // log.info('MYSQL QUERY: \n', sql, '\n', 'PARAMS: ', JSON.stringify(params));

        return new Promise(function (resolve, reject) {
            self.pool.query(sql, params, function (err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    };

    this.conQuery = function (con, sql, params) {
        return new Promise(function (resolve, reject) {
            con.query(sql, params, function (err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
};
