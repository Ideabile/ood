var Pretzel;
module.exports = Pretzel = new Recipe({
  name: 'Salty sticks',
  category: 'Snack',
  brand: 'No clue',
  composition: [
      new Ingredient({name: 'Stick'}),
      new Ingredient({name: 'Salt'}),
      new Manipulation({name: 'Salt on the stick'})
  ]
});