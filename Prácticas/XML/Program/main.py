# from lxml import etree
# # import module

# def xml_html_converter():

#     xslt_doc = etree.parse("persona.xslt")
#     xslt_transformer = etree.XSLT(xslt_doc)

#     #El xml inicial
#     source_doc = etree.parse("xml.xml")
#     #El html final
#     output_doc = xslt_transformer(source_doc)
#     return output_doc


# def writeToArchive(fileReaded, fileWritten):
#     # open both files
#     with open(fileWritten, 'w') as secondfile:
#         # read content from first file
#         for line in fileReaded:
#             # append content to second file
#             secondfile.write(line)
#     print("SUCCESS")

# fileReaded = str(xml_html_converter())
# print(fileReaded)
# fileWritten = "redSocial.html"

# fileRTrimmed = fileReaded.split("\n")
# writeToArchive(fileRTrimmed,fileWritten)

#-------------------------------
import re
def leerXML(fileXML):
    html = open("redSocial.html", "a")
    fileXMLOpened = open(fileXML)
    lines = fileXMLOpened.readlines()
    inicializarHTML()
    try:
        for linea in lines:
            escribirLinea(linea)
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
    html.write("\t<!--<link rel=\"stylesheet\" type=\"text/css\" href=\"estilo/estilo.css\" />-->\n" + "</head>\n")
    html.write("\n<body>\n")
    html.write("\t<h1>Red Social</h1>\n")
def escribirLinea(linea):
    if("nombre" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<nombre>", "", linea)
        linea = re.sub("</nombre>", "", linea)
        linea.rstrip()
        escribirLineaAHTML("\t\t<h2>\n\t\t\tNombre: " + linea)
    elif("apellidos" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<apellidos>", "", linea)
        linea = re.sub("</apellidos>", "", linea)
        linea.rstrip()
        escribirLineaAHTML("\t\t\tApellidos: " + linea)
    elif ("fecha" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<fecha>", "", linea)
        linea = re.sub("</fecha>", "", linea)
        linea.rstrip()
        escribirLineaAHTML("\t\t\tFecha de nacimiento: " + linea)
    elif ("lugar_nacimiento" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<lugar_nacimiento>", "", linea)
        linea = re.sub("</lugar_nacimiento>", "", linea)
        linea.rstrip()
        escribirLineaAHTML("\t\t\tLugar de nacimiento: " + linea)
    elif ("coordenadas_nacimiento" in linea):

        linea = re.sub("\t", "", linea)
        linea = re.sub("<coordenadas_nacimiento>", "", linea)
        linea = re.sub("</coordenadas_nacimiento>", "", linea)
        linea.rstrip()
        escribirLineaAHTML("\t\t\tCoordenadas de nacimiento: " + linea)
    elif ("lugar_residencia" in linea):

        linea = re.sub("\t", "", linea)
        linea = re.sub("<lugar_residencia>", "", linea)
        linea = re.sub("</lugar_residencia>", "", linea)
        linea.rstrip()
        escribirLineaAHTML("\t\t\tLugar de residencia: " + linea)
    elif ("coordenadas_residencia" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<coordenadas_residencia>", "", linea)
        linea = re.sub("</coordenadas_residencia>", "", linea)
        linea.rstrip()
        escribirLineaAHTML("\t\t\tCoordenadas de residencia: " + linea)
    elif ("fotografia" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<fotografia>", "", linea)
        linea = re.sub("</fotografia>", "", linea)#con el CDATA
        linea = re.sub("<!\[CDATA\[", "", linea)
        linea = re.sub("]]>", "", linea)
        linea.rstrip()
        escribirLineaAHTML("\t\t\tFotografia: " + linea)
    elif ("video" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<video>", "", linea)
        linea = re.sub("</video>", "", linea)
        linea = re.sub("<!\[CDATA\[", "", linea)
        linea = re.sub("]]>", "", linea)
        linea.rstrip()
        escribirLineaAHTML("\t\t\tVideo: " + linea)
    elif ("comentarios" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<comentarios>", "", linea)
        linea = re.sub("</comentarios>", "", linea)
        linea.rstrip()
        escribirLineaAHTML("\t\t\tComentarios: " + linea + "\t\t</h2>\n")

leerXML("xml.xml")