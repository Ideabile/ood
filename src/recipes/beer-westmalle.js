var WestmalleBeer;
module.exports = WestmalleBeer = new Recipe({
  name: 'Westmalle',
  category: 'beer',
  brand: 'Westmalle', composition: [
      new Ingredient({name: 'water'}),
      new Ingredient({name: 'malt'}),
      new Ingredient({name: 'hops'}),
  ]
});
