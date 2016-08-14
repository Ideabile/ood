var Mauro = require('./../attenders/MauroMandracchia'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    Pasta_Tuna_Sauce = require('./../recipes/Pasta With Tuna Sauce');

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);

var Dinner = new Meal({
  title: 'Hack your future OOP',
  date: '14/08/2015',
  time: '13:00',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addOwner( Wael );
Dinner.addGuest( Mohammed );

module.exports = Dinner;
