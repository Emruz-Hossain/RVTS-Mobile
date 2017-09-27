$(function(){
 $("#sideBar").enhanceWithin().panel();
    $("#sideBar").on( "panelopen", function( event, ui ) {
    	$( ".sideBarIndicator").removeClass("ui-icon-grid").addClass("ui-icon-delete");
        $(".sideBarIndicator").css("left","250px");
    });
    
    $("#sideBar").on( "panelclose", function( event, ui ) {
    	$( ".sideBarIndicator").removeClass("ui-icon-delete").addClass("ui-icon-grid");
        $(".sideBarIndicator").css("left","5px");
    });
});

///-----------------------Vessel Status Control--------------------
var VesselName=["Test Vessel 1","Test Vessel 2","Test Vessel 3", "Test Vessel 4","Test Vessel 5"];
var Capacity=["450","300","600","800","500"];
var CurrentLoad=[80,100,60,70,105];
var Status=["Safe","Safe","Safe","Safe","Overloaded"];
var selectedVessel=0;
var overLoaded="Overloaded";
function setVesselStatus() {
    $("#vessel-status-result").css("display","block");
    selectedVessel=$("#vessel-selector").val();
    var vesselId="#"+selectedVessel;
    selectedVessel=selectedVessel-1;
    $("#vs-name").text(VesselName[selectedVessel]);
    $("#vs-capacity").text("Capacity: "+Capacity[selectedVessel]+" Tons");
    $("#vs-load").text("Current Load: "+CurrentLoad[selectedVessel]+"%");
    $("#vs-status").text("Status: "+Status[selectedVessel]);
    if(Status[selectedVessel]==overLoaded)
    {
         $("#vessel-status-result").css("opacity","0.8");
        $("#vessel-status-result").removeClass("w3-teal");
        $("#vessel-status-result").addClass("w3-red");
    }
    else
    {
         $("#vessel-status-result").css("opacity","1");
         $("#vessel-status-result").removeClass("w3-red");
        $("#vessel-status-result").addClass("w3-teal");
    }
}

//----------------------------Weather----------------------------
var weatherApiKey="f50e774415570d11ac5c085a3f1907ba";
var dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getWeatherByCity()
{
        var now = new Date();
        var hour=now.getHours();
        var shift;
        if(hour<6||hour>18)
            shift="night";
        else
            shift="day";
    var city= $("#city-selector").val();
    var queryString="http://api.openweathermap.org/data/2.5/weather?q="+city+",BD&appid="+weatherApiKey+'&units=metric';
    $.getJSON(queryString,function (weather) {
        var description=ModifyFirstLetter(weather.weather[0].description);
        var icon=getIconByCode(weather.weather[0].id,shift);
        var wind=weather.wind.speed;
        var temp=weather.main.temp;
        var temp_max=weather.main.temp_max;
        var temp_min=weather.main.temp_min;

        $("#wm-icon").removeClass();
        $("#wm-icon").addClass("wi "+icon);

        $("#wm-temp").text(temp);

        $("#wm-status").text(description);

        $("#wm-mn-temp").text("Min: "+temp_min);
        $("#wm-mx-temp").text("Max: "+temp_max);

        $("#wm-wind").text("Wind: "+wind+"kmph");

        $("#city-name").text(city+", Bangladesh");

    }).fail(function (err){
        console.log(err);
    }) ; 
    var queryString="http://api.openweathermap.org/data/2.5/forecast?q="+city+",BD&appid="+weatherApiKey+'&units=metric';
    $.getJSON(queryString,function (forecast) {
        $("#ft-body").html("");
        for(var i=0;i<forecast.list.length;i++)
        {
            var date=forecast.list[i].dt_txt;
            var dateTime=date.split(" ");
            hour=dateTime[1].split(":");
            if(hour[0]>18||hour[0]<6)
                shift="night";
            else
                shift="day";
            var icon=getIconByCode(forecast.list[i].weather[0].id,shift);
            var details=ModifyFirstLetter(forecast.list[i].weather[0].description);
            $("#ft-body").append("<tr><td class=\"w3-center \" style=\"padding-top:40px;\">"+dateTime[0]+"</td><td class=\"w3-center\"style=\"padding-top:40px;\">"+dateTime[1]+"</td><td class=\"w3-center\"><i class=\"wi "+icon+"\" style=\"font-size: 18pt;\"></i><p style=\"font-size: 14pt;\"><span>28</span><span><i class=\"wi wi-celsius\"></i></span></p><p>"+details+"</p></td></tr>");

        }
    }).fail(function (err){
        console.log(err);
    }) ;
    return false;  
}

function ModifyFirstLetter(str)
{
    var temp=str.split(" ");
    var finalString="";
    for(var i=0;i<temp.length;i++)
    {
        if(i>0)
            finalString+=" ";
        
        finalString+=temp[i][0].toUpperCase();
        for(var j=1;j<temp[i].length;j++)
            finalString+=temp[i][j];
    }
    return finalString;
}

function showSchedule(){
    $("#st-body").html("");
    for(var i=0;i<10;i++)
    {
        $("#st-body").append("<tr><td class=\"st-col-1\">"+i+"</td><td class=\"st-col-2\">Test Vessel "+i+"</td><td class=\"st-col-3\">Dhaka<br>15:00</td> <td class=\"st-col-4\">Khulna<br>06:00</td></tr>");
    }
}
// ----------------------Track Vessel Page--------------------------
var DemoLat=[22.34343,22.24353,22.32343,22.44343,22.14343,22.74343];
var DemoLng=[91.23432,91.21432,91.03032,91.03532,91.23432,91.13432];
var map,marker;
function drawMap(){
    var windowHeight=$(window).height();
    $("#map-canvas").css("height",windowHeight-100);
    $("#map-button").css("margin-top",(windowHeight)/2);
    var  vesselId=$("#track-vessel-selector").val();

    var latlng=new google.maps.LatLng(DemoLat[vesselId],DemoLng[vesselId]);
    var myOptions={
        zoom:10,
        center:latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        
    }
    map=new google.maps.Map(document.getElementById("map-canvas"),myOptions);
    marker=new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Test Vessel 1"
    });
    console.log("Map drawn");
}

function moveMarker() {
    console.log("Marker moved");
    var  vesselId=$("#track-vessel-selector").val();
    var rId=0;
    rid=parseInt(vesselId);
    var vId=rid+1;
    console.log(vId);
    marker.setPosition(new google.maps.LatLng(DemoLat[rid],DemoLng[rid]));
    map.panTo(new google.maps.LatLng(DemoLat[rid],DemoLng[rid]));
    $("#map-vessel-name").text("Test Vessel "+vId);
}

function getData()
{
	
    var token= "http://104.244.120.111/~emruzcom/getdata.php";
    $.get(token, function (data) {
        console.log(data);  
    });
}