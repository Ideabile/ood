var Mauro = require('./../attenders/MauroMandracchia'),
    Hector = require('./../attenders/HectorReyesAleman'),
    Niels = require('./../attenders/NielsDequeker'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    BeerDuvel = require('./../recipes/beer-duvel'),
    BeerWestmalle = require('./../recipes/beer-westmalle'),
    BeerLeffe = require('./../recipes/beer-leffe'),
    Guacamole = require('./../recipes/guacamole'),
    Dick = require('./../attenders/DickBrouwers'),
    Pretzels = require('./../recipes/pretzels'),
    FrenchRedWine = require('./../recipes/wine-red-french');

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
Niels.brings([ BeerDuvel, BeerWestmalle, BeerLeffe ]);
Hector.brings([ Guacamole ]);
Dick.brings([Pretzels, FrenchRedWine]);

var Dinner = new Meal({
  title: 'OOP, a Gentle and Tasty Introduction',
  date: '18/04/2015',
  time: '19:30',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addGuest( Niels );
Dinner.addGuest( Hector );
Dinner.addGuest(Dick);
module.exports = Dinner;
