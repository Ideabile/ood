var Mauro = require('./../attenders/MauroMandracchia'),
    Malek = require('./../attenders/MalekSheikhAlArd'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu');

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
Malek.brings([ Hummos, MoreHummos, Fatoooosh ]);

var Dinner = new Meal({
  title: 'Hack your future OOP',
  date: '29/01/17',
  time: '20:30',
  where: 'Amsterdam'
module.exports = Dinner;

});

Dinner.addOwner( Mauro );
Dinner.addOwner( Malek );
module.exports = Dinner;