import { html, render, define } from 'hybrids';

const SaunaMain = {
  render: () => html`
    <style>
      :host {
        background-color: black;
        height: 100%;
        width: 100%;
        display: block;
        position: absolute;
        margin: 0;
        display: flex;
        justify-content: center;
      }
      #title {
        margin-top: 50px;
        color: white;
        font-size: 52px;
      }
    </style>
    <div id="title">SEEED Sauna</div>
  `
}

export { SaunaMain }
