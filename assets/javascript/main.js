$(document).ready(function () {

    var apiKey = config.apiKey;

    //air quality index array
    var aqiArray = [];

    var cityObj =
        [{
            "name": "Houston",
            "lat": "29.76",
            "lon": "-95.37"
        },
        {
            "name": "Los Angeles",
            "lat": "34.05",
            "lon": "-118.24"
        },
        {
            "name": "Chicago",
            "lat": "41.87957",
            "lon": "-87.716406"
        },
        {
            "name": "New York City",
            "lat": "40.753",
            "lon": "-87.716406"
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
                aqiArray.push(response.data.current.pollution.aqius);
            });
    }

    console.log(aqiArray);

    var margin = { left: 80, right: 20, top: 50, bottom: 100 };

    var width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;


    var g = d3.select("#chart-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");




        
});



