const knex = require("../knex-client");
const dbClient = require("../mysql-client");
const _ = require("lodash");
const DEFAULT_LIMIT = 10;

async function getLatestMessages(idUser) {
    const sentMsgQuery = `SELECT * FROM (SELECT *, RANK() OVER(PARTITION BY idUserTo ORDER BY createdAt DESC) AS time_rank 
                                            FROM message WHERE idUserFrom = ?) t1
                                            JOIN user t2 ON t1.idUserTo = t2.id
                                            WHERE t1.time_rank = 1 
                                            ORDER BY t1.createdAt DESC LIMIT ?`;
    const sentMsgs = await dbClient.query(sentMsgQuery, [idUser, DEFAULT_LIMIT]);

    const receiveMsgQuery = `SELECT * FROM (SELECT *, RANK() OVER(PARTITION BY idUserFrom ORDER BY createdAt DESC) AS time_rank 
                                            FROM message WHERE idUserTo = ?) t1 
                                            JOIN user t2 ON t1.idUserFrom = t2.id
                                            WHERE t1.time_rank = 1 
                                            ORDER BY t1.createdAt DESC LIMIT ?`;
    const receiveMsgs = await dbClient.query(receiveMsgQuery, [idUser, DEFAULT_LIMIT]);

    const existUser = [];
    const msgs = _.sortBy(sentMsgs.concat(receiveMsgs), ["createdAt"]).reverse();
    return msgs.filter((msg) => {
        if (msg.idUserFrom === idUser) {
            if (!existUser.includes(msg.idUserTo)) {
                existUser.push(msg.idUserTo);
                return true;
            }
        } else {
            if (!existUser.includes(msg.idUserFrom)) {
                existUser.push(msg.idUserFrom);
                return true;
            }
        }
        return false;
    });
}

async function getMessageByUserId(idUserFrom, idUserTo) {
    const messages = await knex("message")
        .where({ idUserFrom: idUserFrom, idUserTo: idUserTo })
        .orWhere({
            idUserTo: idUserFrom,
            idUserFrom: idUserTo,
        })
        .sortBy("createdAt", "desc")
        .limit(10);

    return messages;
}

module.exports = {
    getLatestMessages,
    getMessageByUserId,
};
