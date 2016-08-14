var Pasta_Tuna_Sauce;
module.exports = Pasta_Tuna_Sauce = new Recipe({
  name: 'Pasta With Tuna_Sauce',
  category: 'pasta-dish',
  composition: [
      new Recipe({name: 'spaghetti', category: 'pasta'}),
      new Manipulation({name: 'boiled'}),
      
      new Ingredient({name: 'Tuna', category: 'fish', attributes: ['Caned']}),
      new Manipulation({name: 'cook', desc: 'Cooked with Olive Oil'}),
      
      new Ingredient({name: 'Sea Salt', category: 'Spicies', attributes: ['Grated']}),
      new Ingredient({name: 'black pepper', category: 'Spicies', attributes: ['Grated']}),
      new Manipulation({name: 'grind', desc: 'as much as you need'}),
      
      new Ingredient({name: 'parmesan', category: 'milk', attributes: ['cheese']}),,
      new Manipulation({name: 'grind', desc: 'small cut'}),
      
      new Ingredient({name: 'Tommato Sauce'}),
      new Manipulation({name: 'mix', desc: 'and add Garlic, and Tommato when it is cooked add Tuna and the Basil'})
  ]
});