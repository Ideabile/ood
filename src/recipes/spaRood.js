var SpaRood;
module.exports = SpaRood = new Recipe({
  name: 'Bottle of Spa Sparkling Water',
  category: 'Drinks',
  brand: 'Spa',
  composition: [
      new Ingredient({name: 'Sparkling Water'}),
      new Manipulation({name: 'Bottle of Sparkling Water'})
  ]
});