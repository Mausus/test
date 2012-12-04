/* Globale Variabeln */

//lässt Adresse verschwinden
window.scrollTo(0,1);

var ip = "http://192.168.1.31/Examp/php/";

$("#karte").addClass("aktiv");
  
/*init der Kundendaten*/
$('#forom').ready(function() {
	$.ajax ({
	type: 'POST',
	url: ip +'start_init.php',
	dataType: 'json',
	success: function(data) {
		$('#vname').val(data.vname);
		$('#nname').val(data.nname);
		$('#strasse').val(data.strasse);
		$('#ort').val(data.ort);
		$('#email').val(data.email);
		$('#tel').val(data.tel);	
	}
});
return false;
});	
	
/*Abschicken und Aktualisieren der Form*/
$('#aktbtn').click(function() {
$('#forom').ready(function() {

	var form = $('#forom');
	var daten = form.serialize();
	
	$.post(ip + 'akt.php', daten, function(resp) {
	if(resp == "Daten wurden erfolgreich uebermittelt")
	alert(resp);
	else{
	
	}
	});
return false;
});
});


//////////////////Camera////////////////

var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64 encoded image data
  // console.log(imageData);

  // Get image handle
  var largeImage = document.getElementById('largepic');

  // Unhide image elements
  largeImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  largeImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved

function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI 
  // console.log(imageURI);

  // Get image handle
  var largeImage = document.getElementById('largepic');

  // Unhide image elements
  largeImage.style.display = 'block';

  // Show the captured photo
  // The inline CSS rules are used to resize the image
  largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { 
	quality: 50,
    destinationType: destinationType.DATA_URL 
    });
}

// A button will call this function
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { 
	quality: 50, 
    destinationType: destinationType.FILE_URI,
    sourceType: source 
    });
}

// Called if something bad happens.
// 
function onFail(message) {
  alert('Failed because: ' + message);
}

