var mylongitude, mylatitude;

function ReloadPage() {
	location.reload()
	};

$('#geo').on("pageshow",function(){
navigator.geolocation.getCurrentPosition(function(position){
mylongitude = position.coords.longitude;
mylatitude = position.coords.latitude;
var optionen = {
zoom: 8,
center: new google.maps.LatLng(
mylatitude, mylongitude),
mapTypeId : google.maps.MapTypeId.ROADMAP
};
karte = new google.maps.Map(document.getElementById('karte'), optionen);

//Markierung der Standorte Sympany
$.getJSON('faddress.json', function(json){
var erg = json;
$.each(json, function(i, daten){
marker = new google.maps.Marker({

color:'green',
title:i,
map: karte,
position: new google.maps.LatLng(daten.Position.Latitude, daten.Position.Longitude),
animation: google.maps.Animation.DROP
});


});

});
infoWindow= new google.maps.InfoWindow({
content:"Sie befinden sich hier"
}),
//Eigener Standort markieren
marker = new google.maps.Marker({
title:"Aktuelle Position",
map: karte,
position: new google.maps.LatLng(mylatitude, mylongitude),
animation: google.maps.Animation.BOUNCE,

});

infoWindow.open(karte, marker);

});

});

//Berechnet die differenz zu dem aktuellen Standort (allerdings mit String "km bzw m" eventuell für
//Sortierung auf Zahlen reduzieren

var entfernungBerechnen = function(mylon, mylat, longNew, latNew) {
erdRadius = 6371;
mylon = mylon * (Math.PI/180);
mylat = mylat * (Math.PI/180);
longNew = longNew * (Math.PI/180);
latNew = latNew * (Math.PI/180);
x0 = mylon * erdRadius * Math.cos(mylat);
y0 = mylat * erdRadius;
x1 = longNew * erdRadius * Math.cos(latNew);
y1 = latNew * erdRadius;
dx = x0-x1;
dy = y0-y1;
d = Math.sqrt((dx*dx)+(dy*dy));
if(d < 1 ) {
	return Math.round(d*100)+" m";
}
else {
	return Math.round(d*10)/10+" km";
	}
};
