let io

export function initSocket(socketId){
    io = socketId
}

export function getIO(){
    return io
}