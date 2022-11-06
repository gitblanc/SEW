// Conversor XML a SVG
// Genera el árbol del archivo XML en formato SVG
// Pablo Soto Medina. Versión 1.00 10/Noviembre/2014
// Juan Manuel Cueva Lovelle. Universidad de Oviedo. Versión 1.01 2/Octubre/2015

using System;
using System.Xml;
using System.IO;
using System.Collections;

namespace XmlToSvg
{
    class MainClass
    {
        private class Node
        {
            public int x { get; set; }
            public int y { get; set; }

            public Node(int x, int y)
            {
                this.x = x;
                this.y = y;
            }
        }

        private static int x, y;
        private const int elementWidth = 200;
        private const int elementHeight = 40;
        private const int elementSpacingX = 220;
        private const int elementSpacingY = 50;
        private static Stack parents;


        public static void Main(string[] args)
        {
            try
            {
                if (args.Length < 2)
                    throw (new ArgumentNullException());

                String xmlFile = args[0];
                String svgFile = args[1];
                x = 20;
                y = 20;
                parents = new Stack();
                XmlTextReader reader = new XmlTextReader(xmlFile);

                XmlWriter xmlWriter = XmlWriter.Create(svgFile);
                int height = estimateHeight(xmlFile);
                WriteSVGHeader(xmlWriter, height);
                while (reader.Read())
                {
                    switch (reader.NodeType)
                    {
                        case XmlNodeType.Element: // The node is an element.
                            WriteElement(xmlWriter, reader.Name);
                            int attributeY = y;
                            parents.Push(new Node(x, y));
                            x += elementSpacingX;
                            while (reader.MoveToNextAttribute())
                            {// Read the attributes.
                                attributeY += 10;
                                WriteAttribute(xmlWriter, reader.Name + ": " + reader.Value, attributeY);
                            }
                            if (reader.IsStartElement())
                            {
                                if (reader.IsEmptyElement)
                                {
                                    x -= elementSpacingX;
                                    y += elementSpacingY;
                                    parents.Pop();
                                }
                            }

                            break;
                        case XmlNodeType.Text: //Display the text in each element.
                            WriteValue(xmlWriter, reader.Value);
                            break;
                        case XmlNodeType.EndElement: //Display the end of the element.
                            x -= elementSpacingX;
                            y += elementSpacingY;
                            parents.Pop();
                            break;
                    }
                }
                xmlWriter.WriteEndDocument();
                xmlWriter.Close();
                Console.WriteLine("Done.\n");
            }
            catch (FileNotFoundException)
            {
                Console.WriteLine("Error: Archivo {0} no encontrado", args[0]);
            }
            catch (ArgumentNullException)
            {
                Console.WriteLine("Formato correcto de uso:");
                Console.WriteLine("\n\t xml2svg <archivo_entrada_XML> <archivo_salida_SVG>");
            }
            catch (Exception e)
            {
                Console.WriteLine("Error no documentado: " + e);
            }
            finally
            {
                Console.WriteLine("\nGracias por usar xml2svg");
                Console.WriteLine("Autor: Pablo Soto Medina. Versión 1.00, 10-Noviembre-2014");
                Console.WriteLine("Autor: Juan Manuel Cueva Lovelle. Versión 1.01, 2-Octubre-2015");
                Console.ReadLine();
            }
        }

        private static int estimateHeight(String xmlFile)
        {
            XmlTextReader reader = new XmlTextReader(xmlFile);
            int height = y;
            while (reader.Read())
            {
                switch (reader.NodeType)
                {
                    case XmlNodeType.Element: // The node is an element.
                        if (reader.IsStartElement())
                        {
                            if (reader.IsEmptyElement)
                            {
                                height += elementSpacingY;
                            }
                        }
                        break;
                    case XmlNodeType.EndElement: //Display the end of the element.
                        height += elementSpacingY;
                        break;
                }
            }
            reader.ResetState();
            return height;
        }

        private static void WriteSVGHeader(XmlWriter xmlWriter, int height)
        {
            xmlWriter.WriteStartDocument();
            xmlWriter.WriteStartElement("svg", "http://www.w3.org/2000/svg");
            xmlWriter.WriteAttributeString("width", "auto");
            xmlWriter.WriteAttributeString("height", height + "");
            xmlWriter.WriteAttributeString("style", "overflow:visible ");
            xmlWriter.WriteAttributeString("version", "1.1");
        }

        private static void WriteElement(XmlWriter xmlWriter, string text)
        {
            xmlWriter.WriteStartElement("rect");
            xmlWriter.WriteAttributeString("x", x.ToString());
            xmlWriter.WriteAttributeString("y", y.ToString());
            xmlWriter.WriteAttributeString("width", elementWidth.ToString());
            xmlWriter.WriteAttributeString("height", elementHeight.ToString());
            xmlWriter.WriteAttributeString("style", "fill:white;stroke:black;stroke-width:1");
            xmlWriter.WriteEndElement();
            xmlWriter.WriteStartElement("text");
            xmlWriter.WriteAttributeString("x", (x + 10).ToString());
            xmlWriter.WriteAttributeString("y", (y + 10).ToString());
            xmlWriter.WriteAttributeString("font-size", "10");
            xmlWriter.WriteAttributeString("style", "fill:blue");
            xmlWriter.WriteString(text);
            xmlWriter.WriteEndElement();
            if (parents.Count != 0)
            {
                Node parent = (Node)parents.Peek();
                xmlWriter.WriteStartElement("path");
                int startX = (parent.x + elementWidth);
                int startY = (parent.y + elementHeight / 2);
                int finalX = x;
                int finalY = (y + elementHeight / 2);
                xmlWriter.WriteAttributeString("d", "M" + startX + " " + startY + " C" + finalX + " " + startY + " " + startX + " " + finalY + " " + finalX + " " + finalY);
                xmlWriter.WriteAttributeString("style", "fill:transparent;stroke:black");
                xmlWriter.WriteEndElement();
            }
        }

        private static void WriteValue(XmlWriter xmlWriter, string text)
        {
            Node current = (Node)parents.Peek();
            xmlWriter.WriteStartElement("rect");
            xmlWriter.WriteAttributeString("x", (current.x + elementWidth / 3).ToString());
            xmlWriter.WriteAttributeString("y", y.ToString());
            xmlWriter.WriteAttributeString("width", (elementWidth / 3 * 2 + 5).ToString());
            xmlWriter.WriteAttributeString("height", elementHeight.ToString());
            xmlWriter.WriteAttributeString("style", "fill:green;stroke:black;stroke-width:1");
            xmlWriter.WriteEndElement();
            xmlWriter.WriteStartElement("text");
            xmlWriter.WriteAttributeString("x", ((current.x + elementWidth / 3) + 10).ToString());
            xmlWriter.WriteAttributeString("y", (y + 10).ToString());
            xmlWriter.WriteAttributeString("font-size", "8");
            xmlWriter.WriteAttributeString("style", "fill:white");
            xmlWriter.WriteString(text);
            xmlWriter.WriteEndElement();
        }

        private static void WriteAttribute(XmlWriter xmlWriter, string text, int attributeY)
        {
            Node current = (Node)parents.Peek();
            xmlWriter.WriteStartElement("text");
            xmlWriter.WriteAttributeString("x", ((current.x) + 10).ToString());
            xmlWriter.WriteAttributeString("y", (attributeY + 10).ToString());
            xmlWriter.WriteAttributeString("font-size", "8");
            xmlWriter.WriteAttributeString("style", "fill:black");
            xmlWriter.WriteString(text);
            xmlWriter.WriteEndElement();
        }

    }
}