const knex = require('knex');
const databaseConfigs = require('../../../configs/database.cfg');
const databaseConfig = databaseConfigs[databaseConfigs.environment].mysql;

const knexClient = knex({
    client: 'mysql',
    connection: {
        host: databaseConfig.host,
        user: databaseConfig.user,
        password: databaseConfig.password,
        database: 'netdas_administrator'
    },
    pool: { min: 2, max: 50 }
});

knexClient.on('query', function (queryData) {
    console.log(`knex-mysql: ${queryData.sql}${queryData.bindings && queryData.bindings.length ? `\nparams: ${JSON.stringify(queryData.bindings)}` : ``}`);
});

module.exports = knexClient;


