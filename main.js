mayDays = [];

function getDays(year, month){
  //get last day
  var result = new Date(year, month+1, 0);
  //returns number of last day of the previous month
  return result.getDate();
}



//write array of days
//javascript days are 1 based
  for(i = 1; i < getDays(2015, 4); i++){
    //get datetime for day
    var day = new Date(2015, 4, i);
    var element = {"day": day};
    mayDays.push(element);
  }

function iterDays(year, monthNum, monthName){
  for(i = 1; i < getDays(year, monthNum); i++){
      //day of month
      var day = new Date(year, monthNum, i);
      //element of an array
      var element = {"day": day};
      monthName.push(element);
  }
}

var y2015 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

iterDays(2015, 7, (August = new Array));
iterDays(2015, 4, (May = new Array));

//var year = ["September":8, "October":9, "November":10];

//for(i=0)



var ractive = new Ractive({
    // The `el` option can be a node, an ID, or a CSS selector.
    el: '#ractive_template',
    template: '#template',
    //declare decorators
    decorators: {},
    // JSON CAN GO HERE
    data: {
      may: May,
      August: August,
      year: 2015,
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
    },
    oninit: function() {
        console.log(this.get('may'));
    }
});

//proxy events
//http://docs.ractivejs.org/latest/proxy-events
ractive.on('select', function(event) {

});
