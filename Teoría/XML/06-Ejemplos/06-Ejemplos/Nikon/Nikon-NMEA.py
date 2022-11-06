# Nikon-NMEA.py
# -*- coding: utf-8 -*-

# Procesado de archivos de GPS de la camara Nikon
# Genera un archivo con los datos en formato texto
# Juan Manuel Cueva Lovelle
# Universidad de Oviedo
# Versión 1.0 20-Noviembre-2016


def decodificaNMEA(cadena):
    """Nikon-NMEA.py
    Decodifica el archivo de Nikon en formato NMEA y genera un archivo con los datos en formato texto
    Juan Manuel Cueva Lovelle
    Universidad de Oviedo
    Versión 1.0 20-Noviembre-2016"""
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
        
        resultado =    "Prefijo                                          = " + prefijo
        resultado += "\nHora UTC                                         = " + horaUTC[0:2] + ":" + horaUTC[2:4] + ":" + horaUTC[4:] + " UTC"
        resultado += "\nLatitud                                          = " + latitud[0:2]  + u"\u00B0" + latitud[2:]  + "' " + hemisferio
        resultado += "\nLongitud                                         = " + longitud[0:3] + u"\u00B0" + longitud[3:] + "' " + esteOeste
        resultado += "\nFixGPS                                           = " + fixGPS
        resultado += "\nNumero Satélites                                 = " + nSatelites
        resultado += "\nPrecisión de dilución horizontal (HDOP)          = " + precisionHDOP
        resultado += "\nAltitud sobre el nivel del mar                   = " + altura + " " + metros
        resultado += "\nAltura del Geoide sobre elipsoide WGS84          = " + alturaGeoideSobreElipsoideWGS84
        resultado += "\nTiempo desde la última actualización DGPS        = " + tiempoUpdateDGPS
        resultado += "\nIdentificador de la estación de referencia DGPS  = " + idDGPS
        resultado += "\nChecksum                                         = " + checksum
        return resultado

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
        
        resultado =    "Prefijo                                          = " + prefijo
        resultado += "\nHora UTC                                         = " + horaUTC[0:2] + ":" + horaUTC[2:4] + ":" + horaUTC[4:] + " UTC"
        resultado += "\nValidez                                          = " + valided
        resultado += "\nLatitud                                          = " + latitud[0:2]  + u"\u00B0" + latitud[2:]  + "' " + hemisferio
        resultado += "\nLongitud                                         = " + longitud[0:3] + u"\u00B0" + longitud[3:] + "' " + esteOeste
        resultado += "\nVelocidad                                        = " + velocidad + " nudos" + " = " + str(float(velocidad) * 1.852) + " Km/h"
        resultado += "\nRumbo                                            = " + rumbo
        resultado += "\nFecha UT                                         = " + fechaUT[0:2] + "/" + fechaUT[2:4] +  "/" + fechaUT[4:] + " UT"
        resultado += "\nDeclinación magnética                            = " + declinacionMagnetica + " " + EW
        resultado += "\nChecksum                                         = " + checksum
        return resultado
    else:
        return "Prefijo NMEA no disponible para ser procesado"


def main():
    print(decodificaNMEA.__doc__)
    nombreArchivo = input("Introduzca el nombre del archivo Nikon    = ")
    nombreSalida  = input("Introduzca el nombre del archivo generado = ")

    nLinea=0

    try:
        archivo = open(nombreArchivo,'r')
    except IOError:
        print ('No se encuentra el archivo ', nombreArchivo)
        exit()

    try:
        salida = open(nombreSalida,'w')
    except IOError:
        print ('No se puede crear el archivo ', nombreSalida)
        exit()

    salida.write("Procesamiento del archivo = " + archivo.name)

    cabecera=archivo.readline()
    salida.write("\nCabecera = " + cabecera)

    #datos de GPS en formato NMEA
    while True:
        linea = archivo.readline()
        nLinea=nLinea+1
        if not linea: break
        salida.write("[" + str(nLinea) + "]" + linea)
        salida.write(decodificaNMEA(linea))

    archivo.close()
    salida.close()

if __name__ == "__main__":
    main()

