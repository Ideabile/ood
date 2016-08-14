var Mauro = require('./../attenders/MauroMandracchia'),
  MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
  PastaCarbonara = require('./../recipes/pasta-carbonara'),
  DessertTiramisu = require('./../recipes/dessert-tiramisu'),
  Tibsi = require('./../recipes/Tibsi')

Jonas.brings([Tibsi])
Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ])

var Dinner = new Meal({
  title: 'Hack your future OOP',
  date: '14/08/2015',
  time: '13:00',
  where: 'Amsterdam'
})

Dinner.addOwner(Mauro)
Dinner.addOwner(Jonas)
module.exports = Dinner
