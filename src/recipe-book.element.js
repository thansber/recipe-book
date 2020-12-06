import { LitElement, html, css } from 'lit-element';

import './elements';
import { IO } from './io';

class RecipeBook extends LitElement {
  constructor() {
    super();

    IO.initialize();
    this.inputOpen = false;
    this.refresh();
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
        }

        recipe-inputs {
          display: none;
        }

        recipe-inputs[open] {
          display: flex;
        }
      `,
    ];
  }

  static get properties() {
    return {
      currentRecipeId: { type: String },
      data: { type: Object },
      inputOpen: { type: Boolean },
      recipe: { type: Object },
      recipeForInput: { typ: Object },
      recipes: { type: Array },
      recipeType: { type: String },
    };
  }

  findRecipe(id) {
    return this.data.recipes.find(recipe => `${recipe.id}` === id);
  }

  firstUpdated() {
    this.inputs = this.shadowRoot.getElementById('inputs');
  }

  isViewingRecipe() {
    return !!this.currentRecipeId;
  }

  onCloseInput() {
    this.setInputOpen(false);
  }

  onEditRecipe() {
    this.recipeForInput = { ...this.recipe };
    this.setInputOpen(true);
  }

  onFilterByType(e) {
    const { type } = e.detail;
    this.recipeType = type ? type.label : 'All Recipes';
    this.recipes = type
      ? this.data.recipes.filter(recipe => recipe.type === type.value)
      : [...this.data.recipes];
    this.setRecipe(undefined);
  }

  onRemoveRecipe() {
    IO.removeRecipe(this.currentRecipeId);
    this.setRecipe(undefined);
    this.refresh();
  }

  onSaveRecipe(e) {
    const { recipe } = e.detail;
    IO.saveRecipe(recipe);
    this.refresh();
    this.setInputOpen(false);
  }

  onStartAddRecipe() {
    this.recipeForInput = {};
    this.setInputOpen(true);
    setTimeout(() => this.inputs.applyFocus(), 0);
  }

  onViewRecipe(e) {
    const { recipeId } = e.detail;
    this.setRecipe(recipeId);
  }

  refresh() {
    this.data = IO.read();
    this.recipes = [...this.data.recipes];
  }

  render() {
    return html`
      <recipe-menu
        .recipes="${this.data.recipes}"
        @filterByType="${this.onFilterByType}"
      ></recipe-menu>

      <recipe-list
        id="list"
        ?show="${!this.isViewingRecipe()}"
        .recipes="${this.recipes}"
        .recipeType="${this.recipeType}"
        @viewRecipe="${this.onViewRecipe}"
      ></recipe-list>

      <recipe-details
        id="details"
        ?show="${this.isViewingRecipe()}"
        .recipe="${this.recipe || {}}"
      ></recipe-details>

      <recipe-inputs
        id="inputs"
        ?open="${this.inputOpen}"
        .model="${this.recipeForInput || {}}"
        @saveRecipe="${this.onSaveRecipe}"
        @closeInput="${this.onCloseInput}"
      ></recipe-inputs>

      <recipe-actions
        ?show-edit="${this.isViewingRecipe()}"
        ?show-remove="${this.isViewingRecipe()}"
        @addRecipe="${this.onStartAddRecipe}"
        @editRecipe="${this.onEditRecipe}"
        @removeRecipe="${this.onRemoveRecipe}"
      ></recipe-actions>
    `;
  }

  setRecipe(id) {
    this.currentRecipeId = id;
    this.recipe = this.findRecipe(this.currentRecipeId);
  }

  setInputOpen(open) {
    this.inputOpen = open;
  }
}

customElements.define('recipe-book', RecipeBook);
