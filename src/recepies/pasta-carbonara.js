var Carbonara;
module.exports = Carbonara = new Recepie({
  name: 'Pasta alla Carbonara',
  category: 'pasta-dish',
  composition: [
      new Recepie({name: 'spaghetti', category: 'pasta'}),
      new Manipulation({name: 'boiling'}),
      new Ingredient({name: 'bacon', category: 'meat', attributes: ['smoked', 'cubic']}),
      new Manipulation({name: 'cook', desc: 'light fried with butter'}),
      new Ingredient({name: 'parmesan', category: 'milk', attributes: ['chees']}),,
      new Manipulation({name: 'grind', desc: 'small cut'}),
      new Ingredient({name: 'eggs'}),
      new Manipulation({name: 'mix', desc: 'and add parmesan, and bacon when is cold'})
  ]
});
