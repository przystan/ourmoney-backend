import errorHandler from 'errorhandler';

import app from './app';
import db from './config/db';

import WebSocket from 'ws';

const wss = new WebSocket.Server({
  port: 8081,
});



wss.on('connection', (ws) => {
    ws.send('Welcome to the chat, enjoy :)');
    let i =0;
    // setInterval(()=> {
    //     ws.send('Hello '+ i);
    //     i++;
    // },3000)
    

    ws.on('message', (data) => {
        let message;
        
        try {
          message = JSON.parse(data);
        } catch (e) {
    
          return;
        }
    

        console.log(message)
        
        if (message.type === 'NEW_MESSAGE') {
            ws.send(JSON.stringify(message.payload))
        //   wss.clients.forEach((client) => {
        //     if (client !== ws && client.readyState === WebSocket.OPEN) {
        //       client.send(data);
        //     }
        //   });
        }
      });
  });

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */

const server = app.listen(app.get('port'), () => {
    console.log('  App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

export default server;
