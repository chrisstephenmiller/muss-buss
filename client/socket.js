import io from 'socket.io-client'

const socket = io(window.location.origin, { transports: ['websocket'] })

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
