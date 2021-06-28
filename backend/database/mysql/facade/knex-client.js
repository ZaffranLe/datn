const knex = require("knex");
const databaseConfigs = require("../../../config/database.cfg");
const env = databaseConfigs.environment;
const databaseConfig = databaseConfigs[env].mysql;

const knexClient = knex({
    client: "mysql",
    connection: {
        host: databaseConfig.host,
        user: databaseConfig.user,
        password: databaseConfig.password,
        database: databaseConfig.database,
    },
    pool: { min: 2, max: 50 },
});

// knexClient.on("query", function (queryData) {
//     console.log(
//         `knex-mysql: ${queryData.sql}${
//             queryData.bindings && queryData.bindings.length ? `\nparams: ${JSON.stringify(queryData.bindings)}` : ``
//         }`
//     );
// });

module.exports = knexClient;
