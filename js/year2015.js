var y2015 = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

//year 2015 is an empty object
var year2015 = [];

//run this anon func for each element in y2015
y2015.map(function(month) {
  var monthNum = y2015.indexOf(month);
  //get last day of the month in temp var
  var temp = new Date(2015, monthNum + 1, 0);
  //get number of days in month
  var numDays = temp.getDate();

  //store month string in a var
  var str = String(month);
  //create blank array to store days
  var mo = new Array();
  //get array of days - i is num of day
  for (i = 1; i <= numDays; i++) {
    //get js day object for day i
    var day = new Date(2015, monthNum, i);
    //store day in a {"day": <object>} format
    var element = {
      "day": day
    };
    //add element to month array
    mo.push(element);
  } //end for
  //console.log(year2015);
  var mObject = {
    "month": {
      "name": str,
      "days": mo
    }
  };
  //at each index, a month object
  year2015[monthNum] = mObject;
});
