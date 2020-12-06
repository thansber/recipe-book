import { LitElement, html, css } from 'lit-element';

class RecipeDetails extends LitElement {
  constructor() {
    super();
    this.recipe = {};
  }

  static get styles() {
    return [
      css`
        :host {
          display: none;
          flex-direction: column;
          padding: 1rem 2rem;
        }

        :host([show]) {
          display: block;
        }

        h2 {
          font-size: 125%;
        }

        section {
          flex: 1;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          margin-bottom: 0.5rem;
          min-height: 1rem;
        }

        li .label {
          display: inline-block;
          width: 10rem;
        }

        #ingredients,
        #directions {
          margin-top: 2.5rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      recipe: { type: Object },
    };
  }

  render() {
    return html`
      <h1>${this.recipe.name}</h1>

      <section id="sizing">
        <ul>
          ${this.renderServes()} ${this.renderPrepTime()} ${this.renderCookTime()}
        </ul>
      </section>

      <section id="ingredients">
        <h2>Ingredients</h2>
        <ul>
          ${(this.recipe.ingredients || []).map(
            ingredient =>
              html`
                <li>${ingredient}</li>
              `,
          )}
        </ul>
      </section>

      <section id="directions">
        <h2>Directions</h2>
        <ul>
          ${(this.recipe.directions || []).map(
            direction =>
              html`
                <li>${direction}</li>
              `,
          )}
        </ul>
      </section>
    `;
  }

  renderCookTime() {
    if (this.recipe.cookTime) {
      return html`
        <li>
          <span class="label">Cook Time</span>
          <span class="value">${this.recipe.cookTime}</span>
        </li>
      `;
    }
  }

  renderPrepTime() {
    if (this.recipe.prepTime) {
      return html`
        <li>
          <span class="label">Preparation Time</span>
          <span class="value">${this.recipe.prepTime}</span>
        </li>
      `;
    }
  }

  renderServes() {
    if (this.recipe.serves) {
      return html`
        <li>
          ${this.recipe.serves}
        </li>
      `;
    }
  }
}

customElements.define('recipe-details', RecipeDetails);
