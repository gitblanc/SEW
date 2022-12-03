//tomado del ejemplo de cueva
class Buscador {
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
        $('h2').after("<script src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyApmnMoES2D1Bm3GmduR8lEhRXYUk_hh78&callback=mapa.initMap&v=weekly\"defer></script>")
    }
    initMap(){
        var lugar = {lat: this.latitud, lng: this.longitud};
        var mapa = new google.maps.Map(document.querySelector('main'),{center:lugar, zoom: 15});
        var marcador = new google.maps.Marker({position:lugar,map:mapa});
    }
    calcularRuta(){
        let origen = $('input:first').val();
        let destino = $('input:last').val();

        if(origen == "" || destino == ""){
            alert("Por favor, introduce puntos válidos...")
            return;
        }
        this.ruta(origen, destino);
    }
    //https://developers.google.com/maps/documentation/javascript/examples/directions-waypoints
    ruta(origen, destino){
        $('br:last').remove();
        $('iframe').remove();

        let query =  "origin=" + origen + "&destination=" + destino;

        $('button').after("<br><iframe  loading=\"lazy\" allowfullscreen src=\"https://www.google.com/maps/embed/v1/directions?" + query +"&key=AIzaSyApmnMoES2D1Bm3GmduR8lEhRXYUk_hh78&mode=driving\"></iframe>");
    }
}

var ruta = new Buscador();