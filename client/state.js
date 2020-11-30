import {createStore} from 'redux';

const onSensorUpdate = (data) => {
  console.log("Sensor update!", data)
}

const reducer = (state = {
    socket: null,
}, action) => {
  switch (action.type) {
    case 'SET_SOCKET': {
      console.log("Setting socket", action.socket);
      if (state.socket) {
        state.socket.off('sensorUpdate', onSensorUpdate)
      }
      action.socket.on('sensorUpdate', onSensorUpdate)
      return {...state, socket: action.socket}
    }
    default:
      return state;
  };
}

// Store instance as default export
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // redux dev tools
);

export default store;

export const setSocket = (socket) => ({
    type: 'SET_SOCKET_CONTROLLER',
    socket
})

export const connect = (store, mapState) => ({
  get: mapState ? () => mapState(store.getState()) : () => store.getState(),
  connect: (host, key, invalidate) => store.subscribe(invalidate)
});
