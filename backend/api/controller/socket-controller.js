function handleSocket(io) {
    io.on("connection", (socket) => {
        console.log(
            `A socket client connected via ${socket.handshake.address}`
        );
    });
}

module.exports = handleSocket;
