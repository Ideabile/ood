var Mauro = require('./../attenders/MauroMandracchia'),
    Mohanad = require('./../attenders/MohanadMjawaz'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu');
    Patat = require('./../recipes/patat'),
Mohanad.brings(Patat);
Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);

var Dinner = new Meal({
  title: 'Hack your future OOP',
  date: '14/08/2015',
  time: '13:00',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addGuest( Mohanad );

module.exports = Dinner;
