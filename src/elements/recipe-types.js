export const recipeTypes = [
  { label: 'Appetizers', value: 'app' },
  { label: 'Desserts', value: 'dessert' },
  { label: 'Entrees', value: 'entree' },
  { label: 'Veggies', value: 'vegs' },
];

export const byValue = recipeTypes.reduce((o, type) => ({ ...o, [type.value]: type }), {});
