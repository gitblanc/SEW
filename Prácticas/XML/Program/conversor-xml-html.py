import re
def leerXML(fileXML):
    html = open("redSocial.html", "a")
    fileXMLOpened = open(fileXML)
    lines = fileXMLOpened.readlines()
    inicializarHTML()
    try:
        cont = 1
        for linea in lines:
            escribirLinea(linea, cont)
            if("nombre" in linea):
                cont+=1
        html.write("</body>")
    finally:
        fileXMLOpened.close()
        print("SUCCESS")

def escribirLineaAHTML(line):
    html = open("redSocial.html", "a")
    try:
        html.write(line)
    finally:
        html.close()

def inicializarHTML():
    html = open("redSocial.html", "w")

    html.write("<!DOCTYPE HTML>\n")
    html.write("<html lang=\"es\">\n")
    html.write("<head>\n")
    html.write("\t<!-- Datos que describen el documento --> \n")
    html.write("\t<meta charset=\"UTF-8\" />\n")
    html.write("\t<!--Metadatos de los documentos HTML5-->\n")
    html.write("\t<meta name =\"author\" content =\"Eduardo Blanco Bielsa\" />\n")
    html.write("\t<meta name =\"description\" content =\"Página principal\" />\n")
    html.write("\t<meta name =\"keywords\" content =\"Personas\" />\n")
    html.write("\t<!--Definición de la ventana gráfica-->\n")
    html.write("\t<meta name =\"viewport\" content =\"width=device-width, initial-scale=1.0\" />\n")
    html.write("\t<title>RedSocial</title>\n")
    html.write("\t<link rel=\"stylesheet\" type=\"text/css\" href=\"layout.css\" />\n")
    html.write("\t<link rel=\"stylesheet\" type=\"text/css\" href=\"estilo.css\" />\n" + "</head>\n")
    html.write("\n<body>\n")
    html.write("\t<h1>Red Social</h1>\n")
def escribirLinea(linea, cont):
    if("nombre" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<nombre>", "", linea)
        linea = re.sub("</nombre>", "", linea)
        enlace = linea.split("\n")
        escribirLineaAHTML("\t\t<h3>Persona" + cont.__str__() + "</h3>\n\t\t\t<h4>\n\t\t\t\t<p>Nombre: " + enlace[0] + " </p>\n")
    elif("apellidos" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<apellidos>", "", linea)
        linea = re.sub("</apellidos>", "", linea)
        enlace = linea.split("\n")
        escribirLineaAHTML("\t\t\t\t<p>Apellidos: " + enlace[0] + " </p>\n")
    elif ("fecha" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<fecha>", "", linea)
        linea = re.sub("</fecha>", "", linea)
        enlace = linea.split("\n")
        escribirLineaAHTML("\t\t\t\t<p>Fecha de nacimiento: " + enlace[0] + " </p>\n")
    elif ("lugar_nacimiento" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<lugar_nacimiento>", "", linea)
        linea = re.sub("</lugar_nacimiento>", "", linea)
        enlace = linea.split("\n")
        escribirLineaAHTML("\t\t\t\t<p>Lugar de nacimiento: " + enlace[0] + " </p>\n")
    elif ("coordenadas_nacimiento" in linea):

        linea = re.sub("\t", "", linea)
        linea = re.sub("<coordenadas_nacimiento>", "", linea)
        linea = re.sub("</coordenadas_nacimiento>", "", linea)
        enlace = linea.split("\n")
        escribirLineaAHTML("\t\t\t\t<p>Coordenadas de nacimiento: " + enlace[0] + " </p>\n")
    elif ("lugar_residencia" in linea):

        linea = re.sub("\t", "", linea)
        linea = re.sub("<lugar_residencia>", "", linea)
        linea = re.sub("</lugar_residencia>", "", linea)
        enlace = linea.split("\n")
        escribirLineaAHTML("\t\t\t\t<p>Lugar de residencia: " + enlace[0] + " </p>\n")
    elif ("coordenadas_residencia" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<coordenadas_residencia>", "", linea)
        linea = re.sub("</coordenadas_residencia>", "", linea)
        enlace = linea.split("\n")
        escribirLineaAHTML("\t\t\t\t<p>Coordenadas de residencia: " + enlace[0] + " </p>\n")
    elif ("fotografia" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<fotografia>", "", linea)
        linea = re.sub("</fotografia>", "", linea)#con el CDATA
        linea = re.sub("<!\[CDATA\[", "", linea)
        linea = re.sub("]]>", "", linea)
        enlace = linea.split("\n")
        escribirLineaAHTML("\t\t\t\t<p>Fotografia: <a href="+enlace[0]+">foto</a>\n")
    elif ("video" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<video>", "", linea)
        linea = re.sub("</video>", "", linea)
        linea = re.sub("<!\[CDATA\[", "", linea)
        linea = re.sub("]]>", "", linea)
        enlace = linea.split("\n")
        escribirLineaAHTML("\t\t\t\t<p>Video: <a href="+enlace[0]+">video</a>\n")
    elif ("comentarios" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<comentarios>", "", linea)
        linea = re.sub("</comentarios>", "", linea)
        linea.rstrip()
        escribirLineaAHTML("\t\t\t\t<p>Comentarios: " + linea + "</p>\t\t</h4>\n")

leerXML("xml.xml")