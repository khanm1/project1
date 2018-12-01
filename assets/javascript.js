/*******************************
 Global Variables & Default Locations
 *******************************/
// Variable for global map marker
var map;
// Variable for all of the locations
var Location;
// Declaring Chicago ClearPath app token & secret token
var appToken;
var secretToken;
// Default Chicago Ward Locations that are displayed on the map
var defaultLocations = [
    {
        name: 'Ward 1',
        lat: 41.910400, long: -87.695970
    },
    {
        name: 'Ward 2',
        lat: 41.907082, long: -87.667809
    },
    {
        name: 'Ward 3',
        lat: 41.801880, long: -87.652229
    },
    {
        name: 'Ward 4',
        lat: 41.831030, long: -87.615400
    },
    {
        name: 'Ward 5',
        lat: 41.766050, long: -87.576300
    },
    {
        name: 'Ward 6',
        lat: 41.751330, long: -87.607320
    },
    {
        name: 'Ward 7',
        lat: 41.722100, long: -87.568160
    }
];
/*******************************
 Chicago Data Portal API
 *******************************/
Location = function(data) {
    var ward = this;
    this.name = data.name;
    this.lat = data.lat;
    this.long = data.long;
    this.URL = '';
    this.street = '';
    this.date = '';
    this.type = '';
    // By default every marker will be visible
    this.visible = ko.observable(true);
    // Chicago Data Portal API credentials.
    // appToken = 'YzC8UJUmnG4U64Fqp3tvSS5Lr';
     // secretToken = 'Xx1qRfB6ufhh8k28yPzZiJ92iZTwKjpteGCg';
    // Chicago Data Portal API Link to call.
    var chicagoDataURL = 'https://api1.chicagopolice.org/clearpath/api/1.0/crimes/major';
    var wardBtn;

    $("#exampleFormControlSelect1").on("change", function () {
        wardBtn = $(this).val();
        test();
        console.log(wardBtn);
    })

function test() {


    $.ajax({
        url: chicagoDataURL,
        method: "GET"
    }).then(function (response) {

        // var results = data.array;
        // ward.URL = results.url;
        console.log("testing" + response.length);
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].ward);
            var xCoord = response[i].xCoordinate;
            var yCoord = response[i].yCoordinate;
            if (response[i].ward = wardBtn){
                console.log(response[i]);
                
           
                // // var p =$("<p>");
                // console.log("this is x" +xCoord);
                // console.log("this is y "+ yCoord);
                // // $("#map").append(p);

             console.log (yCoord);
             console.log(xCoord);
            }
         
        }
    }
    )
};
    this.infoWindow = new google.maps.InfoWindow({content: ward.contentString});
    // Places the marker to it's designed location on the map along with it's title.
    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.lat, data.long),
        map: map,
        title: data.name
    });
    // Only makes the one selected marker visible.
    this.showMarker = ko.computed(function() {
        if(this.visible() === true) {
            this.marker.setMap(map);
        } else {
            this.marker.setMap(null);
        }
        return true;
    }, this);
    // When marker is clicked on open up infowindow designated to the marker with it's information.
    this.marker.addListener('click', function(){
        ward.contentString = '<div class="info-window-content"><div class="title"><b>' + data.name + "</b></div>" +
            '<div class="content"><a href="' + ward.URL +'">' + ward.URL + "</a></div>" +
            '<div class="content">' + ward.street + "</div>" +
            '<div class="content">' + ward.date + "</div>" +
            '<div class="content"><a href="tel:' + ward.type +'">' + ward.type +"</a></div></div>";
        ward.infoWindow.setContent(ward.contentString);
        ward.infoWindow.open(map, this);
        ward.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            ward.marker.setAnimation(null);
        }, 2100);
    });
    // Makes the marker bounce animation whenever clicked.
    this.bounce = function(place) {
        google.maps.event.trigger(ward.marker, 'click');
    };
};
/*******************************
 Google Maps API
 *******************************/
function ViewModel(){
    var ward = this;
    //Holds value for list togglings
    this.toggleSymbol = ko.observable('hide');
    // Search term is blank by default
    this.searchTerm = ko.observable('');
    // Initializes a blank array for locations
    this.locationList = ko.observableArray([]);
    // Create a styles array to use with the map.
    var styles = [{
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [{"color": "#f7f1df"}]
    }, {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{"color": "#d0e3b4"}]
    }, {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [{"color": "#fbd3da"}]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{"color": "#bde6ab"}]
    }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{"visibility": "on"}]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#ffe15f"}]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#efd151"}]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#ffffff"}]
    }, {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [{"color": "black"}]
    }, {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#cfb2db"}]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#a2daf2"}]
    }];
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.970329, lng: -87.678778},
        zoom: 16,
        styles: styles,
        mapTypeControl: false
    });
    // Centers map when compass is clicked on.
    this.centerMap = function(){
        map.setCenter({lat: 41.970329, lng: -87.678778});
    };
    //toggles the list view
    this.listToggle = function() {
        if(ward.toggleSymbol() === 'hide') {
            ward.toggleSymbol('show');
        } else {
            ward.toggleSymbol('hide');
        }
    };
    // Pushes default locations array into new location list array
    defaultLocations.forEach(function(locationItem){
        ward.locationList.push( new Location(locationItem));
    });
    // Searches for what user typed in the input bar using the locationlist array.
    // Only displaying the exact item results that user type if available in the locationlist array.
    this.filteredList = ko.computed( function() {
        var filter = ward.searchTerm().toLowerCase();
        if (!filter) {
            ward.locationList().forEach(function(locationItem){
                locationItem.visible(true);
            });
            return ward.locationList();
        } else {
            return ko.utils.arrayFilter(ward.locationList(), function(locationItem) {
                var string = locationItem.name.toLowerCase();
                var result = (string.search(filter) >= 0);
                locationItem.visible(result);
                return result;
            });
        }
    }, ward);
}
// Error handling if map doesn't load.
function errorHandlingMap() {
    $('#map').html('We had trouble loading Google Maps. Please refresh your browser and try again.');
}
function startApp() {
    ko.applyBindings(new ViewModel());
}
 