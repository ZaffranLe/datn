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
    });
}

module.exports = handleSocket;
