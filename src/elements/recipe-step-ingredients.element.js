import { LitElement, html, css } from 'lit-element';

class RecipeStepIngredients extends LitElement {
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

  firstUpdated() {
    this.input = this.shadowRoot.getElementById('ingredients');
  }

  ingredientsAsText() {
    return (this.model.ingredients || []).join('\n');
  }

  onNav(e) {
    this.dispatchEvent(
      new CustomEvent('updateAndGo', {
        bubbles: true,
        detail: {
          ...e.detail,
          updates: { ingredients: this.parseInput() },
        },
      }),
    );
  }

  parseInput() {
    return this.input
      .inputValue()
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);
  }

  render() {
    return html`
      <recipe-step
        class="step"
        step="ingredients"
        .next="${this.config.next}"
        .previous="${this.config.previous}"
        heading="${this.model.name}"
        @nav="${this.onNav}"
      >
        <recipe-textarea
          id="ingredients"
          placeholder="Enter all ingredients, 1 per line"
          .value="${this.ingredientsAsText()}"
          >Ingredients</recipe-textarea
        >
      </recipe-step>
    `;
  }
}

customElements.define('recipe-step-ingredients', RecipeStepIngredients);
