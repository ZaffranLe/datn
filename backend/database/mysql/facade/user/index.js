const knex = require("../knex-client");
const _ = require("lodash");

async function insertRefreshToken(info, transaction = null) {
    const _knex = transaction ? transaction : knex;
    try {
        const fields = ["refreshToken", "idUser", "issuedAt", "expiredAt", "ip"];
        const data = _.pick(info, fields);
        await _knex("refresh_token").insert(data);
    } catch (e) {
        throw e;
    }
}

async function getUserByEmail(email) {
    const user = await knex("user").where({ email: email }).first();
    return user;
}

async function register(info, transaction = null) {
    const fields = ["email", "password", "createdAt"];
    const data = _.pick(info, fields);
    const _knex = transaction ? transaction : knex;
    try {
        const result = await _knex("user").insert(data);
        if (result.length) {
            return result[0];
        }
    } catch (e) {
        throw e;
    }
    return null;
}

module.exports = {
    getUserByEmail,
    register,
    insertRefreshToken,
};
