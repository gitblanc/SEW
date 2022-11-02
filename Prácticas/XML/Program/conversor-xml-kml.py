import re
import simplekml

def leerXML(fileXML):
    fileXMLOpened = open(fileXML)
    lines = fileXMLOpened.readlines()
    ficheroKML = "redSocial.kml"
    kml = simplekml.Kml()
    try:
        i = 0
        for linea in lines:
            if ("coordenadas" in linea):
                longitud, latitud, altitud = ObtenerCoordenada(linea)
                nombre = "coordenada" + i.__str__()
                kml.newpoint(name=nombre, coords=[(longitud, latitud, altitud)])
                i += 1
        kml.save(ficheroKML)
    finally:
        fileXMLOpened.close()
        print("SUCCESS")

def ObtenerCoordenada(linea):
    if ("coordenadas_nacimiento" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<coordenadas_nacimiento>", "", linea)
        linea = re.sub("</coordenadas_nacimiento>", "", linea)
        enlace = linea.split("\n")
        coordinates = enlace[0]
        coord = coordinates.split(",")
        longitude = coord[0]
        latitude = coord[1]
        altitude = coord[2]
        return longitude, latitude, altitude
    else:
        linea = re.sub("\t", "", linea)
        linea = re.sub("<coordenadas_residencia>", "", linea)
        linea = re.sub("</coordenadas_residencia>", "", linea)
        enlace = linea.split("\n")
        coordinates = enlace[0]
        coord = coordinates.split(",")
        longitude = coord[0]
        latitude = coord[1]
        altitude = coord[2]
        return longitude, latitude, altitude


leerXML("xml.xml")
