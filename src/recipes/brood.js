var Vodka;
module.exports = Vodka = new Recipe({
  name: 'stukjes brood',
  category: 'brood',
  brand: 'Anyting I find',
  composition: [
      new Ingredient({name: 'brood'}),
      new Manipulation({name: 'stukjes'})
  ]
})