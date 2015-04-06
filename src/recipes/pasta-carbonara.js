var Carbonara;
module.exports = Carbonara = new Recipe({
  name: 'Pasta alla Carbonara',
  category: 'pasta-dish',
  composition: [
      new Recipe({name: 'spaghetti', category: 'pasta'}),
      new Manipulation({name: 'boiling'}),
      new Ingredient({name: 'bacon', category: 'meat', attributes: ['smoked', 'cubic']}),
      new Manipulation({name: 'cook', desc: 'light fried with butter'}),
      new Ingredient({name: 'parmesan', category: 'milk', attributes: ['cheese']}),,
      new Manipulation({name: 'grind', desc: 'small cut'}),
      new Ingredient({name: 'eggs'}),
      new Manipulation({name: 'mix', desc: 'and add parmesan, and bacon when it is cold'})
  ]
});
