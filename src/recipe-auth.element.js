import { LitElement, html, css } from 'lit-element';
import { until } from 'lit-html/directives/until';

import firebase from 'firebase/app';

import './recipe-book.element';

class RecipeAuth extends LitElement {

  constructor() {
    super();
    this.user = { unknown: false };
  }

  static get styles() {
    return [
      css`
        :host {

        }
      `
    ];
  }

  static get properties() {
    return {};
  }

  render() {
    if (this.user.unknown) {
      return html`Checking authentication...`;
    }
    return html`
      <recipe-book></recipe-book>
    `;
  }
}

customElements.define('recipe-auth', RecipeAuth);
