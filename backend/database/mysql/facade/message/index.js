const knex = require("../knex-client");
const dbClient = require("../mysql-client");
const _ = require("lodash");
const DEFAULT_LIMIT = 10;

async function getLatestMessages(idUser) {
    const sentMsgQuery = `SELECT t1.content, t1.createdAt, t1.isSeen, t2.firstName, t2.lastName, t2.slug, t1.idUserFrom, t1.idUserTo, t3.fileName AS avatar
                                FROM (SELECT *, RANK() OVER(PARTITION BY idUserTo ORDER BY createdAt DESC) AS time_rank 
                                            FROM message WHERE idUserFrom = ?) t1
                                            JOIN user t2 ON t1.idUserTo = t2.id
                                            LEFT JOIN image t3 ON t2.avatar = t3.id
                                            WHERE t1.time_rank = 1 
                                            ORDER BY t1.createdAt DESC LIMIT ?`;
    const sentMsgs = await dbClient.query(sentMsgQuery, [idUser, DEFAULT_LIMIT]);

    const receiveMsgQuery = `SELECT t1.content, t1.createdAt, t1.isSeen, t2.firstName, t2.lastName, t2.slug, t1.idUserFrom, t1.idUserTo, t3.fileName AS avatar
                                FROM (SELECT *, RANK() OVER(PARTITION BY idUserFrom ORDER BY createdAt DESC) AS time_rank 
                                            FROM message WHERE idUserTo = ?) t1 
                                            JOIN user t2 ON t1.idUserFrom = t2.id
                                            LEFT JOIN image t3 ON t2.avatar = t3.id
                                            WHERE t1.time_rank = 1 
                                            ORDER BY t1.createdAt DESC LIMIT ?`;
    const receiveMsgs = await dbClient.query(receiveMsgQuery, [idUser, DEFAULT_LIMIT]);

    const existUser = [];
    const msgs = _.sortBy(sentMsgs.concat(receiveMsgs), ["createdAt"]).reverse();
    const filteredMsgs = msgs.filter((msg) => {
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
    for (let i = 0; i < filteredMsgs.length; ++i) {
        filteredMsgs[i].fromSelf = filteredMsgs[i].idUserFrom === idUser ? true : false;
    }
    return filteredMsgs;
}

async function getMessageByUserId(idUserFrom, idUserTo) {
    const messages = await knex("message")
        .where({ idUserFrom: idUserFrom, idUserTo: idUserTo })
        .orWhere({
            idUserTo: idUserFrom,
            idUserFrom: idUserTo,
        })
        .orderBy("createdAt", "desc")
        .limit(20);

    return messages;
}

module.exports = {
    getLatestMessages,
    getMessageByUserId,
};
