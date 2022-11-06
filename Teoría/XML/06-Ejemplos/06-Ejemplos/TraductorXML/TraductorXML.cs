// Traductor XML
// Juan Manuel Cueva Lovelle
// Universidad de Oviedo
// Versión 1.0 29/Noviembre/2011

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO; // Para manejo de archivos
using System.Xml; //Para procesar XML

namespace TraductorXML
{
    class Program
    {
        static void Main(string[] args)
        {
         try
            {
              if (args.Length < 1)
                    throw (new ArgumentNullException());

              String nombreArchivoXML = args[0];
             
              XmlReader xml = XmlReader.Create(nombreArchivoXML);
              while (xml.Read())
              {
                  switch (xml.NodeType)
                  {
                      case XmlNodeType.Element:
                          Console.WriteLine("Element.Name: {0}",xml.Name);
                          //Obtener los atributos si los tiene
                          if (xml.HasAttributes)
                          {
                              Console.WriteLine("Atributos de <" + xml.Name + ">");
                              while (xml.MoveToNextAttribute())
                              {
                                  Console.WriteLine(" {0}={1}", xml.Name, xml.Value);
                              }
                          }
                          break;
                      case XmlNodeType.EndElement:
                          Console.WriteLine("EndElement.Name: {0}", xml.Name);
                          break;
                      case XmlNodeType.Text:
                          Console.WriteLine("Text.Value: {0}", xml.Value);
                          break;
                      case XmlNodeType.XmlDeclaration:
                          Console.WriteLine("XmlDeclaration.Name: {0}", xml.Name);
                          Console.WriteLine("XmlDeclaration.Value: {0}", xml.Value);
                          break;
                      case XmlNodeType.ProcessingInstruction:
                          Console.WriteLine("ProcessingInstruction.Name: {0}", xml.Name);
                          Console.WriteLine("ProcessingInstruction.Value: {0}", xml.Value);
                          break;
                      case XmlNodeType.Comment:
                          Console.WriteLine("Comment.Value: {0}", xml.Value);
                          break;  
                  }//fin del switch

              }//fin del while  
                 Console.ReadKey();
                
            }//fin del try
            catch (FileNotFoundException)
            { 
                Console.WriteLine("Error: Archivo {0} no encontrado", args[0]); 
            }
            catch (ArgumentNullException)
            {
                Console.WriteLine("Formato correcto de uso:");
                Console.WriteLine("\n\t TraductorXML <archivo>");
            }
            catch(Exception e)
            {
                Console.WriteLine("Error no documentado: "+e);
            }
            finally 
            {
                Console.WriteLine("\nGracias por usar TraductorXML");
                Console.WriteLine("Versión 1.0, 29-Noviembre-2011");
                Console.WriteLine("Autor: Juan Manuel Cueva Lovelle");
                Console.WriteLine("http://www.di.uniovi.es/~cueva");
                Console.ReadLine();
            }

        }//fin del Main
    } //fin de Program
} // fin namespace
 
 
