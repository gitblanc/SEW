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
        $("*", document.body).each(function() {
            var padre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode( "Etiqueta padre : <"  + padre + 
            "> elemento : <" + $(this).get(0).tagName +"> valor: "));
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