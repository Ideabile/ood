var Mauro = require('./../attenders/MauroMandracchia'),
  AbdulRahman = require('./../attenders/AbdulRahman'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    Beef-vegetables = require('./../recipes/beef-with-vegetables'),
    Chips = require('./../recipes/chips');

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
AbdulRahman.brings([Beef-vegetables, Chips]);

var Dinner = new Meal({
  title: 'Hack your future OOP',
  date: '29/01/17',
  time: '20:30',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addGuest( AbdulRahman );
module.exports = Dinner;
