mayDays = [];

function getDays(year, month){
  //get last day
  var result = new Date(year, month+1, 0);
  //returns number of last day of the previous month
  return result.getDate();
}

//javascript days are 1 based
for(i = 1; i < getDays(2015, 4); i++){
  //get datetime for day
  var day = new Date(2015, 4, i);
  var element = {"day": day};
  mayDays.push(element);
}

var ractive = new Ractive({
    // The `el` option can be a node, an ID, or a CSS selector.
    el: '#ractive_template',
    template: '#template',
    //declare decorators
    decorators: {},
    // JSON CAN GO HERE
    data: {
      may: mayDays,
      daySize: 40,
      xscale: function(day){
        var dayofmonth = day.getDate();
        //return a num 1 to 7
        var dayofweek = dayofmonth % 7;
        return (dayofweek * this.get('daySize') + 10);
      },
      yscale: function(day){
        var dayofmonth = day.getDate();
        var week = Math.floor(dayofmonth/7);
        return week * this.get('daySize') + 25;
      }
    },
    // these properties depend on other properties
    computed: {
        // COMPUTED_PROPERTY: function() {
        //     return ("DATA");
        // }
    },
    oninit: function() {
        console.log(mayDays);
    }
});

//proxy events
//http://docs.ractivejs.org/latest/proxy-events
ractive.on('select', function(event) {

});
