var BeefWithVegetables;
module.exports = BeefWithVegetables = new Recipe({
  name: 'Beef with vegetables',
  category: 'beef-dish',
  composition: [
      new Ingredient({name: 'beef', category: 'meat', attributes: ['regular']}),
      new Manipulation({name: 'cook', desc: 'grill on the pen with a little bit of oil until the first crust'}),
      new Manipulation({name: 'cook', desc: 'rollover'}),
      new Manipulation({name: 'cook', desc: 'one more time - another side'}),
      new Ingredient({name: 'cucumber', category: 'vegetable', attributes: ['fresh']}),
      new Ingredient({name: 'salad', category: 'grass', attributes: ['fresh']}),
      new Manipulation({name: 'slice', desc: 'medium cut'}),
      new Manipulation({name: 'mix', desc: 'everything in a big plate'})
  ]
});
