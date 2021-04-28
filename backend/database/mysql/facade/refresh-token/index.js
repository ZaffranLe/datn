const knex = require("../knex-client");
const _ = require("lodash");

async function insertRefreshToken(info, transaction = null) {
    const _knex = transaction || knex;
    const fields = ["refreshToken", "idUser", "issuedAt", "expiredAt", "ip"];
    const data = _.pick(info, fields);
    await _knex("refresh_token").insert(data);
}

async function getRefreshToken(info) {
    const { refreshToken, idUser, ip } = info;
    const data = await knex("refresh_token")
        .where({
            refreshToken,
            ip,
            idUser,
        })
        .first();
    return data;
}

module.exports = {
    insertRefreshToken,
    getRefreshToken,
};
