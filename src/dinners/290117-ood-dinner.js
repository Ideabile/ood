var Mauro = require('./../attenders/MauroMandracchia'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu');

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);

var Dinner = new Meal({
  title: 'Hack your future OOP',
  date: '29/01/17',
  time: '20:30',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
module.exports = Dinner;
