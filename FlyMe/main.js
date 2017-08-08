(function () {
    document.getElementById("submit").onclick = function () {
        var info = parseInformation();
        var inputs = validateInputs();
        var origin = CITIES[inputs['source-select']];
        var dest = CITIES[inputs['dest-select']];
        var database = firebase.database();
        var ref = database.ref();
        ref.orderByChild('origin_dest')
            .equalTo(origin + '_' + dest).once("value", function (snap) {
                var ans = run(info, snap.val(), inputs)
                var ansSpace = document.getElementById('ansSpace');
                ansSpace.innerHTML = ans['message'];

            })

        hideParams();

        //var tableEle = document.getElementById('tableSpace');
        //airportDayTable(rel_data, 'delay_data', tableEle);
        //var barData = transformBarData(rel_data['delay_data'])
        //generateBarGraph(barData[0], barData[1]);
    }
    // Run the algorithm to get an answer
    // keep it simple and transparent at first
    // for a direct flight, we want just the airline
    // for connecting, we want airline and connecting flight
    // we also want the best day
    var MONTHS = {
        'April': 3,
        'August': 7,
        'December': 11,
        'February': 1,
        'January': 0,
        'July': 6,
        'June': 5,
        'March': 2,
        'May': 4,
        'November': 10,
        'October': 9,
        'September': 8
    };
    var DAYS = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7
    };

    function run(info, data, inputs) {
        if (!data) {
            return {
                "error": true,
                "message": "No flights processed for that route"
            }
        } else {
            var bagCosts = computeBaggage(info['nBags']);
            //we will compute optimal airline for the day chosen
            var month = MONTHS[inputs['month-select']];
            var day = DAYS[inputs['day-select']];
            var procRes = processComputedData(data, day, month);
            if (info['direct']) {
                var relData = [];
                for (var i in procRes) {
                    if (procRes[i]['direct'] == "true") {
                        relData.push(procRes[i])
                    }
                }

                var opt = computeDirect(relData,
                    info['nBags'],
                    info['shortFlightTime'],
                    info['onTime'],
                    info['flexTime']);
                var message = 'Optimal airline is ' + CARRIERS[opt['airline']];
                return {
                    "error": false,
                    "message": message
                }
            }
            return {
                "error": false,
                "message": 'none'
            }
        }
    }

    function computeDirect(relData, nBags, flightTime, onTime, flexTimes) {
        //going to normalize each calculation
        var normedData = normalizeCalcs(relData)
        var ind = 0;
        var min_score = 0;
        console.log(normedData);
        for (var i = 0; i < normedData.length; i++) {
            var score = 0;
            score += (6 - flightTime) * normedData[i]['calc']['flightTime_data'];
            score += (6 - onTime) * normedData[i]['calc']['delay'];
            score += -1 * (6 - flexTimes) * normedData[i]['calc']['nFlights_data'];
            if (i == 0) {
                min_score = score;
            } else {
                if (score < min_score) {
                    min_score = score;
                    ind = i;
                }
            }
        }

        return normedData[ind];

    }

    function normalizeCalcs(data) {
        minMax = {};
        for (var calc in data[0]['calc']) {
            minMax[calc] = {};
            minMax[calc]['data'] = [];
        }
        for (var d = 0; d < data.length; d++) {
            for (var calc in data[d]['calc']) {
                minMax[calc]['data'].push(parseFloat(data[d]['calc'][calc]));
            }
        }
        for (calc in minMax) {
            minMax[calc]['min'] = Math.min.apply(null, minMax[calc]['data'])
            minMax[calc]['max'] = Math.max.apply(null, minMax[calc]['data'])
        }
        var normData = data;
        for (d = 0; d < data.length; d++) {
            for (calc in data[d]['calc']) {
                normData[d]['calc'][calc] = normPoint(parseFloat(data[d]['calc'][calc]),
                    minMax[calc]['min'],
                    minMax[calc]['max']);
            }
        }
        return normData;
    }

    function normPoint(val, min, max) {
        return (val - min) / (max - min)
    }
    //process computed data which has delay data and
    //time data
    function processComputedData(data, day, month) {
        var results = [];
        for (var i in data) {
            if (data[i]['day'] == day) {
                results.push(data[i])
            }
        }
        return results;
    }

    function computeBaggage(nBags) {
        ans = {}
        for (airline in BAGGAGE) {
            ans[airline] = BAGGAGE[airline][nBags]
        }
        return ans
    }

    function transformBarData(data) {
        var barData = [];
        var names = [];
        for (var j in data) {
            var temp_list = [];
            names.push(AIRPORTS[j]);
            for (var i in data[j]) {
                temp_list.push({
                    'x': (i - 1) * 3,
                    'y': parseFloat(data[j][i])
                });
            }
            barData.push(temp_list);
        }
        return [barData, names];
    }

    function airportDayTable(rel_data, key, tableEle) {
        var toTable = [
            ['City', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
        ];
        for (var i in rel_data[key]) {
            var row = [AIRPORTS[i]];
            for (var j in rel_data[key][i]) {
                row.push(rel_data[key][i][j]);
            }
            toTable.push(row);
        }

        generateTable(toTable, singleDecimal, tableEle);
    }

    function singleDecimal(string) {
        // parse a string to only a single decimal
        // redo this with local functions
        var ind = string.length;
        for (var i = 0; i < string.length; i++) {
            if (string[i] == '.') {
                ind = i;
            }
        }
        var ans = '';
        if (ind < string.length) {
            for (var j = 0; j < ind + 2; j++) {
                ans += string[j];
            }
        } else {
            ans = string;
        }
        return ans;
    }


    var paramsBtn = document.getElementById('paramsBtn')
    paramsBtn.onclick = function () {
        showParams();
    }

    function hideParams() {
        var params = document.getElementById('params');
        params.style.display = 'none';
        paramsBtn.style.display = '';
    }

    function showParams() {
        var params = document.getElementById('params');
        params.style.display = '';
        paramsBtn.style.display = 'none';
    }

    function parseInformation() {
        cats = ['onTime', 'connectLength', 'flexTime', 'shortFlightTime', 'airportQuality', 'airlineQuality', 'nBags'];
        cat_ans = {}
        for (var i = 0; i < cats.length; i++) {
            cat_ans[cats[i]] = parseInt(document.getElementById(cats[i]).value)
        }
        cat_ans['direct'] = document.getElementById('directCheck').checked;
        cat_ans['connecting'] = document.getElementById('connectingCheck').checked;
        return cat_ans
    }


    //validate param arguments
    function validateInputs() {
        inputs = ['source-select', 'dest-select', 'month-select', 'day-select']
        valid_inputs = {};
        for (var i = 0; i < inputs.length; i++) {
            valid_inputs[inputs[i]] = document.getElementById(inputs[i]).value;
            if (valid_inputs[inputs[i]] === '') {
                alert('Need valid input for ' + inputs[i]);
                return false
            }
        }
        return valid_inputs
    }

    function generateBarGraph(dataList, names) {
        var delta = 3;
        var svg = d3.select("svg"),
            margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 40
            },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        var x = d3.scaleLinear().rangeRound([0, width]);
        var y = d3.scaleLinear().rangeRound([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        //need to get maxX and maxY
        maxX = d3.max(dataList, function (d) {
            return d3.max(d, function (e) {
                return e.x + delta;
            });
        })

        maxY = d3.max(dataList, function (d) {
            return d3.max(d, function (e) {
                return e.y;
            });
        })
        x.domain([0, maxX]);
        y.domain([0, maxY]);
        //http://bl.ocks.org/jfreyre/b1882159636cc9e1283a
        COLORS = d3.scaleLinear().domain([0, dataList.length])
            .interpolate(d3.interpolateHslLong)
            .range(['red', 'blue']);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10))


        for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];

            g.selectAll(".bar" + i.toString())
                .data(data)
                .enter().append("rect")
                .attr("class", "bar" + i.toString())
                .attr("x", function (d) {
                    return x(d.x + delta / 15 * i);
                })
                .attr("y", function (d) {
                    return y(d.y);
                })
                .attr("width", x(0.15))
                .attr("height", function (d) {
                    return height - y(d.y);
                })
                .attr("fill", function (d) {
                    return COLORS(i);
                })
                .attr("data-legend", function (d) {
                    return names[i]
                });
        }

        var legendRectSize = 18;
        var legendSpacing = 4;
        var legend = svg.selectAll('.legend')
            .data(COLORS.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function (d, i) {
                var height_ = legendRectSize + legendSpacing;
                var offset_ = height_ * COLORS.domain().length / 2;
                var horz = -2 * legendRectSize;
                var vert = i * height_ - offset_;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize);

        legend.append('text')
            .attr('x', legendRectSize + legendSpacing) // NEW
            .attr('y', legendRectSize - legendSpacing) // NEW
            .text(function (d) {
                return d;
            });

    }

    // Function generate table from object which is in the format
    // [header,row1, row2,...]
    function generateTable(arr, parseFunc, table) {
        table.innerHTML = '';
        var tab = document.createElement('table');
        tab.className = "table";
        var head = document.createElement('thead');
        var body = document.createElement('tbody');
        var row = document.createElement('tr');
        var i;
        for (i = 0; i < arr[0].length; i++) {
            var th = document.createElement('th');
            th.innerHTML = arr[0][i];
            row.appendChild(th);
        }
        head.appendChild(row);
        for (i = 1; i < arr.length; i++) {
            row = document.createElement('tr');
            for (var j = 0; j < arr[i].length; j++) {
                var td = document.createElement('td');
                td.innerHTML = parseFunc(arr[i][j]);
                row.appendChild(td);
            }
            body.appendChild(row);
        }
        tab.appendChild(head);
        tab.appendChild(body);
        table.appendChild(tab);
    }
})();