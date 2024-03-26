import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('mauwi-lit-button')
export class MauwiButton extends LitElement {
  static styles = css`.info { font-style: italic; }`;

  @property()
  label: string = 'Default Value';

  render() {
    return html`
      <button>
        <span class="info">Info: </span>
        ${this.label}
      </button>
    `;
  }
}