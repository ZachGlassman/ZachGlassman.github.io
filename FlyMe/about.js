(function () {
    window.onload = function () {
        delayPlot();
        baggagePlot();
        diagramPlot();
    }
    var margin = {
        top: 20,
        right: 20,
        bottom: 150,
        left: 140
    };
    var COLORS = ['#c43a64', '#ce7c46', "#ccce5c", '#2fc68d'];

    function diagramPlot() {
        var radius = 50;
        var diagramDATA = [{
            'x': 200,
            'y': 50,
            'r': radius,
            'color': COLORS[0],
            'text': 'You'
        }, {
            'x': 200,
            'y': 250,
            'r': radius,
            'color': COLORS[1],
            'text': 'Data'
        }, {
            'x': 550,
            'y': 150,
            'r': radius,
            'color': COLORS[2],
            'text': 'Value'
        }, {
            'x': 350,
            'y': 150,
            'r': radius,
            'color': COLORS[3],
            'text': 'FlyMe'
        }];

        var lineData = [{
                'x1': 200,
                'y1': 50,
                'x2': 350,
                'y2': 150
            }, {
                'x1': 200,
                'y1': 250,
                'x2': 350,
                'y2': 150
            },
            {
                'x1': 350,
                'y1': 150,
                'x2': 550,
                'y2': 150
            }
        ]
        var svg = d3.select("#diagramSvg");
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var width = +svg.attr("width") - margin.left - margin.right;
        var height = +svg.attr("height") - margin.top - margin.bottom;
        var line = d3.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y
            })

        var lines = g.selectAll("line")
            .data(lineData)
            .enter().append("line")
            .attr("x1", function (d) {
                return d.x1;
            })
            .attr("y1", function (d) {
                return d.y1;
            })
            .attr("x2", function (d) {
                return d.x2;
            })
            .attr("y2", function (d) {
                return d.y2;
            })
            .attr("stroke-width", 2)
            .attr("stroke", "black");

        var circle = g.selectAll("circle")
            .data(diagramDATA)
            .enter().append("circle")
            .style("fill", function (d) {
                return d.color;
            })
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })
            .attr("r", function (d) {
                return d.r;
            });

        var text = g.selectAll("text")
            .data(diagramDATA)
            .enter().append("text")
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y + d.r / 5;
            })
            .text(function (d) {
                return d.text;
            })
            .style("text-anchor", "middle")
            .style('font-size', "21px");

    }

    function delayPlot() {
        var DAYS = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
        var svg = d3.select("#delaySvg");

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var width = +svg.attr("width") - margin.left - margin.right;
        var height = +svg.attr("height") - margin.top - margin.bottom;

        var x = d3.scaleLinear().rangeRound([0, width]);
        var y = d3.scaleLinear().rangeRound([height, 0]);

        d3.csv("delay_plot_data.csv", function (data) {
            data.forEach(function (d) {
                d.UA = +d.UA;
                d.DL = +d.DL;
                d.day = +d.day;
            })

            x.domain([0, d3.max(data, function (d) {
                return d.day - .5;
            })]);

            y.domain([0, d3.max(data, function (d) {
                return Math.max(d.UA, d.DL);
            })]);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x)
                    .tickValues([0, 1, 2, 3, 4, 5, 6])
                    .tickFormat(function (d, i) {
                        return DAYS[i]
                    }))
                .style('font-size', "21px");

            var airlines = ['UA', 'DL'];
            for (var i = 0; i < airlines.length; i++) {
                g.selectAll(".bar" + i.toString())
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar" + i.toString())
                    .attr("x", function (d) {
                        return x(d.day - i / 3 - 1);
                    })
                    .attr("y", function (d) {
                        return y(d[airlines[i]]);
                    })
                    .attr("width", x(0.35))
                    .attr("height", function (d) {
                        return height - y(d[airlines[i]]);
                    })
                    .attr("fill", COLORS[i])
                    .attr('opacity', '.9')
            }
        });
        var text = g.selectAll("text")
            .data([{
                'x': 40,
                'y': 20,
                'text': 'Hello sup homie'
            }])
            .enter().append("text")
            .attr("x", function (d) {
                return x(d.x);
            })
            .attr("y", function (d) {
                return y(d.y);
            })
            .text(function (d) {
                return d.text;
            })
            .style("text-anchor", "middle")
            .style('font-size', "21px");

    }

    function baggagePlot() {
        // baggage costs by airline
        var svg = d3.select("#baggageSvg");
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var width = +svg.attr("width") - margin.left - margin.right;
        var height = +svg.attr("height") - margin.top - margin.bottom;
        var x = d3.scaleLinear().rangeRound([0, width]);
        var y = d3.scaleLinear().rangeRound([height, 0]);
        d3.csv("bag_fee_plot.csv", function (data) {
            var tickValues = [];
            data.forEach(function (d) {
                d.bagOne = +d.bagOne;
                d.bagTwo = +d.bagTwo;
                d.bagExtra = +d.bagExtra;
                d['index'] = +d[''] + .2;
                tickValues.push(d['index'] + .25);
            })
            x.domain([0, d3.max(data, function (d) {
                return d.index + .5;
            })]);

            y.domain([0, d3.max(data, function (d) {
                return d.bagExtra;
            })]);


            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x)
                    .tickValues(tickValues)
                    .tickFormat(function (d, i) {
                        return data[i]['airline']
                    }))
                .style('font-size', "21px");

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y))
                .style('font-size', "21px");

            g.selectAll(".bar2")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar2")
                .attr("x", function (d) {
                    return x(d.index + .35);
                })
                .attr("y", function (d) {
                    return y(d.bagExtra);
                })
                .attr("width", x(0.25))
                .attr("height", function (d) {
                    return height - y(d.bagExtra);
                })
                .attr("fill", COLORS[2])

            g.selectAll(".bar1")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar1")
                .attr("x", function (d) {
                    return x(d.index + .1);
                })
                .attr("y", function (d) {
                    return y(d.bagTwo);
                })
                .attr("width", x(0.25))
                .attr("height", function (d) {
                    return height - y(d.bagTwo);
                })
                .attr("fill", COLORS[1])


            g.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.index - 0.15);
                })
                .attr("y", function (d) {
                    return y(d.bagOne);
                })
                .attr("width", x(0.25))
                .attr("height", function (d) {
                    return height - y(d.bagOne);
                })
                .attr("fill", COLORS[0]);
        });

        var rect = g.append("rect")
            .attr("x", 10)
            .attr("y", -5)
            .style("width", 180)
            .style("height", 120)
            .style("fill", 'white');

        var text = g.append("text")
            .attr("x", 50)
            .attr("y", 15)
            .text("First Bag")
            .style('font-size', "21px");

        var rect = g.append("rect")
            .attr("x", 20)
            .attr("y", 0)
            .style("width", 10)
            .style("height", 10)
            .style("fill", COLORS[0]);


        var text = g.append("text")
            .attr("x", 50)
            .attr("y", 55)
            .text("Second Bag")
            .style('font-size', "21px");

        var rect = g.append("rect")
            .attr("x", 20)
            .attr("y", 40)
            .style("width", 10)
            .style("height", 10)
            .style("fill", COLORS[1]);

        var text = g.append("text")
            .attr("x", 50)
            .attr("y", 95)
            .text("Third Bag")
            .style('font-size', "21px");

        var rect = g.append("rect")
            .attr("x", 20)
            .attr("y", 80)
            .style("width", 10)
            .style("height", 10)
            .style("fill", COLORS[2]);


    }

})()