var Mauro = require('./../attenders/MauroMandracchia'),
    somur = require('./../attenders/somur'),
    Mohanad = require('./../attenders/MohanadMjawaz'),
    Ali = require('./../attenders/AliAtrash'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    Vodka = require('./../recipes/vodka'),
    Patat = require('./../recipes/patat'),
    brood = require('./../recipes/brood'),
    ;

Mohanad.brings(Patat);
Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
Ali.brings([Vodka]);
somur.brings([brood]); 

var Dinner = new Meal({
  title: 'Hack your future OOP',
  date: '14/08/2015',
  time: '13:00',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addGuest( Mohanad );
Dinner.addGuest( Ali );
Dinner.addGuest( somur );

module.exports = Dinner;
