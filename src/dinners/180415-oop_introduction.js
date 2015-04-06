var Mauro = require('./../attenders/MauroMandracchia'),
	  Niels = require('./../attenders/NielsDequeker'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    BeerDuvel = require('./../recipes/beer-duvel'),
    BeerWestmalle = require('./../recipes/beer-westmalle'),
    BeerLeffe = require('./../recipes/beer-leffe');

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
Niels.brings([ BeerDuvel, BeerWestmalle, BeerLeffe ]);

var Dinner = new Meal({
  title: 'OOP, a Gentle and Tasty Introduction',
  date: '18/04/2015',
  time: '19:30',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addGuest( Niels );
module.exports = Dinner;
