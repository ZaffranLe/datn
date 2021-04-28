const knex = require("../knex-client");
const { mutableTrimObj } = require("../../../../common/utils/common");
const _ = require("lodash");

async function getAll() {
    const data = await knex("preference");
    return data;
}

async function getById(id) {
    const data = await knex("preference").where("id", id).first();
    return data;
}

async function create(info, transaction = null) {
    const _knex = transaction || knex;
    const fields = ["name", "icon"];
    const data = _.pick(info, fields);
    mutableTrimObj(data);
    await _knex("preference").insert(data);
}

async function update(id, info, transaction = null) {
    const _knex = transaction || knex;
    const fields = ["name", "icon"];
    const data = _.pick(info, fields);
    mutableTrimObj(data);
    await _knex("preference").update(data).where("id", id);
}

async function remove(id, transaction = null) {
    const _knex = transaction || knex;
    await _knex("preference").update({ status: 0 }).where("id", id);
}

async function hardDelete(id, transaction = null) {
    const _knex = transaction || knex;
    await _knex("preference").where("id", id).del();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    hardDelete,
};
