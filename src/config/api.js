const webSocketUrl = 'wss://api.bitfinex.com/ws/2'

export function startTickerWebsocket(callback){
    const wss = new WebSocket(webSocketUrl)
    wss.onmessage = (evt) => { tickerMessage(evt, callback) };
    wss.onclose = function(){
      if(!window.timerID){
       window.timerID=setInterval(function(){startTickerWebsocket(webSocketUrl)}, 5000);
      }
    }

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
      symbol: 'tBTCUSD'
    })

    wss.onopen = () => wss.send(msg)
}

export function startTradesWebsocket(callback){
    const wss = new WebSocket(webSocketUrl)
    wss.onmessage = (evt) => { tradesMessage(evt, callback) };
    wss.onclose = function(){
      if(!window.timerID){
       window.timerID=setInterval(function(){startTradesWebsocket(webSocketUrl)}, 5000);
      }
    }

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'trades',
      symbol: 'tBTCUSD'
    })

    wss.onopen = () => wss.send(msg)
}

export function startBookWebsocket(callback){
    const wss = new WebSocket(webSocketUrl)
    wss.onmessage = (evt) => { bookMessage(evt, callback) };
    wss.onclose = function(){
      if(!window.timerID){
       window.timerID=setInterval(function(){startBookWebsocket(webSocketUrl)}, 5000);
      }
    }

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
      symbol: 'tBTCUSD',
      precission: 'P3',
    })

    wss.onopen = () => wss.send(msg)
}

function tickerMessage(msg, callback) {
  const dataFormatted = JSON.parse(msg.data)
  callback(dataFormatted)
  handleError(msg)
}

function tradesMessage(msg, callback) {
  const dataFormatted = JSON.parse(msg.data)
  callback(dataFormatted)
  handleError(msg)
}

function bookMessage(msg, callback) {
  const dataFormatted = JSON.parse(msg.data)
  console.log(msg);
  callback(dataFormatted)
  handleError(msg)
}

function handleError(msg) {
  if (msg.info && msg.code) {
    msg.code === 20051 && console.log('Stop/Restart Websocket Server (please reconnect)')
    msg.code === 20060 && console.log('Entering in Maintenance mode. Please pause any activity and resume after receiving the info message 20061 (it should take 120 seconds at most).')
    msg.code === 20061 && console.log('Maintenance ended. You can resume normal activity. It is advised to unsubscribe/subscribe again all channels.')
  }
}

// export function closeWebsocket() {
//   closeSocket = true
//   startWebsocket()
// }
