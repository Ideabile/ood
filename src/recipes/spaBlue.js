var SpaBlue;
module.exports = SpaBlue = new Recipe({
  name: 'Bottle of Spa Still Water',
  category: 'Drinks',
  brand: 'Spa',
  composition: [
      new Ingredient({name: 'Simply Water'}),
      new Manipulation({name: 'Bottle of Water'})
  ]
});