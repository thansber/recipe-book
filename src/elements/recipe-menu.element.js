import { LitElement, html, css } from 'lit-element';
import { byValue } from './recipe-types';

class RecipeMenu extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          border-right: 1px solid var(--recipe-light);
          display: block;
          min-height: 100vh;
          padding: 1rem;
          width: 12rem;
        }

        h3 {
          margin: 1rem 0;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          cursor: pointer;
          padding: 0.25rem 0;
        }

        li.all {
          margin-top: 1rem;
        }

        li:hover {
          color: var(--recipe-action);
        }
      `,
      css`
        @media print {
          :host {
            display: none;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      recipes: { type: Array },
    };
  }

  filterByType(e) {
    const { target } = e;
    const typeElem = target.closest('li');
    if (typeElem) {
      const { type } = typeElem.dataset;
      this.dispatchEvent(new CustomEvent('filterByType', { detail: { type: byValue[type] } }));
    }
  }

  render() {
    return html`
      <h3>Recipes by type</h3>
      <ul @click="${this.filterByType}">
        ${this.typesFromRecipes().map(
          type =>
            html`
              <li data-type="${type.value}">${type.label}</li>
            `,
        )}
        <li data-type="" class="all">All Recipes</li>
      </ul>
    `;
  }

  sortTypes(typeA, typeB) {
    return typeA.label.localeCompare(typeB.label, 'en', { sensitivity: 'base' });
  }

  typesFromRecipes() {
    return Array.from(new Set(this.recipes.map(recipe => recipe.type)))
      .map(type => byValue[type])
      .sort(this.sortTypes);
  }
}

customElements.define('recipe-menu', RecipeMenu);
