var Chips;
module.exports = Kabak = new Recipe({
  name: 'Kabab',
  category: 'Meat',
  brand: 'Traditional',
  composition: [
      new Ingredient({name: 'Meat'}),
      new Ingredient({name: 'salt'}),
      new Manipulation({name: 'Do it on grill'})
  ]
});