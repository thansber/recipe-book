import { LitElement, html, css } from 'lit-element';

class RecipeInputs extends LitElement {
  constructor() {
    super();

    this.stepConfig = {
      name: { next: 'Size' },
      size: { next: 'Ingredients', previous: 'Name' },
      ingredients: { next: 'Directions', previous: 'Size' },
      directions: { previous: 'Ingredients' },
    };
    this.reset();
  }

  static get styles() {
    return [
      css`
        :host {
          align-items: center;
          background-color: black;
          bottom: 0;
          flex: 1;
          justify-content: center;
          left: 0;
          position: fixed;
          right: 0;
          top: 0;
        }

        header {
        }

        main {
          background-color: rgb(43, 43, 43);
          border-radius: 0.25rem;
          padding: 1rem;
          width: 80vw;
        }

        .input {
          margin-bottom: 1.5rem;
        }

        .step {
          display: none;
        }

        .step.current {
          display: flex;
          flex-direction: column;
        }
      `,
    ];
  }

  static get properties() {
    return {
      model: { type: Object },
      stepIndex: { type: Number },
    };
  }

  applyFocus() {
    this.steps[0].applyFocus();
  }

  close() {
    this.reset();
    this.dispatchEvent(new Event('closeInput', { bubbles: true, composed: true }));
  }

  firstUpdated() {
    this.steps = Array.from(this.shadowRoot.querySelectorAll('.step'));
  }

  nav(e) {
    const { direction, updates } = e.detail;
    this.updateModel(updates);
    this.stepIndex += direction;
  }

  onClose() {
    this.reset();
  }

  onSave(e) {
    const { updates } = e.detail;
    this.updateModel(updates);
    this.dispatchEvent(new CustomEvent('saveRecipe', { detail: { recipe: this.model } }));
    this.reset();
  }

  recipeName() {
    return this.model.name || '';
  }

  render() {
    return html`
      <main @updateAndGo="${this.nav}" @closeInput="${this.onClose}" @save="${this.onSave}">
        <recipe-step-name
          class="step"
          .config="${this.stepConfig.name}"
          .model="${this.model}"
        ></recipe-step-name>

        <recipe-step-size
          class="step"
          .config="${this.stepConfig.size}"
          .model="${this.model}"
        ></recipe-step-size>

        <recipe-step-ingredients
          class="step"
          .config="${this.stepConfig.ingredients}"
          .model="${this.model}"
        ></recipe-step-ingredients>

        <recipe-step-directions
          class="step"
          .config="${this.stepConfig.directions}"
          .model="${this.model}"
        ></recipe-step-directions>
      </main>
    `;
  }

  reset() {
    this.stepIndex = 0;
    this.model = {
      directions: [],
      ingredients: [],
    };
  }

  setCurrentStep() {
    this.steps.forEach((step, i) => {
      step.classList.toggle('current', i === this.stepIndex);
    });
  }

  updated(changed) {
    if (changed.has('stepIndex')) {
      this.setCurrentStep();
    }
  }

  updateModel(updates) {
    this.model = {
      ...this.model,
      ...updates,
    };
  }
}

customElements.define('recipe-inputs', RecipeInputs);
