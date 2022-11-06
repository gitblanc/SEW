# 02010-XPath.py
# # -*- coding: utf-8 -*-
""""
Ejemplos de uso de XPath

@version 1.2 21/Octubre/2020
@author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
"""

import xml.etree.ElementTree as ET

def verXPath(archivoXML, expresionXPath):
    """Función verXPath(archivoXML, expresionXPath)
Visualiza por pantalla el nodo correspondiente de una expresión XPath de un archivo XML
    
Version: 1.2 21/Octubre/2020
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
    
    # Recorrido de los elementos del árbol
    for hijo in raiz.findall(expresionXPath): # Expresión XPath
        print("\nElemento = " , hijo.tag)
        if hijo.text != None:
            print("Contenido = ", hijo.text.strip('\n')) #strip() elimina los '\n' del string
        else:
            print("Contenido = ", hijo.text)    
        print("Atributos = ", hijo.attrib)

def main():
    """Prueba de la función verXPath()"""
    
    print(verXPath.__doc__)
    
    miArchivoXML = input('Introduzca un archivo XML = ')

    miExpresionXPath = input('Introduzca la expresión XPath = ')
    
    verXPath(miArchivoXML, miExpresionXPath)

if __name__ == "__main__":
    main()    
