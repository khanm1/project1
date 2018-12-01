var config = {
    apiKey: "AIzaSyDwz0fLsftC85zrP3nu4pIOFKYQC8x7nc0",
    authDomain: "chicago-api.firebaseapp.com",
    databaseURL: "https://chicago-api.firebaseio.com",
    projectId: "chicago-api",
    storageBucket: "chicago-api.appspot.com",
    messagingSenderId: "848623919864"
  };
  firebase.initializeApp(config);

var crimeData = firebase.database();

// crimeData.ref().set({}) 
// clears firebase




var chicagoDataURL = 'https://data.cityofchicago.org/resource/6zsd-86xi.json';
var wardBtn;


var markers = [];


var defaultLocations = {

    lat: [],
    long: [],
    ward: []
};
var yArray = [];
var userName;
var userEmail;




$("#exampleFormControlSelect1").on("change", function () {
    DeleteMarkers();
    clearCrimeDiv();
    wardBtn = $(this).val();
    test(wardBtn);
    console.log(wardBtn);
})


$("#submitButton").on("click",function(event){
    event.preventDefault();
    userName = $("#formGroupExampleInput").val();
    userEmail = $("#formGroupExampleInput2").val();
    console.log(userName);
    console.log(userEmail);
    crimeData.ref().push({
        
        //Here im pushing the variables up to the firebase database under slightly different names// 
    
        User_Name: userName,
        User_Email: userEmail


})




});

function test(wardBtn) {
    var ward = this;




    //********************* */
    $.ajax({
        url: chicagoDataURL,
        method: "GET"
    }).then(function (response) {


        for (var i = 0; i < response.length; i++) {

            var lat = response[i].latitude;
            var long = response[i].longitude;
            var ward = response[i].ward;
            var crime = response[i].primary_type;
            var description = response[i].description;

            defaultLocations.lat[i] = lat;
            defaultLocations.long[i] = long;
            defaultLocations.ward[i] = ward;


            this.visible = ko.observable(false);


            if (defaultLocations.ward[i] === wardBtn) {


                this.visible = ko.observable(true);

                console.log("inside visible" + this.visible() + "lat " + defaultLocations.lat[i] + " long " + defaultLocations.long[i] + "ward " + defaultLocations.ward[i]);
                this.marker = new google.maps.Marker({
                    position: new google.maps.LatLng(defaultLocations.lat[i], defaultLocations.long[i]),
                    map: map,
                    title: defaultLocations.ward[i]
                })

                var newCrimeDiv = $("<div>").text(response[i].primary_type);
                var newCrimeDivTwo = $("<div>").text(response[i].description);
                var newCrimeDivThree = $("<div>").text("Date: " + response[i].date);
                var newCrimeDivFour = $("<div class='scoop'>").text("Arrest: " + response[i].arrest);
                var crimeBox = $("<div class='scoop2'>");
                $("#crimeDiv").append(newCrimeDiv, newCrimeDivTwo, newCrimeDivThree, newCrimeDivFour, crimeBox);




                //    newCrimeDiv.append(response[i].primary_type);
                //    newCrimeDiv.append(response[i].description);
                //    newCrimeDiv.append("<br>");
                //    $("#crimeDiv").append(crimeBox);

                ;


                markers.push(this.marker);

                if (this.visible() === true) {

                    setMapOnAll(map);
                }



            }

        }
    })
}
function clearCrimeDiv() {
    $("#crimeDiv").empty();
}
function DeleteMarkers() {
    //Loop through all the markers and remove the red pins
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
};
function setMapOnAll(map) {


    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);


    }
}

function ViewModel() {


    var ward = this;



    // Initializes a blank array for locations



    // Create a styles array to use with the map.
    var styles = [{
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [{ "color": "#f7f1df" }]
    }, {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{ "color": "#d0e3b4" }]
    }, {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [{ "visibility": "off" }]
    }, {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
    }, {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
    }, {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [{ "color": "#fbd3da" }]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#bde6ab" }]
    }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{ "visibility": "off" }]
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{ "visibility": "on" }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#ffe15f" }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#efd151" }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#ffffff" }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "black" }]
    }, {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#cfb2db" }]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#a2daf2" }]
    }];

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.970329, lng: -87.678778 },
        zoom: 10,  //Zach, I adjusted the zoom so it's easy to see it farther out
        styles: styles,
        mapTypeControl: false
    });

    // Centers map when compass is clicked on.
    this.centerMap = function () {
        map.setCenter({ lat: 41.970329, lng: -87.678778 });
    };


}



function startApp() {
    ko.applyBindings(new ViewModel());

}

