$(document).ready(function() {
    if (location.protocol === 'https:') {
        alert('Due to the https restriction of openweathermap.org api, the app won\'t work under HTTP over SSL protocol (https://codepen.io). Please change the current protocol to http://codepen.io to get it work.');
    }
    else {
        getWeatherInfo('metric');
    }
});

const callApi = function(url, callback) {
    $.ajax({
        method: "GET",
        url: url,
        dataType: "jsonp"
    })
        .done(callback)
        .fail(function() {
            alert( "GET request failed!" );
        });
};

const getWeatherInfo = function(strUnits) {
    var link = 'http://api.openweathermap.org/data/2.5/weather?';
    // Brisbane, Australia
    var cityID = 'id=7839562';
    // Celsius: units=metric, Fahrenheit: units=imperial
    var units = '&units='+strUnits;
    //  English: lang=en
    var lang = '&lang=en';
    var appID = '&APPID=d201b3efd2f2e7cac91ea989da17014d';
    callApi(link+cityID+units+lang+appID, function(data) {
        $('p.w-location').html(data.name+', '+data.sys.country);
        $('.w-icon').html('<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" alt="Icon depicting current weather.">');
        $('p.w-desc').html(data.weather[0].description);
        $('p.w-temp').html(data.main.temp);
        $('p.w-min-max').html(data.main.temp_min+' - '+data.main.temp_max);
        $('.btn-units').attr('style', 'display: inline-block !important');
        switch(strUnits) {
            case 'metric':
                $('p.w-temp').html(data.main.temp+' &#176;C');
                $('.btn-units').html('Toggle to Fahrenheit');
                $('.btn-units').on('click', function() {
                    getWeatherInfo('imperial');
                });
                break;
            case 'imperial':
                $('p.w-temp').html(data.main.temp+' &#176;F');
                $('.btn-units').html('Toggle to Celsius');
                $('.btn-units').on('click', function() {
                    getWeatherInfo('metric');
                });
                break;
        };
    });
};