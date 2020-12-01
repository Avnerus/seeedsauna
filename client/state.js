import {createStore} from 'redux';

const onSensorUpdate = (data) => {
  console.log("Sensor update!", data)
  store.dispatch(setSensorData(data));
}

const reducer = (state = {
    socket: null,
    sensorData: null
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
    case 'SET_SENSOR_DATA': {
      return {...state, sensorData: action.data}
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

export const setSensorData = (data) => ({
    type: 'SET_SENSOR_DATA',
    data
})

export const connect = (store, mapState) => ({
  get: mapState ? () => mapState(store.getState()) : () => store.getState(),
  connect: (host, key, invalidate) => store.subscribe(invalidate)
});
