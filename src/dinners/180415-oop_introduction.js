var Mauro = require('./../attenders/MauroMandracchia'),
    Cristina = require('./../attenders/CristinaValota'),
    MontePulcianoWine = require('./../recepies/wine-monte_pulciano'),
    PastaCarbonara = require('./../recepies/pasta-carbonara'),
    DessertTiramisu = require('./../recepies/dessert-tiramisu');

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
// Cristina.brings(MontePulcianoWine);

var Dinner = new Meal({
  title: 'OOP, a Gentle and Tasty Introduction',
  date: '18/04/2015',
  time: '19:30'
});

Dinner.addOwner( Mauro );
module.exports = Dinner;
