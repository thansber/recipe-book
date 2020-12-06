import { LitElement, html, css } from 'lit-element';

class RecipeStepDirections extends LitElement {
  static get styles() {
    return [
      css`
        :host {
        }

        #save {
          margin-left: 0.75rem;
        }
      `,
    ];
  }

  static get properties() {
    return { config: { type: Object }, model: { type: Object } };
  }

  directionsAsText() {
    return (this.model.directions || []).join('\n');
  }

  firstUpdated() {
    this.input = this.shadowRoot.getElementById('directions');
  }

  onNav(e) {
    this.dispatchEvent(
      new CustomEvent('updateAndGo', {
        bubbles: true,
        detail: {
          ...e.detail,
          updates: { directions: this.parseInput() },
        },
      }),
    );
  }

  parseInput() {
    return this.input
      .inputValue()
      .split('\n')
      .map(s => s.trim());
  }

  render() {
    return html`
      <recipe-step
        class="step"
        step="directions"
        .previous="${this.config.previous}"
        .heading="${this.model.name}"
        @nav="${this.onNav}"
      >
        <recipe-textarea
          id="directions"
          placeholder="Enter all directions, 1 per line"
          .value="${this.directionsAsText()}"
          >Directions</recipe-textarea
        >

        <recipe-button id="save" slot="add" class="add" @click="${this.save}">
          Save
        </recipe-button>
      </recipe-step>
    `;
  }

  save() {
    this.dispatchEvent(
      new CustomEvent('save', {
        bubbles: true,
        detail: {
          updates: { directions: this.parseInput() },
        },
      }),
    );
  }
}

customElements.define('recipe-step-directions', RecipeStepDirections);
