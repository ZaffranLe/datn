const knex = require("../knex-client");
const _ = require("lodash");

async function getUserByEmail(email) {
    const user = await knex("user").where({ email: email }).first();
    return user;
}

async function getUserById(id) {
    const user = await knex("user").where({ id: id }).first();
    return user;
}

async function register(info, transaction = null) {
    const fields = ["email", "password", "createdAt"];
    const data = _.pick(info, fields);
    const _knex = transaction || knex;
    const result = await _knex("user").insert(data);
    if (result.length) {
        return result[0];
    }
    return null;
}

module.exports = {
    getUserByEmail,
    getUserById,
    register,
};
