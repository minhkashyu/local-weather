$(document).ready(function() {
    getWeatherInfo($('.btn-units').attr('data-unit'), $('#selLocation').val());

    function changeColour (city) {
        if (!city.id) {
            return city.text;
        }
        var $city = $(
            '<span style="color: #333;"> ' + city.text + '</span>'
        );
        return $city;
    }

    $('#selLocation').select2({
        templateResult: changeColour
    });

    $('#selLocation').on('change', function() {
        getWeatherInfo($('.btn-units').attr('data-unit'), $(this).val());
    });

    $('.btn-units').on('click', function() {
        getWeatherInfo($('.btn-units').attr('data-unit'), $('#selLocation').val());
    });
});

var callApi = function(url, callback) {
    $.ajax({
        method: "GET",
        url: url,
        dataType: "jsonp"
    })
        .done(callback)
        .fail(function(e) {
            alert( "GET request failed!" );
        });
};

var getWeatherInfo = function (strUnits, cityID) {
    var link = 'https://api.openweathermap.org/data/2.5/weather?';
    // Brisbane, Australia
    var strCityID = 'id=' + cityID;
    // Celsius: units=metric, Fahrenheit: units=imperial
    var newUnit = (strUnits == 'metric' ? 'imperial' : 'metric');
    var newSymbol = (strUnits == 'metric' ? '°F' : '°C');
    var newText = (strUnits == 'metric' ? 'Toggle to Celsius' : 'Toggle to Fahrenheit');
    var units = '&units=' + newUnit;
    //  English: lang=en
    var lang = '&lang=en';
    var appID = '&APPID=d201b3efd2f2e7cac91ea989da17014d';

    callApi(link + strCityID + units + lang + appID, function (data) {
        $('p.w-location').html(data.name + ', ' + data.sys.country);
        $('.w-icon').html('<img src="https://openweathermap.org/img/w/' + data.weather[0].icon + '.png" alt="Icon depicting current weather.">');
        $('p.w-desc').html(data.weather[0].description);
        $('p.w-temp').html(data.main.temp + ' ' + newSymbol);
        $('p.w-min-max').html(data.main.temp_min + ' ' + newSymbol + ' - ' + data.main.temp_max + ' ' + newSymbol);
        $('.btn-units').attr('style', 'display: inline-block !important');
        $('.btn-units').attr('data-unit', newUnit);
        $('.btn-units').html(newText);
    });
};
