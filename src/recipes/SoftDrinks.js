var SoftDrinks;
module.exports = SoftDrinks = new Recipe({
  name: 'Cola , juice',
  category: 'Drinks',
  composition: [
      new Ingredient({name: 'sugar', category: 'sweet', attributes: ['regular']}),
      new Manipulation({name: 'ice', desc: 'just freeze'}),
      
  ]
});