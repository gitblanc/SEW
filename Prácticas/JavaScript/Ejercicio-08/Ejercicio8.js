class Ciudades{
    constructor(ciudades){
        this.ciudades = ciudades;
    }
    mostrarDatos(){
        let i = 0;
        for(i = 0;i < this.ciudades.length ;i++){
            this.ciudades[i].obtenerDatos();
        }
    }
}
class Meteorologia{
    constructor(ciudad){
        this.apiKey = "981e9846cfb8803a8e56b33520bbe0e2";
        this.ciudad = ciudad;
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad  
        + this.unidades + this.idioma + "&APPID=" + this.apiKey;
        this.datos = "";
    }
    //cogemos el ejemplo de Cueva
    obtenerDatos(){
        $.ajax({
            dataType: "json",//definimos el tipo de datos
            url: this.url,//cargamos la url
            method: 'GET',//hacemos la petición GET
            success: function(datos){//si la petición no devuelve error volcamos los datos
                    this.datos = datos;
                    var listaDatos = "<ul><li><em>Ciudad: " + datos.name + "</em>";
                    listaDatos += "<aside><img src=\"https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png\" alt=\"Icono del tiempo\"></aside></li>"
                    listaDatos += "<li>Datos de " + datos.name + ":</li>";
                    listaDatos += "<li>País: " + datos.sys.country + "</li>";
                    listaDatos += "<li>Latitud: " + datos.coord.lat + " º</li>";
                    listaDatos += "<li>Longitud: " + datos.coord.lon + " º</li>";
                    listaDatos += "<li>Temperatura: " + datos.main.temp + " ºC</li>";
                    listaDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " ºC</li>";
                    listaDatos += "<li>Temperatura mínima: " + datos.main.temp_min + " ºC</li>";
                    listaDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                    listaDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                    listaDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                    listaDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                    listaDatos += "<li>Dirección del viento: " + datos.wind.deg + " º</li>";
                    listaDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                    listaDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                    listaDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                    listaDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                    listaDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                    listaDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                $("h2:last").after(listaDatos);
                }
        });
    }
}

var oviedo = new Meteorologia("Oviedo");
var gijon = new Meteorologia("Gijón");
var aviles = new Meteorologia("Avilés");
var barcelona = new Meteorologia("Barcelona");
var mieres = new Meteorologia("Mieres")

var datos = new Ciudades([oviedo,gijon,aviles,barcelona,mieres]);