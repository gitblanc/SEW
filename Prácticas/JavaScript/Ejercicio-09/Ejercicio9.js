class Ciudades{
    constructor(ciudades){
        this.ciudades = ciudades;
    }
    mostrarDatos(){
        let i = 0;
        $('h2').after('<ol></ol>');
        for(i = 0;i < this.ciudades.length ;i++){
            if(this.ciudades[i].mostrado == false){
                this.ciudades[i].obtenerDatos();
                this.ciudades[i].mostrado = true
            }
        }
    }
}

class Meteorologia{
    constructor(ciudad){
        this.apiKey = "981e9846cfb8803a8e56b33520bbe0e2";
        this.ciudad = ciudad;
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad  
        + this.unidades + this.idioma + "&APPID=" + this.apiKey + this.tipo;
        this.datos = "";
        this.mostrado = false;
    }

    obtenerDatos(){
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    this.datos = datos;
                
                    //Extracción de los datos contenidos en el XML
                    var totalNodos            = $('*',datos).length; // cuenta los elementos de XML: son los nodos del árbol DOM de XML
                    var ciudad                = $('city',datos).attr("name");
                    var longitud              = $('coord',datos).attr("lon");
                    var latitud               = $('coord',datos).attr("lat");
                    var pais                  = $('country',datos).text();
                    var amanecer              = $('sun',datos).attr("rise");
                    var minutosZonaHoraria    = new Date().getTimezoneOffset();
                    var amanecerMiliSeg1970   = Date.parse(amanecer);
                        amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                    var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                    var oscurecer             = $('sun',datos).attr("set");          
                    var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                        oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                    var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                    var temperatura           = $('temperature',datos).attr("value");
                    var temperaturaMin        = $('temperature',datos).attr("min");
                    var temperaturaMax        = $('temperature',datos).attr("max");
                    var temperaturaUnit       = $('temperature',datos).attr("unit");
                    var humedad               = $('humidity',datos).attr("value");
                    var humedadUnit           = $('humidity',datos).attr("unit");
                    var presion               = $('pressure',datos).attr("value");
                    var presionUnit           = $('pressure',datos).attr("unit");
                    var velocidadViento       = $('speed',datos).attr("value");
                    var nombreViento          = $('speed',datos).attr("name");
                    var direccionViento       = $('direction',datos).attr("value");
                    var codigoViento          = $('direction',datos).attr("code");
                    var nombreDireccionViento = $('direction',datos).attr("name");
                    var nubosidad             = $('clouds',datos).attr("value");
                    var nombreNubosidad       = $('clouds',datos).attr("name");
                    var visibilidad           = $('visibility',datos).attr("value");
                    var precipitacionValue    = $('precipitation',datos).attr("value");
                    var precipitacionMode     = $('precipitation',datos).attr("mode");
                    var descripcion           = $('weather',datos).attr("value");
                    var horaMedida            = $('lastupdate',datos).attr("value");
                    var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                        horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                    var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                    var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                    var icono                 = $('weather',datos).attr("icon");  
                    
                    var stringDatos =  "<li>Número de elementos del XML: " + totalNodos + "</li>";
                        stringDatos += "<li><em>Ciudad: " + ciudad + "</em></li>";
                        stringDatos += "<li><img src=\"https://openweathermap.org/img/w/" + icono + ".png\" alt=\"Icono del tiempo\"></li>";
                        stringDatos += "<li>Longitud: " + longitud + " º</li>";
                        stringDatos += "<li>Latitud: " + latitud + " º</li>";
                        stringDatos += "<li>País: " + pais + "</li>";
                        stringDatos += "<li>Amanece a las: " + amanecerLocal + "</li>";
                        stringDatos += "<li>Oscurece a las: " + oscurecerLocal + "</li>";
                        stringDatos += "<li>Temperatura: " + temperatura + " º Celsius</li>";
                        stringDatos += "<li>Temperatura mínima: " + temperaturaMin + " º Celsius</li>";
                        stringDatos += "<li>Temperatura máxima: " + temperaturaMax + " º Celsius</li>";
                        stringDatos += "<li>Temperatura (unidades): " + temperaturaUnit + "</li>";
                        stringDatos += "<li>Humedad: " + humedad + " " + humedadUnit + "</li>";
                        stringDatos += "<li>Presión: " + presion + " " + presionUnit + "</li>";
                        stringDatos += "<li>Velocidad del viento: " + velocidadViento + " metros/segundo</li>";
                        stringDatos += "<li>Nombre del viento: " + nombreViento + "</li>";
                        stringDatos += "<li>Dirección del viento: " + direccionViento + " º</li>";
                        stringDatos += "<li>Código del viento: " + codigoViento + "</li>";
                        stringDatos += "<li>Nombre del viento: " + nombreDireccionViento + "</li>";
                        stringDatos += "<li>Nubosidad: " + nubosidad + "%</li>";
                        stringDatos += "<li>Nombre nubosidad: " + nombreNubosidad + "</li>";
                        stringDatos += "<li>Visibilidad: " + visibilidad + " metros</li>";
                        stringDatos += "<li>Precipitación valor: " + precipitacionValue + "</li>";
                        stringDatos += "<li>Precipitación modo: " + precipitacionMode + "</li>";
                        stringDatos += "<li>Descripción: " + descripcion + "</li>";
                        stringDatos += "<li>Hora de la medida: " + horaMedidaLocal + "</li>";
                        stringDatos += "<li>Fecha de la medida: " + fechaMedidaLocal + "</li>";
                    
                    $("ol:last").append(stringDatos);
            },
            error:function(){
                $("h2").html("No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("li").remove();
                $("ol").remove();
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