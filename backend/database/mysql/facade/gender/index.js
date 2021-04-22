const knex = require("../knex-client");

async function getAll() {
    const data = await knex("gender");
    return data;
}

module.exports = {
    getAll,
};
