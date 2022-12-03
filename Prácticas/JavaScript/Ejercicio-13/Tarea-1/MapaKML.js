class MapaKML{
    constructor(){
        this.src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
    }
    //https://developers.google.com/maps/documentation/javascript/kml
    initMap() {
        var map;
        map = new google.maps.Map(document.querySelector('main'), {
            center: new google.maps.LatLng(43.3672702, -5.8502461),
            zoom: 10,
            mapTypeId: 'terrain'
        });
        
        var kmlLayer = new google.maps.KmlLayer(this.src, {
            suppressInfoWindows: true,
            preserveViewport: false,
            map: map
        });
        kmlLayer.addListener('click', function(event) {
            var content = event.featureData.infoWindowHtml;
            var testimonial = document.querySelector('section');
            testimonial.innerHTML = content;
        });
    }
}

var mapaKML = new MapaKML();