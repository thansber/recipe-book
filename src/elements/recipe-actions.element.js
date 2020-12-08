import { LitElement, html, css } from 'lit-element';

import { icons } from '../icons';

class RecipeActions extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
        }

        .action {
          margin-left: 0.75rem;
        }

        #remove-recipe {
          --receipe-button-color: var(--recipe-negate);
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
    return {};
  }

  editRecipe() {
    this.dispatchEvent(new Event('editRecipe', { bubbles: true, composed: true }));
  }

  print() {
    window.print();
  }

  removeRecipe() {
    this.dispatchEvent(new Event('removeRecipe', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <recipe-button
        id="remove-recipe"
        class="action"
        title="Delete this recipe"
        @click="${this.removeRecipe}"
      >
        ${icons.trash}
      </recipe-button>

      <recipe-button
        id="print-recipe"
        class="action"
        title="Print this recipe"
        @click="${this.print}"
      >
        ${icons.print}
      </recipe-button>

      <recipe-button
        id="edit-recipe"
        class="action"
        title="Modify this recipe"
        @click="${this.editRecipe}"
      >
        ${icons.edit}
      </recipe-button>
    `;
  }
}

customElements.define('recipe-actions', RecipeActions);
