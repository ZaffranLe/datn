const knex = require("../knex-client");
const { mutableTrimObj, getSlug } = require("../../../../common/utils/common");
const _ = require("lodash");

async function getAll() {
    const data = await knex("hobby");
    return data;
}

async function getById(id) {
    const data = await knex("hobby").where("id", id).first();
    return data;
}

async function create(info, transaction = null) {
    const _knex = transaction || knex;
    const fields = ["name", "icon"];
    const data = _.pick(info, fields);
    mutableTrimObj(data);
    data.slug = getSlug(data.name);
    await _knex("hobby").insert(data);
}

async function update(id, info, transaction = null) {
    const _knex = transaction || knex;
    const fields = ["name", "icon"];
    const data = _.pick(info, fields);
    mutableTrimObj(data);
    data.slug = getSlug(data.name);
    await _knex("hobby").update(data).where("id", id);
}

async function remove(id, transaction = null) {
    const _knex = transaction || knex;
    await _knex("hobby").update({ status: 0 }).where("id", id);
}

async function hardDelete(id, transaction = null) {
    const _knex = transaction || knex;
    await _knex("hobby").where("id", id).del();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    hardDelete,
};
