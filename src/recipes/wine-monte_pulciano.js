var MontePulcianoWine;
module.exports = MontePulcianoWine = new Recipe({
  name: 'Monte Pulciano Wine',
  category: 'wine',
  brand: 'Santa Cristina', composition: [
      new Ingredient({name: 'grape'}),
      new Manipulation({name: 'fermentation'})
  ]
});
