import { LitElement, html, css } from 'lit-element';

class RecipeList extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: none;
          margin: 0.75rem 2rem;
        }

        :host([show]) {
          display: block;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          cursor: pointer;
          font-size: 125%;
          padding: 0.25rem 0;
        }

        li:hover {
          color: var(--recipe-action);
        }
      `,
    ];
  }

  static get properties() {
    return {
      recipes: { type: Array },
      recipeType: { type: String },
      show: { type: Boolean, reflect: true },
    };
  }

  render() {
    return html`
      <h2>${this.recipeType || 'All Recipes'}</h2>
      <ul @click="${this.toRecipe}">
        ${this.recipes.sort(this.sortRecipesByName).map(
          recipe =>
            html`
              <li data-recipe-id="${recipe.id}">${recipe.name}</li>
            `,
        )}
      </ul>
    `;
  }

  sortRecipesByName(recipeA, recipeB) {
    return recipeA.name.localeCompare(recipeB.name, 'en', { sensitivity: 'base' });
  }

  toRecipe(e) {
    const { target } = e;
    const recipe = target.closest('li');
    if (recipe) {
      const { recipeId } = recipe.dataset;
      this.dispatchEvent(
        new CustomEvent('viewRecipe', {
          detail: { recipeId },
        }),
      );
    }
  }
}

customElements.define('recipe-list', RecipeList);
