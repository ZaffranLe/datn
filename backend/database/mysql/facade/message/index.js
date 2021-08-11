const knex = require("../knex-client");
const dbClient = require("../mysql-client");
const _ = require("lodash");
const DEFAULT_LIMIT = 10;

async function getLatestMessages(idUser) {
    const sentMsgQuery = `SELECT t1.id, t1.content, t1.createdAt, t1.isSeen, t2.firstName, t2.lastName, t2.slug, t1.idUserFrom, t1.idUserTo, t3.fileName AS avatar
                                FROM (SELECT *, RANK() OVER(PARTITION BY idUserTo ORDER BY createdAt DESC) AS time_rank 
                                            FROM message WHERE idUserFrom = ?) t1
                                            JOIN user t2 ON t1.idUserTo = t2.id
                                            LEFT JOIN image t3 ON t2.avatar = t3.id
                                            WHERE t1.time_rank = 1 
                                            ORDER BY t1.createdAt DESC LIMIT ?`;
    const sentMsgs = await dbClient.query(sentMsgQuery, [idUser, DEFAULT_LIMIT]);

    const receiveMsgQuery = `SELECT t1.id, t1.content, t1.createdAt, t1.isSeen, t2.firstName, t2.lastName, t2.slug, t1.idUserFrom, t1.idUserTo, t3.fileName AS avatar
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

async function getMessageByUserId(info) {
    const { userRequested, userTargeted, offset = 0, limit = 20 } = info;
    const fields = {
        id: "t1.id",
        content: "t1.content",
        idUserFrom: "t1.idUserFrom",
        idUserTo: "t1.idUserTo",
        createdAt: "t1.createdAt",
        image: "t3.fileName",
        imageId: "t3.id"
    };
    const messages = await knex("message AS t1")
        .leftJoin("message_image AS t2", "t1.id", "t2.idMessage")
        .leftJoin("image AS t3", "t2.idImage", "t3.id")
        .where({ "t1.idUserFrom": userRequested, "t1.idUserTo": userTargeted })
        .orWhere({
            "t1.idUserTo": userRequested,
            "t1.idUserFrom": userTargeted,
        })
        .orderBy("t1.createdAt", "desc")
        .offset(offset)
        .limit(limit)
        .columns(fields);
    await knex("message")
        .update({ isSeen: 1 })
        .where({ idUserFrom: userTargeted, idUserTo: userRequested });
    return messages;
}

async function sendMessage(info, transaction = null) {
    const _knex = transaction ? transaction : await knex.transaction();
    const fields = ["idUserFrom", "idUserTo", "content", "createdAt"];
    const data = _.pick(info, fields);
    try {
        const result = await _knex("message").insert(data);
        if (info.image) {
            const msgId = result[0];
            await _knex("message_image").insert({ idMessage: msgId, idImage: info.imageId });
        }
        if (!transaction) {
            await _knex.commit();
        }
    } catch (e) {
        if (!transaction) {
            await _knex.rollback();
        }
        throw e;
    }
}

module.exports = {
    getLatestMessages,
    getMessageByUserId,
    sendMessage,
};
