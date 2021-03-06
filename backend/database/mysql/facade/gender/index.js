const knex = require("../knex-client");
const { mutableTrimObj } = require("../../../../common/utils/common");
const _ = require("lodash");

async function getAll() {
    const data = await knex("gender");
    return data;
}

async function getById(id) {
    const data = await knex("gender").where("id", id).first();
    return data;
}

async function create(info, transaction = null) {
    const _knex = transaction || knex;
    const fields = ["name", "icon"];
    const data = _.pick(info, fields);
    mutableTrimObj(data);
    await _knex("gender").insert(data);
    return data;
}

async function update(id, info, transaction = null) {
    const _knex = transaction || knex;
    const fields = ["name", "icon"];
    const data = _.pick(info, fields);
    mutableTrimObj(data);
    await _knex("gender").update(data).where("id", id);
    return data
}

async function remove(id, transaction = null) {
    const _knex = transaction || knex;
    await _knex("gender").update({ status: 0 }).where("id", id);
}

async function hardDelete(id, transaction = null) {
    const _knex = transaction || knex;
    await _knex("gender").where("id", id).del();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    hardDelete,
};
