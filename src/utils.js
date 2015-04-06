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
          if(praseParsed) this.h1(praseParsed.rest, color, bg, style);
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
