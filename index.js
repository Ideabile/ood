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
  function somethingExceptPerson( person ){
    return !(person instanceof global.Person);
  }
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
    if(somethingExceptPerson(person)) throw new Error('You should pass a Person to add a Partecipant');
    if(!person.type) person.type = "guest";
    this.attributes.partecipants.push(person);
  };

  Meal.prototype.addGuest = function(person){
    if(!this.attributes.guests) this.attributes.guests = [];
    if(somethingExceptPerson(person)) throw new Error('You should pass a Person to add a Guest');
    person.attributes.type = 'guest';
    this._addPartecipant(person);
    this.attributes.guests.push(person);
  };

  Meal.prototype.addOwner = function(owner){
      if(!this.attributes.owner) this.attributes.owner = false;
      if(somethingExceptPerson(owner)) throw new Error('You should define a Person to set');
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
