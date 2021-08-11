const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt.cfg");

const clients = {};

function handleSocket(io) {
    io.on("connection", (socket) => {
        const token = socket.handshake.query.token;
        try {
            const decoded = jwt.verify(token, jwtConfig.tokenSecret);
            clients[decoded.id] = socket.id;
            console.log(`Socket ${socket.id} connected.`);
        } catch (e) {
            console.error("Socket auth failed!");
            io.to(socket.id).emit("force-close");
        }

        socket.on("disconnect", (data) => {
            console.log(`Socket ${socket.id} disconnected.`);
        });

        socket.on("send-msg", (data) => {
            const msg = data.msg;
            const { idUserTo } = msg;
            if (clients[idUserTo]) {
                console.log(msg);
                io.to(clients[idUserTo]).emit("receive-msg", {
                    ...msg,
                    image: msg.image ? msg.image.fileName : null,
                    imageId: msg.image ? msg.image.id : null
                });
            }
        });
    });
}

module.exports = handleSocket;
