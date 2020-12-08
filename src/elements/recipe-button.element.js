import { LitElement, html, css } from 'lit-element';

class RecipeButton extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        button {
          align-items: center;
          background-color: var(--recipe-button-bg-color, var(--recipe-button));
          border: 0;
          border-radius: 0.25rem;
          color: var(--receipe-button-color, var(--recipe-light));
          cursor: pointer;
          display: flex;
          font-size: 1.25rem;
          justify-content: center;
          padding: var(--recipe-button-padding, 0.25rem 0.5rem);
        }

        button:hover {
          background-color: var(--recipe-button-active-bg-color, var(--recipe-button-active));
        }

        :host(.primary) button {
          background-color: var(--recipe-loud);
          color: var(--recipe-dark);
        }

        :host(.primary) button:hover {
          background-color: var(--recipe-loud-active);
        }

        :host(.add) button {
          background-color: var(--recipe-create);
        }

        :host(.add) button:hover {
          background-color: var(--recipe-create-active);
        }

        :host(.large) button {
          border-radius: 99rem;
          height: 3.5rem;
          width: 3.5rem;
        }

        :host(.action) button {
          height: 2.5rem;
          width: 2.5rem;
        }
      `,
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    return html`
      <button><slot></slot></button>
    `;
  }
}

customElements.define('recipe-button', RecipeButton);
