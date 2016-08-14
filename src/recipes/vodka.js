var Vodka;
module.exports = Vodka = new Recipe({
  name: 'Bottle of Vodka',
  category: 'Drinks',
  brand: 'Anyting I find',
  composition: [
      new Ingredient({name: 'Alcohol'}),
      new Manipulation({name: 'Bottle of Vodka'})
  ]
})