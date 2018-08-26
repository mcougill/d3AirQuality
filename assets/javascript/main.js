$(document).ready(function () {

    var apiKey = config.apiKey;


    var airData = 'http://api.airvisual.com/v2/nearest_city?lat=29.76&lon=-95.37&key=' + apiKey;

    //air quality ajax call
    $.ajax({
        url: airData,
        method: "GET",
    })
        .done(function (response) {
            console.log(response);
        })
})