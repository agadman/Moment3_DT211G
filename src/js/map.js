let map;
let geocoder;
let infowindow;
let marker;

/**
 * Funktion för att initiera kartan, geocoder och infowindow
 * Lägger till en eventlyssnare på sökknappen för att hämta adressen/värdet i input
 */
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 59.3293, lng: 18.0686 },
        zoom: 8,
    });

    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();

    document.getElementById("searchButton").addEventListener("click", () => {
        const address = document.getElementById("placeInput").value;
        geocodeAddress(address);
    });
}

/**
 * Använder geocode för att översätta adressen till lat/lng och placera markör på kartan
 * @param {string} address - Adressen från inputen som ska "geocodas"
 */
function geocodeAddress(address) {
    geocoder.geocode({ address: address })
        .then((response) => {
            if (response.results[0]) {
                const location = response.results[0].geometry.location;
                
                if (marker) {
                    marker.setMap(null);
                }
                marker = new google.maps.Marker({
                    position: location,
                    map: map,
                });

                map.setCenter(location);
                map.setZoom(12);

                infowindow.setContent(response.results[0].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert("Inga resultat hittades");
            }
        })
        .catch((e) => window.alert("Geokodning misslyckades: " + e));
}

window.initMap = initMap;