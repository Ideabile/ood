ar GreenSalad;
module.exports =GreenSalad = new Recipe({
  name: 'salad',
  category: 'vegetarin',
  composition: [
      new Ingredient({name: 'tomato', category: 'vegetable', attributes: ['fresh']}),
      new Ingredient({name: 'cucumber', category: 'vegetable', attributes: ['fresh']}),
      new Ingredient({name: 'lettuce', category: 'vegetable', attributes: ['fresh']}),
      new Manipulation({name: 'slice', desc: 'medium cut'}),
      new Manipulation({name: 'mix', desc: 'everything in a big plate'})
  ];
  
