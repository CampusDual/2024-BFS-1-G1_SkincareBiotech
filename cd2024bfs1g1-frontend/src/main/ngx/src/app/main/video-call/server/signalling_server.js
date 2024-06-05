const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 4300}, () => {
    console.log('Signalling Server is running on port 4299')
});
// const wss = new WebSocket.Server({port: 8080}, () => {
//     console.log('Signalling Server is running on port 4299')
// });

wss.broadcast = (ws, data) => {
    wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

wss.on('connection', ws => {
   console.log('Client connected. Total connected clients:', wss.clients.size);
    ws.on('message', message => {
        console.log('Received message:' + message);
        wss.broadcast(ws, message);
    });

    ws.on('close', ws => {
        console.log('Client disconnected. Total connected clients:', wss.clients.size);
    });

    ws.on('error', error => {
        console.log('Error:', error);
    });
});
