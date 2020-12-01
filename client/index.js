import store, { setSocket, setSensorData } from './state'
import { define } from 'hybrids';
import socketIOClient from "socket.io-client";
import { SaunaMain } from './sauna-main'

const socket = socketIOClient();

console.log("Connecting to socket");
socket.on('connect', () => {
  console.log("Socket connected!", socket.id);
  store.dispatch(setSocket(socket));
});

if (window.initialSensorData) {
  store.dispatch(setSensorData(JSON.parse(window.initialSensorData)));
}

define('sauna-main', SaunaMain);

if (module.hot) {
    console.log("We have hot");
    module.hot.accept('./sauna-main.js', function() {
        define('sauna-main', SaunaMain);
    })
}

