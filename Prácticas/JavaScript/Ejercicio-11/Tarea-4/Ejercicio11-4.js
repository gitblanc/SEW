//tomado del ejemplo de cueva
class MapaDinamicoGoogle {
    constructor(){
    }
    initMap(){
        var oviedo = {lat: 43.3672702, lng: -5.8502461};
        var mapaOviedo = new google.maps.Map(document.querySelector('main'),{center:oviedo, zoom: 15});
        var marcador = new google.maps.Marker({position:oviedo,map:mapaOviedo});
    }
}

var mapaDinamicoGoogle = new Object();

var mapa = new MapaDinamicoGoogle();
mapaDinamicoGoogle.initMap = mapa.initMap;