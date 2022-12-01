//tomado del ejemplo de cueva
class MapaDinamicoGoogle {
    constructor(){
        navigator.geolocation.getCurrentPosition(this.cargarDatos.bind(this), this.verErrores.bind(this));
    }
    verErrores(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }
    cargarDatos(c){
        this.longitud = c.coords.longitude;
        this.latitud = c.coords.latitude;
    }
    mostrarMapa(){
        $('h2').after("<script src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyBD7jyWNUS7OqzQhquJQw5x5WEfsRk4R4A&callback=mapa.initMap&v=weekly\"defer></script>")
    }
    initMap(){
        var lugar = {lat: this.latitud, lng: this.longitud};
        var mapa = new google.maps.Map(document.querySelector('main'),{center:lugar, zoom: 15});
        var marcador = new google.maps.Marker({position:lugar,map:mapa});
    }
}

var mapa = new MapaDinamicoGoogle();
console.log(mapa.longitud);
console.log(mapa.latitud);