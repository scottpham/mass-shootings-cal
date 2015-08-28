var y2015 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//year 2015 is an empty object
var year2015 = [];

//run this anon func for each element in y2015
y2015.map(function(month){
   var monthNum = y2015.indexOf(month);
    //get last day of the month in temp var
   var temp = new Date(2015, monthNum+1, 0);
    //get number of days in month
   var numDays = temp.getDate();

//store month string in a var
  var str = String(month);
   //create blank array to store days
   var mo = new Array();
  console.log(str);
    //get array of days - i is num of day
   for(i = 1; i <= numDays; i++){
    //get js day object for day i
    var day = new Date(2015, monthNum, i);
    //store day in a {"day": <object>} format
    var element = {"day": day};
    //add element to month array
    mo.push(element);
   }//end for
  //console.log(year2015);
    var mObject = {"month": {
                    "name": str,
                    "days": mo }
                  };
    //at each index, a month object
   year2015[monthNum] = mObject;
});

var ractive = new Ractive({
    // The `el` option can be a node, an ID, or a CSS selector.
    el: '#ractive_template',
    template: '#template',
    //declare decorators
    decorators: {},
    // JSON CAN GO HERE
    data: {
      y15: year2015,
      year: 2015,
      daySize: 40,
      xscale: function(day){
        //return a num 1 to 7
        var dayofWeek = day.getDay();
        return (dayofWeek * this.get('daySize') + 10);
      },
      yscale: function(day){
        //find the 'offset': the day of week of
        //the first day of this month
        //get month from day
        var monthNum = day.getMonth();
        //get first day of this month
        var firstDay = new Date(2015, monthNum, 1);
        var offset = firstDay.getDay();

        //get day of month
        var dayofmonth = day.getDate();
        //get num week
        var week = Math.ceil( (dayofmonth + offset) / 7 );
        return week * this.get('daySize');
      }
    },
    // these properties depend on other properties
    computed: {
        //can compute daysize here
    },
    oninit: function() {
        console.log(this.get('y15'));
    },
    onrender: function(){
  }
});

//proxy events
//http://docs.ractivejs.org/latest/proxy-events
ractive.on('render', function(event) {
  console.log(this.get('year'));
});
