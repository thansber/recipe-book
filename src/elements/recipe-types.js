export const recipeTypes = [
  { label: 'Appetizers', value: 'apps' },
  { label: 'Entrees', value: 'meat' },
  { label: 'Veggies', value: 'vegs' },
];

export const byValue = recipeTypes.reduce((o, type) => ({ ...o, [type.value]: type }), {});
