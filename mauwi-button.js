import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Mauwi5Button extends LitElement {
  static styles = css`.info { font-style: italic; }`;

  static properties = {
    label: {type: String},
  };

  constructor() {
    super();
    this.label = 'Default Value';
  }

  render() {
    return html`
      <button>
        <span class="info">Info: </span>  
        ${this.label}
      </button>
    `;
  }
}
customElements.define('mauwi-button-v5', Mauwi5Button);
