var FrenchRedWine;
module.exports = FrenchRedWine = new Recipe({
  name: 'Something from France',
  category: 'wine',
  brand: 'cru acceptable', composition: [
      new Ingredient({name: 'red wine'}),
      new Manipulation({name: 'open it, drink it'})
  ]
});