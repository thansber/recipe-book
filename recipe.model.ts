export interface Ingredient {
  amountNum: number;
  amountDen: number;
  amountUom: string; // make this an enum?
  name: string;
  extra?: string; // extra instructions; e.g. minced/chopped/etc
}

export interface Direction {
  step: string;
}

export interface Item {
  name?: string;
  ingredients: Ingredient[];
  directions: Direction[];
}

export interface Recipe {
  id: string;
  name: string;
  prepTime?: number; // minutes
  cookTime?: number; // minutes
  serves?: string; // servings
  type?: string[]; // type of recipe, used for classification
  tags?: string[]; // used for searching
  item: Item[]; // ingredients + directions, in case of a recipe taking >1 things e.g. main + sauce
}