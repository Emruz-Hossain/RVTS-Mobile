/*----------This Return Icon from Weather Code-----------
        Icon Source: https://erikflowers.github.io/weather-icons/
        Weather Source: https://openweathermap.org/weather-conditions
---------------------------------------------------------*/

function getIconByCode(weather_code , shift)
{
    //-----------------Thunder Storm (Code: 2XX)-------------------
    switch (weather_code) {
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
        {
            if(shift=="day")
                return "wi-day-thunderstorm";
            else
                return "wi-night-alt-thunderstorm";
            break;
        }
    //-----------------Drizzle (Code: 3XX)-------------------
        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
        {
            if(shift=="day")
                return "wi-day-rain-mix";
            else
                return "wi-night-alt-rain-mix";
            break;
        }
    //----------------- Rain(Code: 5XX)-------------------
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        {
            if(shift=="day")
                return "wi-day-rain";
            else
                return "wi-night-alt-rain";
            break;
        }
        case 511:
        {
            if(shift=="day")
                return "wi-day-rain-wind";
            else
                return "wi-night-alt-rain-wind";
            break;
        }
        case 520:
        case 521:
        case 522:
        case 531:
        {
            if(shift=="day")
                return "wi-day-showers";
            else
                return "wi-night-alt-showers";
            break;
        }
    //----------------- Snow(Code: 6XX)-------------------
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
        {
            if(shift=="day")
                return "wi-day-snow";
            else
                return "wi-night-alt-snow";
            break;
        }
    //----------------- Atmostphere(Code: 7XX)-------------------
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
        {
            if(shift=="day")
                return "wi-day-fog";
            else
                return "wi-night-fog";
            break;
        }
    //----------------- Clear(Code: 800 )-------------------
        case 800:
        {
            if(shift=="day")
                return "wi-day-sunny";
            else
                return "wi-night-clear";
            break;
        }
    //----------------- Clouds (Code: 80X)-------------------
        case 801:
        case 802:
        case 803:
        {
            if(shift=="day")
                return "wi-day-cloudy";
            else
                return "wi-night-alt-partly-cloudy";
            break;
        }
        case 804:
        {
            if(shift=="day")
                return "wi-day-cloudy-high";
            else
                return "wi-night-alt-cloudy-high";
            break;
        }
    //----------------- Extreem(Code: 9XX)------------------- 
        case 900:
        case 901:
        case 902:
        case 960:
        case 961:
        case 962:
        {
            if(shift=="day")
                return "wi-day-thunderstorm";
            else
                return "wi-night-alt-thunderstorm";
            break;
        }
        case 904:
        {

            if(shift=="day")
                return "wi-hot";
            else
                return "wi-hot";
            break;
        }
        case 903:
        {

            if(shift=="day")
                return "wi-snowflake-cold";
            else
                return "wi-snowflake-cold";
            break;
        }
        case 905:
        {

            if(shift=="day")
                return "wi-day-windy";
            else
                return "wi-night-alt-cloudy-windy";
            break;
        }
        case 906:
        {

            if(shift=="day")
                return "wi-day-hail";
            else
                return "wi-night-alt-hail";
            break;
        }

        default:
        {
            return "wi-cloudy";
            break;
        }
    }    
}