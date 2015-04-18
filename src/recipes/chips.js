var Chips;
module.exports = Chips = new Recipe({
  name: 'Bag of Chips',
  category: 'Snack',
  brand: 'Lays is the best',
  composition: [
      new Ingredient({name: 'Salty'}),
      new Ingredient({name: 'Natural'}),
      new Manipulation({name: 'Lays natural chips'})
  ]
});