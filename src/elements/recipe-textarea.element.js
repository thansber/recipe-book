import { LitElement, html, css } from 'lit-element';

class RecipeTextarea extends LitElement {
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

        textarea {
          font-family: inherit;
          font-size: 1.5rem;
          height: 16rem;
          margin-top: 0.25rem;
          padding: 0.25rem 0.5rem;
          resize: vertical;
        }
      `,
    ];
  }

  static get properties() {
    return {
      placeholder: { type: String },
      value: { type: String },
    };
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
        <textarea id="input" placeholder="${this.placeholder}" .value="${this.value}"></textarea>
      </label>
    `;
  }

  updated(changed) {
    changed.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}, newValue: ${this[propName]}`);
    });
    if (changed.has('value') && !this.value) {
      this.input.value = '';
    }
  }
}

customElements.define('recipe-textarea', RecipeTextarea);
