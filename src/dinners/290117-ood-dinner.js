var Mauro = require('./../attenders/MauroMandracchia'),
    Eyad = require('./../attenders/EyadKhamis'),
    AbdulRahman = require('./../attenders/AbdulRahman'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    Beef_vegetables = require('./../recipes/beef-with-vegetables'),
    Chips = require('./../recipes/chips');

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
Eyad.brings([SpaRood, SpaBlue]);
AbdulRahman.brings([Beef-vegetables, Chips]);

var Dinner = new Meal({
    title: 'Hack your future OOP',
    date: '29/01/17',
    time: '20:30',
    where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addGuest( AbdulRahman );
Dinner.addGuest(Eyad);
module.exports = Dinner;
