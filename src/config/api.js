const webSocketUrl = 'wss://api.bitfinex.com/ws/2'
let webSockets = {}

export function startTickerWebsocket(callback, pair, oldData){
    const wss = new WebSocket(webSocketUrl)
    webSockets['ticker'] = wss
    wss.onmessage = (evt) => { msgAndCallback(evt, callback, oldData) }
    wss.onclose = () => reOpenSocket.bind(this, startTickerWebsocket, webSocketUrl)

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
      symbol: `t${pair}`
    })

    wss.onopen = () => wss.send(msg)
}

export function startTradesWebsocket(callback, pair, oldData){
    const wss = new WebSocket(webSocketUrl)
    webSockets['trades'] = wss
    wss.onmessage = (evt) => { msgAndCallback(evt, callback, oldData) }
    wss.onclose = () => reOpenSocket.bind(this, startTradesWebsocket, webSocketUrl)

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'trades',
      symbol: `t${pair}`
    })

    wss.onopen = () => wss.send(msg)
}

export function startBookWebsocket(callback, pair, oldData){
    const wss = new WebSocket(webSocketUrl)
    webSockets['book'] = wss
    wss.onmessage = (evt) => { msgAndCallback(evt, callback, oldData) }
    wss.onclose = () => reOpenSocket.bind(this, startBookWebsocket, webSocketUrl)

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'book',
      symbol: `t${pair}`,
      prec: 'P3',
      freq: 'F1',
    })

    wss.onopen = () => wss.send(msg)
}

function reOpenSocket(callback, socket) {
  if(!window.timerID){
   window.timerID=setInterval(function(){callback(socket)}, 5000)
  }
}

function msgAndCallback(msg, callback, oldData) {
  const dataFormatted = JSON.parse(msg.data)
  callback && typeof callback === 'function' && callback(dataFormatted, oldData)
  handleError(msg)
}

function handleError(msg) {
  if (msg.info && msg.code) {
    msg.code === 20051 && console.log('Stop/Restart Websocket Server (please reconnect)')
    msg.code === 20060 && console.log('Entering in Maintenance mode. Please pause any activity and resume after receiving the info message 20061 (it should take 120 seconds at most).')
    msg.code === 20061 && console.log('Maintenance ended. You can resume normal activity. It is advised to unsubscribe/subscribe again all channels.')
  }
}

export function closeWebSocket(socket = 'all') {
  if(socket === 'all') {
    for (let key in webSockets) {
      webSockets.hasOwnProperty(key) && webSockets[key].close()
    }
  } else {
    webSockets[socket].close()
  }
}
