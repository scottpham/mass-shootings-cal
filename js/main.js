console.log(year2015);

var ractive = new Ractive({
  el: '#ractive_template',
  template: '#template',
  data: {
    y15: year2015,
    year: 2015,
    width: 300,
    shootings: shootings,
    getShootings: function(calDate){
      //convert js date string to format of shooting database
      var date = moment(calDate).format('M/D/YY');
      //return a zero if there is no shooting for this date
      return shootings[date] ? shootings[date].shootings : 0;
    },
    //color scale for shootings
    colorScale: function(shootings){
      var scale = chroma.scale(['lightgray', 'maroon']).domain([0,4]);
      return scale(shootings);
    },
    //daySize: 40,
    xscale: function(day) {
      //return a num 1 to 7
      var dayofWeek = day.getDay();
      return (dayofWeek * this.get('daySize') + 10);
    },
    yscale: function(day) {
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
      var week = Math.ceil((dayofmonth + offset) / 7);
      return week * this.get('daySize');
    }
  },
  // these properties depend on other properties
  computed: {
    daySize: function() {
      var x = this.get('width') / 8;
      return x;
    },
    svgHeight: function() {
      return 7 * this.get('daySize');
    }
  },
  oninit: function() {
    //console.log(this.get('y15'));
  },
  onrender: function() {
    this.set('width', $('.svg').width());
  }
});

//proxy events
//http://docs.ractivejs.org/latest/proxy-events
ractive.on('tooltip', function(event, day){
    var date = moment(day).format('M/D/YY');
    var killed;
    if( shootings[date] ){
      killed = shootings[date].killed}
    else {killed = 0;}

    var x = event.node.getBoundingClientRect().left;
    var y = event.node.getBoundingClientRect().bottom;

    var daySize = ractive.get('daySize');
    var offset = (daySize * 0.5);

    $('.tip').css({top: (y + 10), left: (x - offset), opacity: 1 }).html("Killed: " + killed);

});

ractive.on('removeTooltip', function(event){
  //dissappear and get out of the way
  $('.tip').css({top: 0, left: 0, opacity: 0 });
});

$(window).resize(function(){
  ractive.set('width', $('.svg').width());
});
