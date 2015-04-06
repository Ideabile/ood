var DuvelBeer;
module.exports = DuvelBeer = new Recipe({
  name: 'Duvel',
  category: 'beer',
  brand: 'Duvel', composition: [
      new Ingredient({name: 'water'}),
      new Ingredient({name: 'malt'}),
      new Ingredient({name: 'hops'}),
  ]
});
