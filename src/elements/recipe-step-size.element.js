import { LitElement, html, css } from 'lit-element';

class RecipeStepSize extends LitElement {
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
    return { config: { type: Object }, model: { type: Object } };
  }

  onNav(e) {
    const prepInput = this.shadowRoot.getElementById('prep');
    const cookInput = this.shadowRoot.getElementById('cook');
    const servesInput = this.shadowRoot.getElementById('serves');
    this.dispatchEvent(
      new CustomEvent('updateAndGo', {
        bubbles: true,
        detail: {
          ...e.detail,
          updates: {
            prepTime: prepInput.inputValue(),
            cookTime: cookInput.inputValue(),
            serves: servesInput.inputValue(),
          },
        },
      }),
    );
  }

  render() {
    return html`
      <recipe-step
        class="step"
        .next="${this.config.next}"
        .previous="${this.config.previous}"
        heading="${this.model.name}"
        @nav="${this.onNav}"
      >
        <recipe-input
          class="input"
          id="prep"
          size="medium"
          placeholder="e.g. 60 min, 1.5 hours"
          .value="${this.model.prepTime}"
        >
          Preparation time
        </recipe-input>
        <recipe-input
          class="input"
          id="cook"
          size="medium"
          placeholder="e.g. 60 min, 1.5 hours"
          .value="${this.model.cookTime}"
        >
          Cook time
        </recipe-input>
        <recipe-input
          class="input"
          id="serves"
          size="medium"
          placeholder="e.g. Serves 6"
          .value="${this.model.serves}"
          ># of servings</recipe-input
        >
      </recipe-step>
    `;
  }
}

customElements.define('recipe-step-size', RecipeStepSize);
