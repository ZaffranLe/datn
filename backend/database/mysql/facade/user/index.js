const knex = require("../knex-client");

async function getUserByEmail(email) {
    const user = await knex("user").where({ email: email }).first();
    return user;
}

module.exports = {
    getUserByEmail,
};
