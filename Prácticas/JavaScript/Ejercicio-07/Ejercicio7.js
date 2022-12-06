class Ejercicio7{
    constructor(){
    }

    ocultarTabla(){
        $("table").hide();
    }

    mostrarTabla() {
        $("table").show();
    }

    modificarTitulo(){
        $("h1").text("Ahora cambiamos el título");
    }

    retornarTitulo(){
        $("h1").text("Ejercicio 7");
    }

    addElemento(){
        $("h3").after("<h4>Este párrafo se añade después del autor</h4>");
    }

    eliminarElemento(){
        $("h4").remove();
    }

    hacerRecorrido(){
        $("p:last").remove();
        $("strong:last").remove();

        $("p:last").after("<p></p>");
        $("p:last").before("<strong>Recorrido:</strong>")
        $("*", document.body).each(function() {
            var padre = $(this).parent().get(0).tagName;
            var elem = $(this).get(0);
            $("p:last").prepend(document.createTextNode( "Etiqueta padre : <"  + padre + 
            "> elemento : <" + $(elem).get(0).tagName + "> "));
        });
    }

    sumarFilasColumnas(){
        let total = parseInt("0");
            $("table tr td").each(function(){
                if(!isNaN(parseInt($(this).text()))){
                    total += parseInt($(this).text());
                }
            });
        $("#totSum").val(total);
    }
}
var ej7 = new Ejercicio7();