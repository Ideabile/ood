var WhiteWine;
module.exports = WhiteWine = new Recipe({
  name: 'Less Red More White',
  category: 'wine',
  brand: 'something tasty', composition: [
      new Ingredient({name: 'white wine'}),
      new Manipulation({name: 'enjoy with friends'})
  ]
});
