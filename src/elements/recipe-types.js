export const recipeTypes = [
  { label: 'Appetizers', value: 'app' },
  { label: 'Desserts', value: 'dessert' },
  { label: 'Drinks', value: 'drink' },
  { label: 'Main Dishes', value: 'entree' },
  { label: 'Sauces', value: 'sauce' },
  { label: 'Side Dishes', value: 'side' },
  { label: 'Soups, Stews & Chili', value: 'soup' },
  { label: 'Veggies', value: 'vegs' },
];

export const byValue = recipeTypes.reduce((o, type) => ({ ...o, [type.value]: type }), {});
