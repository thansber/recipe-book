import { LitElement, html, css } from 'lit-element';

class RecipeInput extends LitElement {
  constructor() {
    super();
    this.placeholder = '';
    this.value = '';
  }
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        label {
          display: flex;
          flex-direction: column;
          font-size: 1.25rem;
        }

        input {
          font-size: 1.5rem;
          margin-top: 0.25rem;
          padding: 0.25rem 0.5rem;
        }
      `,
      css`
        :host([size='small']) input {
          width: 5rem;
        }
      `,
      css`
        :host([size='medium']) input {
          width: 15rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      placeholder: { type: String },
      size: { type: String, reflect: true },
      value: { type: String },
    };
  }

  applyFocus() {
    this.input.focus;
  }

  firstUpdated() {
    this.input = this.shadowRoot.getElementById('input');
  }

  inputValue() {
    return this.input.value;
  }

  render() {
    return html`
      <label>
        <slot></slot>
        <input id="input" placeholder="${this.placeholder}" .value="${this.value || ''}" />
      </label>
    `;
  }
}

customElements.define('recipe-input', RecipeInput);
