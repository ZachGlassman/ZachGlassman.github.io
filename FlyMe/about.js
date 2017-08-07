(function () {
    window.onload = function () {
        delayPlot();
        baggagePlot();
    }
    var margin = {
        top: 20,
        right: 20,
        bottom: 150,
        left: 140
    };
    var COLORS = ['#c43a64', '#ce7c46', "#ccce5c"];

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
                    }));

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
                    }));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y));

            g.selectAll(".bar2")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar2")
                .attr("x", function (d) {
                    return x(d.index);
                })
                .attr("y", function (d) {
                    return y(d.bagExtra);
                })
                .attr("width", x(0.5))
                .attr("height", function (d) {
                    return height - y(d.bagExtra);
                })
                .attr("fill", COLORS[2])

            g.selectAll(".bar1")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar1")
                .attr("x", function (d) {
                    return x(d.index);
                })
                .attr("y", function (d) {
                    return y(d.bagTwo);
                })
                .attr("width", x(0.5))
                .attr("height", function (d) {
                    return height - y(d.bagTwo);
                })
                .attr("fill", COLORS[1])


            g.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.index);
                })
                .attr("y", function (d) {
                    return y(d.bagOne);
                })
                .attr("width", x(0.5))
                .attr("height", function (d) {
                    return height - y(d.bagOne);
                })
                .attr("fill", COLORS[0]);


        });

    }

})()