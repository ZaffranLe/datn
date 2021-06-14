function handleSocket(io) {
    io.on("connection", (socket) => {
        console.log("connected");
    });
}

module.exports = handleSocket;
