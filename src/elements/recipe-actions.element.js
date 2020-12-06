import { LitElement, html, css } from 'lit-element';

import { icons } from '../icons';

class RecipeActions extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          bottom: 1rem;
          position: absolute;
          right: 1rem;
        }

        .action {
          margin-top: 1rem;
        }

        #new-recipe {
          --recipe-button-bg-color: var(--recipe-action);
        }

        #new-recipe:hover {
          --recipe-button-active-bg-color: var(--recipe-action-active);
        }

        #edit-recipe {
          display: none;
          --recipe-button-bg-color: var(--recipe-loud);
          --receipe-button-color: var(--recipe-dark);
        }

        #edit-recipe:hover {
          --recipe-button-active-bg-color: var(--recipe-loud-active);
        }

        :host([show-edit]) #edit-recipe {
          display: block;
        }

        #remove-recipe {
          display: none;
          --recipe-button-bg-color: var(--recipe-loud);
          --receipe-button-color: var(--recipe-negate);
        }

        #remove-recipe:hover {
          --recipe-button-active-bg-color: var(--recipe-loud-active);
        }

        :host([show-remove]) #remove-recipe {
          display: block;
        }
      `,
    ];
  }

  static get properties() {
    return {
      showEdit: { type: Boolean, attribute: 'show-edit', reflect: true },
      showRemove: { type: Boolean, attribute: 'show-remove', reflect: true },
    };
  }

  addRecipe() {
    this.dispatchEvent(new Event('addRecipe'));
  }

  editRecipe() {
    this.dispatchEvent(new Event('editRecipe'));
  }

  removeRecipe() {
    this.dispatchEvent(new Event('removeRecipe'));
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
        id="edit-recipe"
        class="action"
        title="Modify this recipe"
        @click="${this.editRecipe}"
      >
        ${icons.edit}
      </recipe-button>

      <recipe-button
        id="new-recipe"
        class="action"
        title="Add a new recipe"
        @click="${this.addRecipe}"
      >
        ${icons.plus}
      </recipe-button>
    `;
  }
}

customElements.define('recipe-actions', RecipeActions);
