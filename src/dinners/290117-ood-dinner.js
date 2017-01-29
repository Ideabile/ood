var Mauro = require('./../attenders/MauroMandracchia'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    chips = require('./../recipes/chips'),
    Saad = = require('./../attenders/SaadHasan') ;

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
Saad.brings([ chips ]);

var Dinner = new Meal({
  title: 'Hack your future OOP',
  date: '29/01/17',
  time: '20:30',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addGuest( Saad );
module.exports = Dinner;
