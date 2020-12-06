import { LitElement, html, css } from 'lit-element';

import { icons } from '../icons';

class RecipeStep extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }

        header {
          display: flex;
          justify-content: space-between;
          margin: 0 0 2rem 0;
        }

        h1 {
          font-weight: normal;
          margin: 0;
        }

        #close {
          background-color: transparent;
          border: none;
          color: var(--recipe-light);
          cursor: pointer;
        }

        footer {
          align-items: center;
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }

        nav {
          display: flex;
          flex: 1;
          justify-content: flex-end;
        }

        nav recipe-button {
          margin-left: 0.75rem;
        }
      `,
    ];
  }

  static get properties() {
    return {
      heading: { type: String },
      next: { type: String },
      previous: { type: String },
      step: { type: String },
    };
  }

  close() {
    this.dispatchEvent(new Event('closeInput', { bubbles: true, composed: true }));
  }

  go(direction) {
    this.dispatchEvent(
      new CustomEvent('nav', {
        bubbles: true,
        composed: true,
        detail: { step: this.step, direction },
      }),
    );
  }

  nextButton() {
    if (this.next) {
      return html`
        <recipe-button id="next" class="primary" @click="${_ => this.go(1)}">
          ${this.next} ${icons.chevron_right}
        </recipe-button>
      `;
    }
  }

  previousButton() {
    if (this.previous) {
      return html`
        <recipe-button id="prev" @click="${_ => this.go(-1)}">
          ${icons.chevron_left} ${this.previous}
        </recipe-button>
      `;
    }
  }

  render() {
    return html`
      <header>
        <h1>${this.heading}</h1>
        <button id="close" @click="${this.close}">${icons.close}</button>
      </header>
      <slot></slot>
      <footer>
        <nav>${this.previousButton()} ${this.nextButton()} <slot name="add"></slot></nav>
      </footer>
    `;
  }
}

customElements.define('recipe-step', RecipeStep);
