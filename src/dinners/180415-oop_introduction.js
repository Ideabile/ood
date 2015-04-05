var Mauro = require('./../attenders/MauroMandracchia'),
    MontePulcianoWine = require('./../recepies/wine-monte_pulciano'),
    PastaCarbonara = require('./../recepies/pasta-carbonara'),
    DessertTiramisu = require('./../recepies/dessert-tiramisu');

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);

var Dinner = new Meal({
  title: 'OOP, a Gentle and Tasty Introduction',
  date: '18/04/2015',
  time: '19:30',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
module.exports = Dinner;
