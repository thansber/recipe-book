import { LitElement, html, css } from 'lit-element';
import { recipeTypes } from './recipe-types';

class RecipeTypeSelector extends LitElement {
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

        select {
          font-size: 1.5rem;
          margin-top: 0.25rem;
          padding: 0.25rem 0.5rem;
        }
      `,
    ];
  }

  static get properties() {
    return { value: { type: String } };
  }

  constructor() {
    super();
  }

  isSelected(type) {
    return this.value === (type && type.value);
  }

  render() {
    return html`
      <label>
        Type
        <select id="input">
          <option value="" ?selected=${this.isSelected()}>-- Select a type --</option>
          ${recipeTypes.map(
            type =>
              html`
                <option value="${type.value}" ?selected="${this.isSelected(type)}"
                  >${type.label}</option
                >
              `,
          )}
        </select>
      </label>
    `;
  }

  selectedValue() {
    return this.shadowRoot.getElementById('input').value;
  }
}

customElements.define('recipe-type-selector', RecipeTypeSelector);
