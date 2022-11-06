# 02000-XML.py
# # -*- coding: utf-8 -*-
""""
Procesamiento genérico de archivos XML

@version 1.1 16/Mayo/2020
@author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
"""

import xml.etree.ElementTree as ET

def verXML(archivoXML):
    """Función verXML(archivoXML)
Visualiza por pantalla un archivo XML mostrando:
    - El elemento raiz con su contenido y sus atributos
    - Todos los elementos con su contenido y los valores de sus atributos
    
Version: 1.1 16/Mayo/2020
Author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
    """
    try:
        
        arbol = ET.parse(archivoXML)
        
    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()
        
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()
       
    raiz = arbol.getroot()
    
    print("\nElemento raiz = ", raiz.tag)

    if raiz.text != None:
        print("Contenido = "    , raiz.text.strip('\n')) #strip() elimina los '\n' del string
    else:
        print("Contenido = "    , raiz.text)
        
    print("Atributos = "    , raiz.attrib)

    # Recorrido de los elementos del árbol
    for hijo in raiz.findall('.//'): # Expresión Path
        print("\nElemento = " , hijo.tag)
        if hijo.text != None:
            print("Contenido = ", hijo.text.strip('\n')) #strip() elimina los '\n' del string
        else:
            print("Contenido = ", hijo.text)    
        print("Atributos = ", hijo.attrib)

def main():
    """Prueba de la función verXML()"""
    
    print(verXML.__doc__)
    
    miArchivoXML = input('Introduzca un archivo XML = ')
    
    verXML(miArchivoXML)

if __name__ == "__main__":
    main()    
