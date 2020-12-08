import { LitElement, html, css } from 'lit-element';

import { icons } from '../icons';

class RecipeRemoveConfirm extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          align-items: center;
          background-color: black;
          bottom: 0;
          display: none;
          flex: 1;
          justify-content: center;
          left: 0;
          position: fixed;
          right: 0;
          top: 0;
          z-index: 1;
        }

        :host([open]) {
          display: flex;
        }

        #heading {
          display: flex;
          justify-content: space-between;
          margin: 0 0 2rem 0;
        }

        h1 {
          font-weight: normal;
          margin: 0;
        }

        main {
          background-color: rgb(43, 43, 43);
          border-radius: 0.25rem;
          padding: 1rem;
          width: 80vw;
        }

        #close {
          background-color: transparent;
          border: none;
          color: var(--recipe-light);
          cursor: pointer;
        }

        #footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        #confirm {
          --recipe-button-bg-color: var(--recipe-create);
          --recipe-button-active-bg-color: var(--recipe-create-active);
        }

        .action {
          --recipe-button-padding: 0.25rem 2rem;
          margin-left: 1rem;
        }
      `,
    ];
  }

  static get properties() {
    return { recipe: { type: Object } };
  }

  close() {
    this.dispatchEvent(new Event('closeConfirm'));
  }

  confirmRemove() {
    this.dispatchEvent(new Event('removeConfirm'));
  }

  recipeName() {
    return (this.recipe || {}).name;
  }

  render() {
    return html`
      <main>
        <section id="heading">
          <h1>${this.recipeName()}</h1>
          <button id="close" @click="${this.close}">${icons.close}</button>
        </section>
        Are you sure you want to remove this recipe?
        <section id="footer">
          <recipe-button class="action" @click="${this.close}"><span>No</span></recipe-button>
          <recipe-button class="action" id="confirm" @click="${this.confirmRemove}"
            ><span>Yes</span></recipe-button
          >
        </section>
      </main>
    `;
  }
}

customElements.define('recipe-remove-confirm', RecipeRemoveConfirm);
