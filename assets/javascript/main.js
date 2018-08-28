$(document).ready(function () {

    var apiKey = config.apiKey;

    //air quality index array


    var cityObj =
        [{
            "name": "Houston",
            "lat": "29.76",
            "lon": "-95.37",
            "aqi": ""
        },
        {
            "name": "Los Angeles",
            "lat": "34.05",
            "lon": "-118.24",
            "aqi": ""
        },
        {
            "name": "Chicago",
            "lat": "41.87957",
            "lon": "-87.716406",
            "aqi": "",
        },
        {
            "name": "New York City",
            "lat": "40.753",
            "lon": "-87.716406",
            "aqi": ""
        }

        ];



    for (var i = 0; i < cityObj.length; i++) {
        var airData = 'http://api.airvisual.com/v2/nearest_city?lat=' + cityObj[i].lat + '&lon=' + cityObj[i].lon + '&key=' + apiKey;

        //air quality ajax call
        $.ajax({
            url: airData,
            method: "GET",
            async: false
        })
            .done(function (response) {
                cityObj[i].aqi = response.data.current.pollution.aqius
            });
    }

    var cities = cityObj.map(function (d) {
        return d.name
    });

    var margin = { left: 80, right: 20, top: 50, bottom: 100 };

    var fullWidth = 600;
    var fullHeight = 400;

    var width = fullWidth - margin.right - margin.left;
    var height = fullHeight - margin.top - margin.bottom;

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", fullWidth)
        .attr("height", fullHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X Label
    svg.append("text")
        .attr("y", height + 70)
        .attr("x", width / 2)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("City");

    //y label
    svg.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Air Quality Index (AQI)");

    var cityScale = d3.scaleBand()
        .domain(cities)
        .range([0, width])
        .paddingInner(0.1);

    var bandwidth = cityScale.bandwidth();

    var maxAQI = d3.max(cityObj, function (d) {
        return d.aqi
    });

    var aqiScale = d3.scaleLinear()
        .domain([0, maxAQI])
        .range([height, 0])
        .nice();

    var xAxis = d3.axisBottom(cityScale);
    var yAxis = d3.axisLeft(aqiScale);

    svg.append("g")
        // .classed("x axis", true)
        // .attr("transform", "translate(0" + height + ")")
        // .call(xAxis);
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)");

    var yAxisEle = svg.append("g")
        .classed("y axis", true)
        .call(yAxis)

    var barHolder = svg.append("g")
        .classed("bar-holder", true);

    var colors = d3.scaleLinear()
        .domain([0, cityObj.length])
        .range(["#bf823b", "#cc546d"]);

    

    var bars = barHolder.selectAll("rect.bar")
        .data(cityObj)
        .enter().append("rect")
        .classed("bar", true)
        .attr("x", function (d, i) {
            return cityScale(d.name)
        })
        .attr("width", bandwidth)
        .attr("y", function (d) {
            return aqiScale(d.aqi);
        })
        .attr("height", function (d) {
            return height - aqiScale(d.aqi);
        })
        .attr("fill", function (d, i) {
            return colors(i);
        })

});



