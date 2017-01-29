var Mauro = require('./../attenders/MauroMandracchia'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    brood = require('./../recipes/brood'),
     somur = require('./../attenders/somur');
    

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
somur.brings([brood]); 


var Dinner = new Meal({
  title: 'Hack your future OOP',
  date: '29/01/17',
  time: '20:30',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addGuest( somur );
module.exports = Dinner;
