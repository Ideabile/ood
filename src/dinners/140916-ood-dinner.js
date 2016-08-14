var Mauro = require('./../attenders/MauroMandracchia'),
	alissar = require('./../attenders/alissar'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    Greensalad= require('./../recipes/green-salad');
Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]),
alissar.brings([Greensalad]);
var Dinner = new Meal({
  title: 'Hack your future OOP',
  date: '14/08/2015',
  time: '13:00',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro ),
Dinner.addGuest(alissar);

module.exports = Dinner;
