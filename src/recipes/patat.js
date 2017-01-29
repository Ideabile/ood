var Patat;
module.exports = Patat = new Recipe({
  name: 'Bag of Patat',
  category: 'Snack',
  brand: 'Natural',
  composition: [
      new Ingredient({name: 'Salty'}),
      new Ingredient({name: 'Oily'}),
      new Manipulation({name: 'natural Patat'})
  ]
});