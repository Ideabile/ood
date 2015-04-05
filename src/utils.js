var Utils,
    colors = require('cli-color'),
    ascii = require('ascii-art'),
    async = require('async'),
    TIME = 1000,
    SLICE = 2,
    cli = {
      stream: [],

      render: function(cb_complete){
        var text = "",
            i = 0,
            self = this,
            cb = function(_stream, end){

              _stream(function(_text){
                text += _text;
                if(i == (self.stream.length-1)) cb_complete(text);
                i++;
                end();
              });

            };

            return this.parseStream(cb);

      },

      renderTime: function(){
          var text = "",
              i = 1,
              self = this,
              step = this.stream.shift(),
              cb = function(_text){
                  var _time = i*TIME;

                      setTimeout(function(){
                        console.log(_text);
                        if(self.stream.length === 0){

                        }else{
                          self.renderTime();
                        }
                      }, _time);

              };

              step(cb);

      },

      parseStream: function(cb){
        return async.each(this.stream, cb);
      },

      print_ascii: function(prase, type, color, style, cb){
        ascii.font(prase, type, color, function(rendered){
            cb(ascii.style(rendered, style));
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
          self.print_ascii(prase, 'Basic', color, _style, function(rendered){
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
    };

module.exports = Utils = {

  render: function( meal ){
    if(typeof window === "undefined") return this.parseForConsole( meal );
    return this.parseForHtml( meal );
  },

  parseForConsole: function( meal ){
    var attributes = (meal) ? (meal.attributes || false) : false;

    cli.h1("Hey there next", 'blue', false, 'bold');
    cli.h1("dinner is:", 'blue', false, 'bold');

    if(meal.attributes.title){
      cli.h1(meal.attributes.title, 'magenta');
      cli.h2("-----------");
    }

    if(meal.attributes.date ){
      cli.h1("When:___" + meal.attributes.date, 'blue', 'yellow_bg', 'bold');
      if( meal.attributes.time ) cli.h1("At:____" + meal.attributes.time, 'red', 'yellow_bg', 'bold');
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
          var item_guest = guest.brings[x] ? guest.brings[x].name : "";
          if(typeof item_guest === "string" && item_guest.trim() !== "") cli.h2(item_guest);

        }
      }
    }


    cli.h2("-----------");
    cli.h1("So ready to Join?");
    cli.h1("Make the PR", 'red');

    cli.renderTime();

  }
};
