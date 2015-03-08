
function SiteSettingsViewModel() {
    var self = this;
    self.Pref = ko.observable('');
    self.q2 = ko.observable('');
    self.q3 = ko.observable('');
    self.Pref1 = ko.computed(
       {
           read: function () {
               if (ko.utils.unwrapObservable(self.Pref) == "true")
                   return "Correct!!";
               else if (ko.utils.unwrapObservable(self.Pref) == "false")
                   return "Incorrect!!";
               else
                   return "Not yet attempted";
           }

       }, this);

       self.answer2 = ko.computed(
       {
           read: function () {
               if (ko.utils.unwrapObservable(self.q2) == "false")
                   return "Correct!!";
               else if (ko.utils.unwrapObservable(self.q2) == "true")
                   return "Incorrect!!";
               else
                   return " Not yet attempted";
           }

       }, this);

       self.answer3 = ko.computed(
          {
              read: function () {
                  if (ko.utils.unwrapObservable(self.q3) == "true")
                      return "Correct!!";
                  else if (ko.utils.unwrapObservable(self.q3) == "false")
                      return "Incorrect!!";
                  else
                      return " Not yet attempted";
              }

          }, this);
}

ko.applyBindings(new SiteSettingsViewModel())

;var margins = {
    top: 150, //from top of page
    left: 400,
    right: 150,
    bottom: 54
},
legendPanel = {
    width: 750
	},
width = 1700- margins.left - margins.right - legendPanel.width,
    height = 375- margins.top - margins.bottom,
    dataset = [{
        data: [{
            month: 'Aug',
            count: 123
        }, {
            month: 'Sep',
            count: 234
        }, {
            month: 'Oct',
            count: 345
        }],
        name: 'Who Got All Answers Right :)'
    }, {
        data: [{
            month: 'Aug',
            count: 235
        }, {
            month: 'Sep',
            count: 267
        }, {
            month: 'Oct',
            count: 573
        }],
        name: 'Who Did Not Get 100/100 :('
    }

    ],
    series = dataset.map(function (d) {
        return d.name;
    }),
    dataset = dataset.map(function (d) {
        return d.data.map(function (o, i) {
            // Structure it so that your numeric
            // axis (the stacked amount) is y
            return {
                y: o.count,
                x: o.month
            };
        });
    }),
    stack = d3.layout.stack();

stack(dataset);

var dataset = dataset.map(function (group) {
    return group.map(function (d) {
        // Invert the x and y values, and y0 becomes x0
        return {
            x: d.y,
            y: d.x,
            x0: d.y0
        };
    });
}),
    svg = d3.select('body')
        .append('svg')
        .attr('width', width + margins.left + margins.right + legendPanel.width)
        .attr('height', height + margins.top + margins.bottom)
        .append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),
    xMax = d3.max(dataset, function (group) {
        return d3.max(group, function (d) {
            return d.x + d.x0;
        });
    }),
    xScale = d3.scale.linear()
        .domain([0, xMax])
        .range([0, width]),
    months = dataset[0].map(function (d) {
        return d.y;
    }),
    _ = console.log(months),
    yScale = d3.scale.ordinal()
        .domain(months)
        .rangeRoundBands([0, height], 0.1),
    xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom'),
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left'),
    colours = d3.scale.category10(),
    groups = svg.selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .style('fill', function (d, i) {
        return colours(i);
    }),
    rects = groups.selectAll('rect')
        .data(function (d) {
        return d;
    })
        .enter()
        .append('rect')
        .attr('x', function (d) {
        return xScale(d.x0);
    })
        .attr('y', function (d, i) {
        return yScale(d.y);
    })
        .attr('height', function (d) {
        return yScale.rangeBand();
    })
        .attr('width', function (d) {
        return xScale(d.x);
    })
       
        .on('mouseout', function () {
        d3.select('#tooltip').classed('hidden', true);
    });

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

svg.append('rect')
    .attr('fill', 'yellow')
    .attr('width', 350)
    .attr('height', 30 * dataset.length)
    .attr('x', width + margins.left)
    .attr('y', 0);

series.forEach(function (s, i) {
    svg.append('text')
        .attr('fill', 'black')
        .attr('x', width + margins.left + 8)
        .attr('y', i * 24 + 24)
        .text(s);
    svg.append('rect')
        .attr('fill', colours(i))
        .attr('width', 60)
        .attr('height', 20)
        .attr('x', width + margins.left + 250)
        .attr('y', i * 24 + 6);
});
	
  