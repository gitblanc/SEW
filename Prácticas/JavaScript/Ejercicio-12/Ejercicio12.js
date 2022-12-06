class FileUploader{
    constructor(){
        this.numFiles = 0;
        this.totalBytes = 0;
        this.files;
    }
    checkApiFile(){
        // Version 1.1 23/10/2021 
        if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
            //El navegador soporta el API File
            document.write("<p>Este navegador soporta el API File </p>");
        }
            else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
    }
    mostrarArchivos(){
        var file;
     
        $('label').before("<h3>Contenido de los archivos:</h3>");
        for (var i = 0; i <  this.numFiles; i++) {
            file = this.fileArray[i];
            this.leerArchivo(file);
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
    leerArchivo(file){
        var nombre = "<strong>"+file.name + "</strong>"
        var lector;
        var tipoJson = "application/json";
        var tipoTxt = "text/plain";
        var tipoXml = "text/xml";
      
        $('label').before("<p>"+nombre);

        //comprobampos el tipo de los ficheros   
        if(file.type ===  tipoJson || file.type === tipoTxt || file.type === tipoXml){

            lector = new FileReader();

            lector.onload = function(evento){ 
                    var x = lector.result.replace(/</g, "&lt;");
                    x = x.replace(/>/g, "&gt;");
                    $("p:last").after("<pre><code>" + x + "</code></pre>");
            }
            lector.readAsText(file);
        }
        else{
            nombre = "<p>El tipo de l archivo no está contemplado...</p></p>";
            $('h3:last').before(nombre);
        }
    }
}
var fileUploader = new FileUploader();