import store, { connect } from './state'
import { html, render, define } from 'hybrids';

const SaunaMain = {
  sensorData: connect(store, (state) => state.sensorData),
  render: ({sensorData}) => html`
    <style>
      :host {
        background-color: black;
        height: 100%;
        width: 100%;
        display: block;
        position: absolute;
        margin: 0;
        display: flex;
        align-items: center;
        font-family: 'Nunito';
        flex-direction: column;
        text-align: center;
      }
      #title {
        margin-top: 50px;
        color: white;
        font-size: 72px;
      }
      #temperature {
        color: #ff6a21;
        margin-top: 20px;
      }
      #humidity {
        color: #977bff;
        margin-top: 20px;
      }
      .label {
        font-size: 60px;
      }
      .value {
        font-size: 100px;
      }
    </style>
    <div id="title">PINGU SAUNA</div>
    <div id="temperature">
      <div class="label">Current temperature:</div>
      <div class="value">${sensorData ? sensorData.temperature + 'C' : '??'}</div>
    </div>
    <div id="humidity">
      <div class="label">Humidity:</div>
      <div class="value">${sensorData ? sensorData.humidity + '%' : '??'}</div>
    </div>
  `
}

export { SaunaMain }
