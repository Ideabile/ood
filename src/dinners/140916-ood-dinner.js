var Mauro = require('./../attenders/MauroMandracchia'),
    Mohanad = require('./../attenders/MohanadMjawaz'),
    Ali = require('./../attenders/AliAtrash'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    Patat = require('./../recipes/patat'),
    SoftDrinks = require('./../recipes/wine');
Mohanad.brings(Patat);
Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
Ali.brings([Vodka]);
Bashar.brings([SoftDrinks]);

var Dinner = new Meal({
  title: 'Hack your future OOP',
  date: '14/08/2015',
  time: '13:00',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addGuest( Mohanad );
Dinner.addGuest( Ali );
Dinner.addGuest(Bashar);
module.exports = Dinner;
