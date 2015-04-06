var LeffeBeer;
module.exports = LeffeBeer = new Recipe({
  name: 'Leffe',
  category: 'beer',
  brand: 'Leffe', composition: [
      new Ingredient({name: 'water'}),
      new Ingredient({name: 'malt'}),
      new Ingredient({name: 'hops'}),
  ]
});
