import socketio from "socket.io-client";

/**
 * Opens a new socket that connects to the server
 * @return the created client socket
 */
export const openSocket = (chats, userId) => {
    let socket = socketio('http://yolo-backend.herokuapp.com/', {
        query: `chatList=${chats}&user=${userId}`
    })

    socket.io.on("reconnect", () => {
        console.log("⏫ socket reconnected")
        socket.emit("appOpened", userId)
        socket.emit("notificationsUpdated", userId)
    })

    return socket
}