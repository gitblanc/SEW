class Electricidad{
    constructor(){
        this.start_date = "2022-01-01";
        this.start_hour = "T00:00";
        this.end_date = "2022-01-10";
        this.end_hour = "T23:59";
        //this.url = "https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date="+this.start_date+this.start_hour+"&end_date="+this.end_date+this.end_hour +"&time_trunc=day"
        this.url = "https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=2022-01-01T00:00&end_date=2022-01-01T01:00&time_trunc=day"; 
    }

    obtenerDatos(){
        $.ajax({
            dataType: "json",//definimos el tipo de datos
            url: this.url,//cargamos la url
            method: 'GET',//hacemos la petición GET
            success: function(datos){//si la petición no devuelve error volcamos los datos
                    var listaDatos = "<h4>" + datos.data.type + " en España</h4>";
                    listaDatos += "<ul><li><strong>Descripción:</strong> " + datos.data.attributes.description + "</li></ul>";
                    let i;
                    let j;
                    for(i = 0; i < datos.included.length; i++){
                        listaDatos += "<ul><li>Tipo de energía: <strong>" + datos.included[i].type + "</strong></li>";
                        for(j = 0; j < datos.included[i].attributes.content.length; j++){
                            var elem = datos.included[i].attributes.content[j];
                            listaDatos += "<li><strong>Energía " + elem.attributes.title + "</strong></li>";
                            listaDatos += "<li>Balance eléctrico: " + elem.attributes.values[0].value + " €</li>";
                        }
                        listaDatos+="</ul>"
                    }
                $("h3:last").after(listaDatos);
                }
        });
    }
}

var datos = new Electricidad();