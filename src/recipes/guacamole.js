var Guacamole;
module.exports = Guacamole = new Recipe({
    name: 'Spicy Guacamole and Chips',
    category: 'Dip',
    composition: [
        new Recipe({name: 'guacamole', category: 'Dip'}),
        new Ingredient({name: 'avocado'}),
        new Manipulation({name: 'slice', desc: 'Completely slice the avocado in the middle (around the seed)'}),
        new Ingredient({name: 'Chille'}),
        new Manipulation({name: 'slice', desc: 'Red Hot Chilly Peppers'}),
        new Ingredient({name: 'onion'}),
        new Manipulation({name: 'slice', desc: 'Be Careful with the knife'}),
        new Ingredient({name: 'Chips'}),
    ]
});
