(function () {
    window.onload = function () {
        delayPlot();
        baggagePlot();
    }

    function delayPlot() {
        var DAYS = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
        var svg = d3.select("#delaySvg");
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        };
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
                return d.day - 1;
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

            var COLORS = ['red', 'orange'];
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
                    .attr('opacity', '.4')
            }
        });

    }

    function baggagePlot() {
        // baggage costs by airline
        var svg = d3.select("#baggageSvg");
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        };
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
                d['index'] = +d[''];
                tickValues.push(d['index'] + .25);
            })
            x.domain([0, d3.max(data, function (d) {
                return d.index + .5;
            })]);

            y.domain([0, d3.max(data, function (d) {
                return d.bagOne;
            })]);


            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x)
                    .tickValues(tickValues)
                    .tickFormat(function (d, i) {
                        return data[i]['airline']
                    }));


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
                .attr("fill", "steelblue")
        });

    }

})()