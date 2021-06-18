function handleSocket(io) {
    io.on("connection", (socket) => {
        console.log("A socket client connected");
    });
}

module.exports = handleSocket;
