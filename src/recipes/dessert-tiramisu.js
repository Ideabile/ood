var Tiramisu;
module.exports = Tiramisu = new Recipe({
  name: 'Tiramisu\'',
  category: 'dessert',
  composition: [
      new Recipe({name: 'coffee', category: 'drink'}),
      new Ingredient({name: 'mascarpone', category: 'milk', attributes: ['chees', 'cream']}),
      new Manipulation({name: 'mix', desc: 'until it get softly'}),
      new Ingredient({name: 'eggs'}),
      new Manipulation({name: 'mix'}),
      new Ingredient({name: 'sugar', category: 'vegetable'}),
      new Manipulation({name: 'mix', desc: 'together mascarpone, eggs, and sugar'}),
      new Recipe({name: 'savoiardi', category: 'biscuit'}),
      new Manipulation({name: 'wet', desc: 'lightly with coffee'}),
      new Recipe({name: 'choccolate', category: 'vegetable', attributes: ['small cut']}),
      new Manipulation({name: 'distribuite', desc: 'in layers with order: mascarpone cream, savoiardi,  '}),
      new Manipulation({name: 'rest', desc: 'in the frige, for two hours'})
  ]
});
