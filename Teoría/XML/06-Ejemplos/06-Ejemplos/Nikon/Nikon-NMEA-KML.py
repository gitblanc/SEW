# Nikon-NMEA-KML.py
# -*- coding: utf-8 -*-
# Procesado de archivos de GPS de la cámara Nikon y generación de un archivo KML (Keyhole Markup Language)
# KML es un formato de archivo que se utiliza para mostrar datos geográficos en un navegador terrestre.
# Se utiliza por Google Earth, Google Maps y Google Maps para móviles.
# KML utiliza una estructura basada en etiquetas con atributos y elementos anidados y está basado en el estándar XML
# Versión 1.0 20/Noviembre/2016
# Juan Manuel Cueva Lovelle. Universidad de Oviedo


def decodificaNMEAlonlat(cadena):
    """Decodifica la cadena generada por un GPS en formato NMEA y devuelve un string con la longitud, latitud y altura"""
    tokens = cadena.split(',')

    prefijo = tokens[0]

    if prefijo=="$GPGGA":
        horaUTC                         = tokens[1]
        latitud                         = tokens[2]
        hemisferio                      = tokens[3]
        longitud                        = tokens[4]
        esteOeste                       = tokens[5]
        fixGPS                          = tokens[6]
        nSatelites                      = tokens[7]
        precisionHDOP                   = tokens[8]
        altura                          = tokens[9]
        metros                          = tokens[10]
        alturaGeoideSobreElipsoideWGS84 = tokens[11]
        tiempoUpdateDGPS                = tokens[12]
        idDGPS                          = tokens[13]
        checksum                        = tokens[14]
        # pone altura 0.0 sobre el terreno
        return latlonGrados(latitud,hemisferio,longitud,esteOeste,0.0) 
 
    elif prefijo=="$GPRMC":
        horaUTC                         = tokens[1]
        valided                         = tokens[2]
        latitud                         = tokens[3]
        hemisferio                      = tokens[4]
        longitud                        = tokens[5]
        esteOeste                       = tokens[6]
        velocidad                       = tokens[7]
        rumbo                           = tokens[8]
        fechaUT                         = tokens[9]
        declinacionMagnetica            = tokens[10]
        EW                              = tokens[11]
        checksum                        = tokens[12]
        #pone altura 0.0 sobre el terreno
        return latlonGrados(latitud,hemisferio,longitud,esteOeste,0.0) 
    else:
        return "Prefijo NMEA no disponible para ser procesado"

def latlonGrados(latitud,hemisferio,longitud,esteOeste, altura):
    """Convierte dos cadenas string de NMEA a una cadena con las coordenadas en grados con signo"""
    latitudGrados = float(latitud[0:2]) + float(latitud[2:])/60
    if hemisferio =='S': latitudGrados = - latitudGrados

    longitudGrados = float(longitud[0:3]) + float(longitud[3:])/60
    if esteOeste == 'W': longitudGrados = -longitudGrados
        
    resultado = str(longitudGrados)  + "," + str(latitudGrados) + ","+ str(altura)+'\n'
    return resultado   

def prologoKML(archivo, nombre):
    """ Escribe en el archivo de salida el prólogo del archivo KML"""

    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write("<Document>\n")
    archivo.write("<Placemark>\n")
    archivo.write("<name>"+nombre+"</name>\n")    
    archivo.write("<LineString>\n")
    #la etiqueta <extrude> extiende la línea hasta el suelo 
    archivo.write("<extrude>1</extrude>\n")
    # La etiqueta <tessellate> descompone la línea en porciones pequeñas
    archivo.write("<tessellate>1</tessellate>\n")
    archivo.write("<coordinates>\n")

def epilogoKML(archivo):
    """ Escribe en el archivo de salida el epílogo del archivo KML"""

    archivo.write("</coordinates>\n")
    archivo.write("<altitudeMode>relativeToGround</altitudeMode>\n")
    archivo.write("</LineString>\n")
    archivo.write("<Style> id='lineaRoja'>\n") 
    archivo.write("<LineStyle>\n") 
    archivo.write("<color>#ff0000ff</color>\n")
    archivo.write("<width>5</width>\n")
    archivo.write("</LineStyle>\n")
    archivo.write("</Style>\n")
    archivo.write("</Placemark>\n")
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")
 

def main():
    """Procesado de archivos de GPS de la cámara Nikon y generación de un archivo KML (Keyhole Markup Language)
KML es un formato de archivo que se utiliza para mostrar datos geográficos en un navegador terrestre.
Se utiliza por Google Earth, Google Maps y Google Maps para móviles.
KML utiliza una estructura basada en etiquetas con atributos y elementos anidados y está basado en el estándar XML

Versión 1.0 20/Noviembre/2016
Juan Manuel Cueva Lovelle. Universidad de Oviedo

    """
    print(main.__doc__)
    nombreArchivo = input("Introduzca el nombre del archivo Nikon    = ")

    try:
        archivo = open(nombreArchivo,'r')
    except IOError:
        print ('No se encuentra el archivo ', nombreArchivo)
        exit()
        
    
    nombreSalida  = input("Introduzca el nombre del archivo generado (*.kml) = ")

    try:
        salida = open(nombreSalida + ".kml",'w')
    except IOError:
        print ('No se puede crear el archivo ', nombreSalida + ".kml")
        exit()

    # Procesamiento y generación del archivo kml
    
    nLinea=0
    
    # Lectura de la cabecera
    cabecera=archivo.readline()

    # Escribe la cabecera del archivo de salida
    prologoKML(salida, nombreArchivo)

    # Lectura de datos de GPS en formato NMEA
    while True:
        linea = archivo.readline()
        if not linea: break
        salida.write(decodificaNMEAlonlat(linea))
    archivo.close()

    epilogoKML(salida)
    salida.close()

if __name__ == "__main__":
    main()

