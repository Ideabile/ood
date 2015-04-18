var Wine;
module.exports = Wine = new Recipe({
  name: 'Bottle of Wine',
  category: 'Drinks',
  brand: 'No clue',
  composition: [
      new Ingredient({name: 'Alcohol'}),
      new Manipulation({name: 'Bottle of Wine'})
  ]
});