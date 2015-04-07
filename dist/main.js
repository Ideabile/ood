(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function(global){

  function Obj(){
      var self = this;
      self.attributes = arguments[0] || { name: '' };
  }

  // Person
  // This is a generic person to rapresent the participants
  function Person(){
    Obj.call(this, arguments[0]);
  }
  function isPerson( person ){
    return !(person instanceof global.Person);
  };
  Person.prototype.brings = function(ingredients){
      if(!this.attributes.brings) this.attributes.brings = [];
      if(typeof ingredients === "object"){
        for(var i in ingredients){
          this.attributes.brings.push(ingredients[i]);
        }
      }else{
        this.attributes.brings.push(ingredients);
      }
  };
  global.Person = Person;

  var Meal = Obj;
  Meal.prototype._addPartecipant = function(person){
    if(!this.attributes.partecipants) this.attributes.partecipants = [];
    if(isPerson(person)) throw new Error('You should pass a Person to add a Partecipant');
    if(!person.type) person.type = "guest";
    this.attributes.partecipants.push(person);
  };

  Meal.prototype.addGuest = function(person){
    if(!this.attributes.guests) this.attributes.guests = [];
    if(isPerson(person)) throw new Error('You should pass a Person to add a Guest');
    person.attributes.type = 'guest';
    this._addPartecipant(person);
    this.attributes.guests.push(person);
  };

  Meal.prototype.addOwner = function(owner){
      if(!this.attributes.owner) this.attributes.owner = false;
      if(!(owner instanceof global.Person)) throw new Error('You should define a Person to set');
      owner.attributes.type = 'owner';
      this._addPartecipant(owner);
      this.attributes.owner = owner;
  };
  global.Meal = Meal;

  global.Ingredient = global.Manipulation = global.Recipe = Obj;

  var dinners = require('./src/dinners'),
      last_dinner = dinners[(dinners.length-1)],
      Utils = require('./src/utils');

  Utils.render(last_dinner);

})(global || window);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./src/dinners":9,"./src/utils":17}],2:[function(require,module,exports){
(function (__dirname){
/*
 * asciimo.js
 *
 * Copyright (c) 2010 Marak Squires
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * http://github.com/marak/figlet-js
 * Figlet JS
 *
 * Copyright (c) 2010 Scott González
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://github.com/scottgonzalez/figlet-js
 */


(function() {

// Remark : not a very good env check
var fontPath;
if(typeof __dirname == 'undefined'){
  fontPath = './fonts/';
}
else{
  fontPath = __dirname + '/../fonts/';
}

var Figlet = (typeof exports !== "undefined" ? exports : window).Figlet = {
  fonts: {},

  parseFont: function(name, fn) { //        debug.log('parseFont', name);
    if (name in Figlet.fonts) {
      fn();
    }
    Figlet.loadFont(name, function(defn) {
      Figlet._parseFont(name, defn, fn);
    });
  },

  _parseFont: function(name, defn, fn) {
    var lines = defn.split("\n"),
      header = lines[0].split(" "),
      hardblank = header[0].charAt(header[0].length - 1),
      height = +header[1],
      comments = +header[5];

    Figlet.fonts[name] = {
      defn: lines.slice(comments + 1),
      hardblank: hardblank,
      height: height,
      char: {}
    };
    fn();
  },

  parseChar: function(char, font) { // debug.log('parseChar');
    var fontDefn = Figlet.fonts[font];
    if (char in fontDefn.char) {
      return fontDefn.char[char];
    }

    var height = fontDefn.height,
      start = (char - 32) * height,
      charDefn = [],
      i;
    for (i = 0; i < height; i++) {
      charDefn[i] = fontDefn.defn[start + i]
        .replace(/@/g, "")
        .replace(RegExp("\\" + fontDefn.hardblank, "g"), " ");
    }
    return fontDefn.char[char] = charDefn;
  },

  write: function(str, font, fn) {
    Figlet.parseFont(font, function() { // debug.log('parseFont');
      var chars = [],
        result = "";
      for (var i = 0, len = str.length; i < len; i++) {
        chars[i] = Figlet.parseChar(str.charCodeAt(i), font);
      }
      for (i = 0, height = chars[0].length; i < height; i++) {
        for (var j = 0; j < len; j++) {
          result += chars[j][i];
        }
        result += "\n";
      }
      fn(result, font);
    });
  },

  loadFont: function(name, fn) {
    if(typeof exports != 'undefined' && typeof window === "undefined"){
      var util = require('util');
      require("fs").readFile(fontPath + name + ".flf", "utf-8", function(err, contents) {
        if (err) {
          util.puts(err);
        }
        else {
          fn(contents);
        }
      });
    }
    else{
      var r = new XMLHttpRequest();
      r.open("GET", '/ood'+fontPath + name+ '.flf', true);
      r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        fn(r.responseText);
      };
      r.send();
    }
  }
};

})();

}).call(this,"/node_modules/asciimo/lib")
},{"fs":18,"util":22}],3:[function(require,module,exports){
/*
colors.js

Copyright (c) 2010 Alexis Sellier (cloudhead) , Marak Squires

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

// prototypes the string object to have additional method calls that add terminal colors
['bold', 'underline', 'italic', 'inverse', 'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta'].forEach(function (style) {
  Object.defineProperty(String.prototype, style, {
    get: function () {
      return stylize(this, style);
    }
  });
});

// prototypes string with method "rainbow"
// rainbow will apply a the color spectrum to a string, changing colors every letter
Object.defineProperty(String.prototype, 'rainbow', {
  get: function () {
    var rainbowcolors = ['red','yellow','green','blue','magenta']; //RoY G BiV
    var exploded = this.split("");
    var i=0;
    exploded = exploded.map(function(letter) {
      if (letter==" ") {
        return letter;
      }
      else {
        return stylize(letter,rainbowcolors[i++ % rainbowcolors.length]);
      }
    });
    return exploded.join("");
  }
});

function stylize(str, style) {
  var styles = {
  //styles
  'bold'      : [1,  22],
  'italic'    : [3,  23],
  'underline' : [4,  24],
  'inverse'   : [7,  27],
  //grayscale
  'white'     : [37, 39],
  'grey'      : [90, 39],
  'black'     : [90, 39],
  //colors
  'blue'      : [34, 39],
  'cyan'      : [36, 39],
  'green'     : [32, 39],
  'magenta'   : [35, 39],
  'red'       : [31, 39],
  'yellow'    : [33, 39]
  };
  return '\033[' + styles[style][0] + 'm' + str +
         '\033[' + styles[style][1] + 'm';
};

},{}],4:[function(require,module,exports){
Figlet.fontList = [
  "3-d",
  "3x5",
  "5lineoblique",
  "acrobatic",
  "alligator",
  "alligator2",
  "alphabet",
  "avatar",
  "banner",
  "banner3-D",
  "banner3",
  "banner4",
  "barbwire",
  "basic",
  "bdffonts",
  "bell",
  "bigchief",
  "binary",
  "broadway",
  "bulbhead",
  "C64-fonts",
  "calgphy2",
  "caligraphy",
  "catwalk",
  "chunky",
  "coinstak",
  "colossal",
  "computer",
  "contessa",
  "contrast",
  "contributed.tar.gz",
  "cosmic",
  "cosmike",
  "crawford",
  "cricket",
  "cursive",
  "cyberlarge",
  "cybermedium",
  "cybersmall",
  "decimal",
  "diamond",
  "doh",
  "doom",
  "dotmatrix",
  "double",
  "drpepper",
  "dwhistled",
  "eftichess",
  "eftichessChart",
  "eftifont",
  "eftipiti",
  "eftirobot",
  "eftitalic",
  "eftiwall-chart.txt",
  "eftiwall",
  "eftiwall.txt",
  "eftiwater",
  "epic",
  "fender",
  "fourtops",
  "fraktur",
  "fuzzy",
  "goofy",
  "gothic",
  "graceful",
  "gradient",
  "graffiti",
  "hex",
  "hollywood",
  "invita",
  "isometric1",
  "isometric2",
  "isometric3",
  "isometric4",
  "italic",
  "jazmine",
  "katakana",
  "kban",
  "l4me",
  "larry3d",
  "lcd",
  "letters",
  "linux",
  "lockergnome",
  "lower.flc",
  "madrid",
  "marquee",
  "maxfour",
  "mike",
  "mirror",
  "nancyj-fancy",
  "nancyj-underlined",
  "nancyj",
  "nipples",
  "null.flc",
  "nvscript",
  "o8",
  "Obanner-canon.tgz",
  "Obanner.README",
  "Obanner.tgz",
  "octal",
  "ogre",
  "os2",
  "pawp",
  "peaks",
  "pebbles",
  "pepper",
  "poison",
  "puffy",
  "pyramid",
  "rectangles",
  "relief",
  "relief2",
  "rev",
  "roman",
  "rot13.flc",
  "rot13",
  "rounded",
  "rowancap",
  "rozzo",
  "runyc",
  "sblood",
  "serifcap",
  "short",
  "slide",
  "slscript",
  "smisome1",
  "smkeyboard",
  "speed",
  "stacey",
  "stampatello",
  "starwars",
  "stellar",
  "stop",
  "straight",
  "swap.flc",
  "tanja",
  "thick",
  "thin",
  "threepoint",
  "ticks",
  "ticksslant",
  "tinker-toy",
  "tombstone",
  "trek",
  "tsalagi.flc",
  "tsalagi",
  "twopoint",
  "univers",
  "usaflag",
  "weird",
  "whimsy"
];
},{}],5:[function(require,module,exports){
var HectorReyesAleman;
module.exports = HectorReyesAleman = new Person({
    name: 'Hector',
    last_name: 'Reyes-Aleman',
    nationality: 'Mexico',
    description: 'This Js Stuff!'
});
},{}],6:[function(require,module,exports){
var MauroMandracchia;
module.exports = MauroMandracchia = new Person({
  name: 'Mauro',
  last_name: 'Mandracchia',
  nationality: 'Italia',
  description: 'He love food, has much JavaScript'
});

},{}],7:[function(require,module,exports){
var NielsDequeker;
module.exports = NielsDequeker = new Person({
  name: 'Niels',
  last_name: 'Dequeker',
  nationality: 'Belgium',
  description: 'niels.js'
});

},{}],8:[function(require,module,exports){
var Mauro = require('./../attenders/MauroMandracchia'),
    Hector = require('./../attenders/HectorReyesAleman'),
    Niels = require('./../attenders/NielsDequeker'),
    MontePulcianoWine = require('./../recipes/wine-monte_pulciano'),
    PastaCarbonara = require('./../recipes/pasta-carbonara'),
    DessertTiramisu = require('./../recipes/dessert-tiramisu'),
    BeerDuvel = require('./../recipes/beer-duvel'),
    BeerWestmalle = require('./../recipes/beer-westmalle'),
    BeerLeffe = require('./../recipes/beer-leffe'),
    Guacamole = require('./../recipes/guacamole');

Mauro.brings([ MontePulcianoWine, PastaCarbonara, DessertTiramisu ]);
Niels.brings([ BeerDuvel, BeerWestmalle, BeerLeffe ]);
Hector.brings([ Guacamole ]);

var Dinner = new Meal({
  title: 'OOP, a Gentle and Tasty Introduction',
  date: '18/04/2015',
  time: '19:30',
  where: 'Amsterdam'
});

Dinner.addOwner( Mauro );
Dinner.addGuest( Niels );
Dinner.addGuest( Hector );
module.exports = Dinner;

},{"./../attenders/HectorReyesAleman":5,"./../attenders/MauroMandracchia":6,"./../attenders/NielsDequeker":7,"./../recipes/beer-duvel":10,"./../recipes/beer-leffe":11,"./../recipes/beer-westmalle":12,"./../recipes/dessert-tiramisu":13,"./../recipes/guacamole":14,"./../recipes/pasta-carbonara":15,"./../recipes/wine-monte_pulciano":16}],9:[function(require,module,exports){
module.exports = [
  require('./180415-oop_introduction')
];

},{"./180415-oop_introduction":8}],10:[function(require,module,exports){
var DuvelBeer;
module.exports = DuvelBeer = new Recipe({
  name: 'Duvel',
  category: 'beer',
  brand: 'Duvel', composition: [
      new Ingredient({name: 'water'}),
      new Ingredient({name: 'malt'}),
      new Ingredient({name: 'hops'}),
  ]
});

},{}],11:[function(require,module,exports){
var LeffeBeer;
module.exports = LeffeBeer = new Recipe({
  name: 'Leffe',
  category: 'beer',
  brand: 'Leffe', composition: [
      new Ingredient({name: 'water'}),
      new Ingredient({name: 'malt'}),
      new Ingredient({name: 'hops'}),
  ]
});

},{}],12:[function(require,module,exports){
var WestmalleBeer;
module.exports = WestmalleBeer = new Recipe({
  name: 'Westmalle',
  category: 'beer',
  brand: 'Westmalle', composition: [
      new Ingredient({name: 'water'}),
      new Ingredient({name: 'malt'}),
      new Ingredient({name: 'hops'}),
  ]
});

},{}],13:[function(require,module,exports){
var Tiramisu;
module.exports = Tiramisu = new Recipe({
  name: 'Tiramisu\'',
  category: 'dessert',
  composition: [
      new Recipe({name: 'coffee', category: 'drink'}),
      new Ingredient({name: 'mascarpone', category: 'milk', attributes: ['chees', 'cream']}),
      new Manipulation({name: 'mix', desc: 'until it get softly'}),
      new Ingredient({name: 'eggs'}),
      new Manipulation({name: 'mix'}),
      new Ingredient({name: 'sugar', category: 'vegetable'}),
      new Manipulation({name: 'mix', desc: 'together mascarpone, eggs, and sugar'}),
      new Recipe({name: 'savoiardi', category: 'biscuit'}),
      new Manipulation({name: 'wet', desc: 'lightly with coffee'}),
      new Recipe({name: 'choccolate', category: 'vegetable', attributes: ['small cut']}),
      new Manipulation({name: 'distribuite', desc: 'in layers with order: mascarpone cream, savoiardi,  '}),
      new Manipulation({name: 'rest', desc: 'in the frige, for two hours'})
  ]
});

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
var Carbonara;
module.exports = Carbonara = new Recipe({
  name: 'Pasta alla Carbonara',
  category: 'pasta-dish',
  composition: [
      new Recipe({name: 'spaghetti', category: 'pasta'}),
      new Manipulation({name: 'boiling'}),
      new Ingredient({name: 'bacon', category: 'meat', attributes: ['smoked', 'cubic']}),
      new Manipulation({name: 'cook', desc: 'light fried with butter'}),
      new Ingredient({name: 'parmesan', category: 'milk', attributes: ['cheese']}),,
      new Manipulation({name: 'grind', desc: 'small cut'}),
      new Ingredient({name: 'eggs'}),
      new Manipulation({name: 'mix', desc: 'and add parmesan, and bacon when it is cold'})
  ]
});

},{}],16:[function(require,module,exports){
var MontePulcianoWine;
module.exports = MontePulcianoWine = new Recipe({
  name: 'Monte Pulciano Wine',
  category: 'wine',
  brand: 'Santa Cristina', composition: [
      new Ingredient({name: 'grape'}),
      new Manipulation({name: 'fermentation'})
  ]
});

},{}],17:[function(require,module,exports){
(function (global){
var Utils;

var ascii = require('asciimo').Figlet;
global.Figlet = {};
var fonts = require('asciimo/lib/fonts'),
    color = require('asciimo/lib/colors');


var TIME = (typeof window === 'undefined') ? 3000 : 1000,
    SLICE = 2,
    cli_utils = {

      stream: [],

      render: function(){
          var text = "",
              i = 1,
              self = this,
              step = this.stream.shift(),
              cb = function(_text){
                  var _time = i*TIME;
                      // console.log(_text);
                      setTimeout(function(){
                        // console.log(_text);
                        if(self.stream.length === 0){

                        }else{
                          self.render();
                        }
                      }, _time);

              };

              step(cb);

      },

      print_ascii: function(_prase, type, color, style, cb){
        var isCalled = true;
        ascii.write(_prase, type, function(art){
            if(isCalled){ // @todo: Remove Workaround, this is called twice.
              console.log(art[color]);
            }
            cb(art[color]);
            isCalled = false;
        });
      },

      h1: function(prase, color, bg, style){
        this.h1_ascii(prase, color, bg, style);
      },

      h2: function(prase, color, bg, style){
        this.h2_ascii(prase, color, bg, style);
      },

      isLongPrase: function( prase ){
        var prases = prase.split(' ');

          if(prases.length-1 >= SLICE){
            var _prase = prases.splice(0, (SLICE+1)).join('   ').trim(),
                rest = prases.splice((SLICE-2)).join(' ').trim();
                return {prase: _prase, rest: rest};
          }

          return false;

      },

      h1_ascii: function(prase, color, bg, style){
        if(!prase) return false;
        prase = prase.trim();
        color = color || "blue";
        bg = bg || false;
        style = style || false;

        var self = this,
            i,
            _style = [color],
            praseParsed = this.isLongPrase(prase);

        if(bg) _style.push('+'+bg);
        if(style) _style.push('+'+style);
        _style = _style.join('');

        if(praseParsed) prase = praseParsed.prase;
        this.stream.push(function(cb){
          self.print_ascii(prase, 'banner3-D', color, _style, function(rendered){
            cb("\n"+rendered+"\n");
          });
        });

        if(praseParsed) this.h1(praseParsed.rest, color, bg, style);
      },

      h2_ascii: function(prase, color, bg, style){
        if(!prase) return false;
        prase = prase.trim();
        color = color || "magenta";
        bg = bg || false;
        style = style || false;

        var self = this,
            praseParsed = this.isLongPrase(prase);

        if(praseParsed) prase = praseParsed.prase;
        this.stream.push(function(cb){
          self.print_ascii(prase, 'Doom', color, style, function(rendered){
            cb("\n"+rendered+"\n");
          });
        });
        if(praseParsed) this.h2(praseParsed.rest, color, bg, style);
      }
    },
    cli_utils_web = {
        stream : [],

        h1: function(prase, color, bg, style, type){
              color = color || 'blue',
              type = type || 'banner3-D';

          if(!prase) return false;
          prase = prase.trim();

          var self = this,
              praseParsed = cli_utils.isLongPrase(prase);

          if(praseParsed) prase = praseParsed.prase;
          this.stream.push(function(cb){
            var isCalled = true;
            ascii.loadFont(type, function(rsp){
              ascii.write(prase, type, function(art){
                if(isCalled) cb('<pre style="color: '+color+';">'+art+'</pre>');
                isCalled = false;
              });
            });
          });
          if(praseParsed) this.h1(praseParsed.rest, color, bg, style, type);
        },

        h2: function(prase, color, bg, style){
            color = color || 'magenta';
            this.h1(prase, color, bg, style, 'Doom');
        },


        render: function(){
            var text = "",
                i = 1,
                self = this,
                step = this.stream.shift(),
                _time = i*TIME,
                cb = function(_text){
                    setTimeout(function(){
                      var wrapper= document.createElement('div');
                      wrapper.innerHTML = _text;

                      document.body.appendChild(wrapper);
                      window.scrollTo(0,document.body.scrollHeight);

                      if(self.stream.length !== 0){
                        self.render();
                      }

                    }, _time);
                };

              step(cb);

        }
    };

module.exports = Utils = {

  render: function( meal ){
    return this.body( meal );
  },

  body: function( meal ){
    var cli = cli_utils;
    if(typeof window !== 'undefined') cli = cli_utils_web;
    var attributes = (meal) ? (meal.attributes || false) : false;

    cli.h1("OOD ~ Object Oriented Dinner", 'magenta', false, 'bold');

    cli.h1("Hey there next", 'blue', false, 'bold');
    cli.h1("dinner is:", 'blue', false, 'bold');

    if(meal.attributes.title){
      cli.h1(meal.attributes.title, 'white');
      cli.h2("-----------");
    }

    if(meal.attributes.date ){
      cli.h1("When:____" + meal.attributes.date, 'green', 'yellow_bg', 'bold');
      if( meal.attributes.time ) cli.h1("At:_______" + meal.attributes.time, 'white', 'yellow_bg', 'bold');
      if( meal.attributes.where ) cli.h1("Where:___" + meal.attributes.where, 'red', 'yellow_bg', 'bold');
      cli.h2("-----------");
    }

    if(meal.attributes.owner.attributes.name){
      var owner = meal.attributes.owner.attributes;
      cli.h1("Dinner Hosted by:", 'yellow', 'blue_bg');
      cli.h1(owner.name+" "+owner.last_name);
      cli.h2("-----------");
      cli.h1(owner.name+' would serve:');
      for(var k in owner.brings){
        var item = owner.brings[k].attributes ? owner.brings[k].attributes.name : "";
        cli.h2(item);
      }

    }

    if(meal.attributes.guests){
      cli.h2("-----------");
      cli.h1("Guests:", 'yellow');
      for( var z in meal.attributes.guests ){
        var guest = meal.attributes.guests[z].attributes;
        cli.h2("-----------");
        cli.h1(guest.name+" brings:", 'red');

        for(var x in guest.brings){
          var item_guest = guest.brings[x].attributes ? guest.brings[x].attributes.name : "";
          if(typeof item_guest === "string" && item_guest.trim() !== "") cli.h2(item_guest);

        }
      }
    }


    cli.h2("-----------");
    cli.h1("So ready to Join?");
    cli.h1("Make the PR", 'red');

    cli.render();

  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"asciimo":2,"asciimo/lib/colors":3,"asciimo/lib/fonts":4}],18:[function(require,module,exports){

},{}],19:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],20:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],21:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],22:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":21,"_process":20,"inherits":19}]},{},[1]);
