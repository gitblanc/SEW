//tomado del ejemplo de cueva
class MapaDinamicoGoogle {
    constructor(){
        this.longitud = -5.8502461;
        this.latitud = 43.3672702;
        this.numFiles = 0;
        this.totalBytes = 0;
        this.files;
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
    initMap(){
        var lugar = {lat: this.latitud, lng: this.longitud};
        new google.maps.Map(document.querySelector('main'),{center:lugar, zoom: 15});
        //var marcador = new google.maps.Marker({position:lugar,map:mapa});
    }
    //KML
    insertarMarcador(file){
        var lugar = {lat: this.latitud, lng: this.longitud};
        var mapa = new google.maps.Map(document.querySelector('main'),{center:lugar, zoom: 8});
        var lineas = file.split(/\r?\n/);
        for(var i =0; i < lineas.length; i++){
            if(lineas[i].includes("<coordinates>")){
                var splitted = lineas[i].replace("<coordinates> ", "");
                splitted = splitted.replace("</coordinates>", "");
                splitted = splitted.split(",");
                var lng1 = splitted[0];
                var lat1 = splitted[1];
                var lugarcoord = {lat:parseFloat(lat1), lng: parseFloat(lng1)};
                var marcador = new google.maps.Marker({position:lugarcoord,map:mapa});
            }
        }
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
            lector.onload = (e) => this.insertarMarcador(lector.result);
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
}

var ej13 = new MapaDinamicoGoogle();