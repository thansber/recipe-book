const rootKey = '_RECIPES_';
const props = [{ name: 'recipes', initialValue: [] }];
let recipeId = 0;

const read = () => JSON.parse(localStorage.getItem(rootKey) || '{}');

const write = changes => {
  localStorage.setItem(rootKey, JSON.stringify({ ...read(), ...changes }));
};

const initialize = () => {
  const data = read();
  props.forEach(prop => {
    if (data[prop.name] === undefined) {
      data[prop.name] = prop.initialValue;
    }
  });

  if (data.recipes.length) {
    recipeId = data.recipes[data.recipes.length - 1].id;
  } else {
    recipeId = 0;
  }

  write(data);
};

const addRecipe = recipe => {
  const recipes = read().recipes;
  write({
    recipes: [...recipes, { ...recipe, id: ++recipeId }],
  });
};

const removeRecipe = id => {
  const stored = read().recipes;
  const recipes = stored.filter(s => `${s.id}` !== id);
  write({ recipes });
};

const saveRecipe = recipe => {
  if (recipe.id) {
    updateRecipe(recipe);
  } else {
    addRecipe(recipe);
  }
};

const updateRecipe = recipe => {
  const stored = read().recipes;
  const recipes = stored.map(s => (s.id !== recipe.id ? s : { ...s, ...recipe }));
  write({ recipes });
};

export const IO = {
  initialize,
  read,
  removeRecipe,
  saveRecipe,
};
