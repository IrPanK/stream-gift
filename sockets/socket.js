const rootSocket = (io) =>
    io.on("connection", (socket) => {
        console.log("connect!!");

        socket.on("notipin", ({ notipinData }) => {
            socket.broadcast.emit("popupNotipin", { notipinData });
        });

        socket.on("videoni", ({ videoniData }) => {
            socket.broadcast.emit("popupVideoni", { videoniData });
        });

        socket.on("disconnect", () => {
            console.log("LEFT!");
        });
    });

export default rootSocket;
