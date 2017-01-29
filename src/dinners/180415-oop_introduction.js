var Mauro = require('./../attenders/MauroMandracchia'),
    Hector = require('./../attenders/HectorReyesAleman'),
    Niels = require('./../attenders/NielsDequeker'),
    Gina = require('./../attenders/GinaLolli'),
    Ilia = require('./../attenders/IliaKondrashov'),
    Amir = require('./../attenders/AmirSwaleh'),
    Bashar = require('./../attenders/BasharSankari'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    BeerDuvel = require('./../recipes/beer-duvel'),
    BeerWestmalle = require('./../recipes/beer-westmalle'),
    BeerLeffe = require('./../recipes/beer-leffe'),
    Guacamole = require('./../recipes/guacamole'),
    Dick = require('./../attenders/DickBrouwers'),
    Pretzels = require('./../recipes/pretzels'),
    FrenchRedWine = require('./../recipes/wine-red-french'),
    WhiteWine = require('./../recipes/white-wine'),
    BeefWithVegetables = require('./../recipes/beef-with-vegetables'),
    Chips = require('./../recipes/chips'),
    Wine  = require('./../recipes/wine'),
    SoftDrinks = require('./../recipes/wine');

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
Niels.brings([ BeerDuvel, BeerWestmalle, BeerLeffe ]);
Hector.brings([ Guacamole ]);
Dick.brings([ Pretzels, FrenchRedWine ]);
Gina.brings([ WhiteWine]);
Ilia.brings([ BeefWithVegetables ]);
Amir.brings([ Wine, Chips ]);
Bashar.brings([ SoftDrinks ]);
var Dinner = new Meal({
  title: 'OOP, a Gentle and Tasty Introduction',
  date: '18/04/2015',
  time: '19:30',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addGuest( Niels );
Dinner.addGuest( Hector );
Dinner.addGuest( Dick );
Dinner.addGuest( Gina );
Dinner.addGuest( Ilia );
Dinner.addGuest( Amir );
Dinner.addGuest( Bashar );
module.exports = Dinner;
