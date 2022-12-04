//tomado del ejemplo de cueva
class MapaKML {
    constructor(){
        this.resultKml;
        this.numFiles = 0;
        this.totalBytes = 0;
        this.files;
        this.src = '/Tarea-1/redSocial.kml';
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
        var mapa = new google.maps.Map(document.querySelector('main'),{center:lugar, zoom: 8});
        //this.parsearKml(mapa);
        // var kmlLayer = new google.maps.KmlLayer(this.src, {
        //     suppressInfoWindows: true,
        //     preserveViewport: false,
        //     map: mapa
        // });
        // kmlLayer.addListener('click', function(event) {
        //     var content = event.featureData.infoWindowHtml;
        //     var testimonial = document.querySelector('section');
        //     testimonial.innerHTML = content;
        // });
    }
    leerKml(file){
        var nombre = "<strong>"+file.name + "</strong>";
        var lector;
        var tipoKml = "kml";
      
        $('label').before("<section>"+nombre);

        //comprobampos el tipo de los ficheros   
        if(file.name.split(".")[1] === (tipoKml)){
            $("h2:last").after("<p name=\"" +  file.name + "\"></p></section>");

            lector = new FileReader();

            lector.onload = function(evento){ 
                this.resultKml = lector.result;
            }
            lector.readAsText(file);
        }
        else{
            nombre = "<p>El tipo de l archivo no está contemplado...</p></section>";
            $('h3:last').before(nombre);
        }
    }
    mostrarArchivos(){
        var file;
     
        $('label').before("<h3>Contenido de los archivos:</h3>");
        for (var i = 0; i <  this.numFiles; i++) {
            file = this.fileArray[i];
            this.leerKml(file);
        }
    }
    mostrarInfoArchivos(){
        this.totalBytes = 0;
        this.fileArray  = document.querySelector("input").files;
        this.numFiles = this.fileArray.length;

        var titulo = "<h3>Información de los archivos:</h3>"
        for (var i = 0; i <  this.numFiles; i++) {
            this.totalBytes += this.fileArray[i].size;
        }
        var informacion="";
        for (var i = 0; i <  this.numFiles; i++) {
            informacion += "<p>Archivo " + (i+1) +" = "+ this.fileArray[i].name  + ", Tamaño: " + this.fileArray[i].size +" bytes " + ", Tipo: " + this.fileArray[i].type+"</p>" ;
        }
        //info de los archivos
        $('label').before("" + titulo +" <p>Total de bytes: " + this.totalBytes + "<p>" + informacion);
       
        this.mostrarArchivos();
    }
    // parsearKml(map){

    // }
}

var mapa = new MapaKML();