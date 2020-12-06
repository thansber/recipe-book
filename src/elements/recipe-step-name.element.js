import { LitElement, html, css } from 'lit-element';

class RecipeStepName extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }

        .input {
          margin-bottom: 1.5rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      config: { type: Object },
      model: { type: Object },
    };
  }

  constructor() {
    super();
  }

  applyFocus() {
    this.nameInput.applyFocus();
  }

  firstUpdated() {
    this.nameInput = this.shadowRoot.getElementById('name');
    this.typeSelector = this.shadowRoot.getElementById('type');
  }

  onNav(e) {
    this.dispatchEvent(
      new CustomEvent('updateAndGo', {
        bubbles: true,
        detail: {
          ...e.detail,
          updates: {
            name: this.nameInput.inputValue(),
            type: this.typeSelector.selectedValue(),
          },
        },
      }),
    );
  }

  render() {
    return html`
      <recipe-step
        step="name"
        .next="${this.config.next}"
        heading="Add a new recipe"
        @nav="${this.onNav}"
      >
        <recipe-input class="input" id="name" .value="${this.model.name}">Name</recipe-input>

        <recipe-type-selector id="type" .value="${this.model.type}"></recipe-type-selector>
      </recipe-step>
    `;
  }
}

customElements.define('recipe-step-name', RecipeStepName);
