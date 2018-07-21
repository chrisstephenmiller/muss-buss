module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

      socket.on(`updateOut`, () => {
        console.log(`Update from ${socket.id}`)
        socket.broadcast.emit(`updateIn`)
      })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
