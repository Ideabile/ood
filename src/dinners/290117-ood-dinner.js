var Mauro = require('./../attenders/MauroMandracchia'),
    Eyad = require('./../attenders/EyadKhamis'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    SpaBlue = require('./../recipes/spaBlue'),
    SpaRood = require('./../recipes/spaRood');
    HomeCookedFarik = require('./../recipes/farik');


Mauro.brings([MontePulcianoWine, PastaCarbonara, DessertTiramisu]);
Eyad.brings([SpaRood, SpaBlue, HomeCookedFarik]);

var Dinner = new Meal({
    title: 'Hack your future OOP',
    date: '29/01/17',
    time: '20:30',
    where: 'Amsterdam'
});

Dinner.addOwner(Mauro);
Dinner.addGuest(Eyad);
module.exports = Dinner;
