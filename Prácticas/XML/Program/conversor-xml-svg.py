import cairo
import re


def createRectangle(context, x, y, width, height):
    # creating a rectangle(square) for left eye
    context.rectangle(x, y, width, height)
    return context


def pintarDatos(context, textX, textY, atributos, posy, posx, tamx, tamy):
    for l in range(2, len(atributos)):
        if (l == 2):
            context.move_to(textX, textY)
            context.show_text("fecha: " + atributos[l])
            context = createRectangle(context, posx, posy, tamx, tamy)
        elif (l == 3):
            context.move_to(textX, textY + 50)
            context.show_text("lugar_nacimiento: " + atributos[l])
            context = createRectangle(context, posx, posy, tamx, tamy)
        elif (l == 4):
            context.move_to(textX, textY + 100)
            context.show_text("coord_nacimiento: " + atributos[l])
            context = createRectangle(context, posx, posy, tamx+150, tamy)
        elif (l == 5):
            context.move_to(textX, textY + 150)
            context.show_text("lugar_residencia: " + atributos[l])
            context = createRectangle(context, posx, posy, tamx, tamy)
        elif (l == 6):
            context.move_to(textX, textY + 200)
            context.show_text("coord_residencia: " + atributos[l])
            context = createRectangle(context, posx, posy, tamx+150, tamy)
        elif (l == 7):
            context.move_to(textX, textY + 250)
            context.show_text("fotografia")
            context = createRectangle(context, posx, posy, tamx, tamy)
        elif (l == 8):#FALTA MODIFICAR AQUÍ PARA VER MÁS VÍDEOS
            context.move_to(textX, textY + 300)
            context.show_text("video")
            context = createRectangle(context, posx, posy, tamx, tamy)
        elif (l == 9):
            context.move_to(textX, textY + 350)
            context.show_text("comentarios: " + atributos[l])
            context = createRectangle(context, posx, posy, tamx, tamy)

        posy += 50
    return textX, textY+400, posy, posx

def pintarPersona(textX, textY, inTextX, inTextY, tamx, tamy, posx, posy, context, atributos):
    context.move_to(textX, textY)
    context.show_text("persona")
    context.move_to(inTextX, inTextY)  # 20, 30
    context.show_text("nombre: " + atributos[0])
    context.move_to(inTextX, inTextY + 10)  # 20,40
    context.show_text("apellidos: " + atributos[1])
    context = createRectangle(context, posx, posy, tamx, tamy)  # 10,10
    return textX+190,posx+190, textY,posy, inTextX+190, inTextY+400


def createContext(personas):
    # creating a SVG surface
    # here geek is file name & 700, 700 is dimension
    with cairo.SVGSurface("redSocial.svg", 6000, 6000) as surface:
        # creating a cairo context object
        context = cairo.Context(surface)

        # Tamaño de los rectángulos (constante)
        tamx = 150
        tamy = 35
        #Posición del etiquetas
        textX = 20
        textY = 20
        #Posición de atributos
        inTextX = 20
        inTextY = 30
        #Posición de los rectángulos
        posx = 10
        posy = 10
        #Nivel del árbol DOM
        nivel = 1

        context.set_font_size(9)

        for k in range(len(personas)):
            # Sacamos la persona
            persona = personas[k]
            atributos = persona.split("@z@")
            #NIVEL 1
            if(k == 0):
                #Caja de la persona
                ##textX y posx se modifican
                textX, posx, textY,posy,inTextX, inTextY= pintarPersona(textX, textY, inTextX, inTextY, tamx, tamy, posx, posy, context, atributos)
                #Caja de los datos
                textX, textY, posy, posx = pintarDatos(context, textX, textY, atributos, posy, posx, tamx, tamy)
                nivel+=1

            #NIVEL 2
            elif(k in [1,5,9]):
                if(k == 1):
                    # Caja de la persona
                    textX, posx, textY,posy,inTextX, inTextY = pintarPersona(textX, textY, inTextX, inTextY, tamx, tamy, posx, posy, context, atributos)
                    # Caja de los datos
                    textX, textY, posy, posx = pintarDatos(context, textX, textY, atributos, posy, posx, tamx, tamy)
                    nivel += 1
                else:
                    textX -= 190 * 2
                    inTextX -= 190 * 2
                    posx -= 190 * 2
                    # Caja de la persona
                    textX, posx, textY, posy, inTextX, inTextY = pintarPersona(textX, textY, inTextX, inTextY, tamx,
                                                                               tamy,
                                                                               posx, posy, context, atributos)
                    # Caja de los datos
                    textX, textY, posy, posx = pintarDatos(context, textX, textY, atributos, posy, posx, tamx, tamy)
                    nivel += 1
            #NIVEL 3
            elif (k in [2,3,4,6,7,8,10,11,12]):
                if(k in [2,6,10]):
                    # Caja de la persona
                    textX, posx, textY,posy,inTextX, inTextY = pintarPersona(textX, textY, inTextX, inTextY, tamx, tamy, posx, posy, context, atributos)
                    # Caja de los datos
                    textX, textY, posy, posx = pintarDatos(context, textX, textY, atributos, posy, posx, tamx, tamy)
                    nivel += 1
                elif(k == 3):
                    textX -= 190
                    inTextX -=190
                    posx -= 190
                    # Caja de la persona
                    textX, posx, textY,posy,inTextX, inTextY = pintarPersona(textX, textY, inTextX, inTextY, tamx, tamy, posx, posy, context, atributos)
                    # Caja de los datos
                    textX, textY, posy, posx = pintarDatos(context, textX, textY, atributos, posy, posx, tamx, tamy)
                else:
                    textX -= 190
                    inTextX -= 190
                    posx -= 190
                    # Caja de la persona
                    textX, posx, textY,posy,inTextX, inTextY = pintarPersona(textX, textY, inTextX, inTextY, tamx, tamy, posx, posy, context, atributos)
                    # Caja de los datos
                    textX, textY, posy, posx = pintarDatos(context, textX, textY, atributos, posy, posx, tamx, tamy)
        # setting scale of the context
        context.scale(700, 700)

        # setting line width of the context
        context.set_line_width(0.0015)
        # setting color of the context
        context.set_source_rgba(0, 1, 0.3, 1)

        # stroke out the color and width property
        context.stroke()


def escribirLinea(linea):
    if ("nombre" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<nombre>", "", linea)
        linea = re.sub("</nombre>", "", linea)
        enlace = linea.split("\n")
        return enlace[0]
    elif ("apellidos" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<apellidos>", "", linea)
        linea = re.sub("</apellidos>", "", linea)
        enlace = linea.split("\n")
        return enlace[0]
    elif ("fecha" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<fecha>", "", linea)
        linea = re.sub("</fecha>", "", linea)
        enlace = linea.split("\n")
        return enlace[0]
    elif ("lugar_nacimiento" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<lugar_nacimiento>", "", linea)
        linea = re.sub("</lugar_nacimiento>", "", linea)
        enlace = linea.split("\n")
        return enlace[0]
    elif ("coordenadas_nacimiento" in linea):

        linea = re.sub("\t", "", linea)
        linea = re.sub("<coordenadas_nacimiento>", "", linea)
        linea = re.sub("</coordenadas_nacimiento>", "", linea)
        enlace = linea.split("\n")
        return enlace[0]
    elif ("lugar_residencia" in linea):

        linea = re.sub("\t", "", linea)
        linea = re.sub("<lugar_residencia>", "", linea)
        linea = re.sub("</lugar_residencia>", "", linea)
        enlace = linea.split("\n")
        return enlace[0]
    elif ("coordenadas_residencia" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<coordenadas_residencia>", "", linea)
        linea = re.sub("</coordenadas_residencia>", "", linea)
        enlace = linea.split("\n")
        return enlace[0]
    elif ("fotografia" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<fotografia>", "", linea)
        linea = re.sub("</fotografia>", "", linea)  # con el CDATA
        linea = re.sub("<!\[CDATA\[", "", linea)
        linea = re.sub("]]>", "", linea)
        enlace = linea.split("\n")
        return enlace[0]
    elif ("video" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<video>", "", linea)
        linea = re.sub("</video>", "", linea)
        linea = re.sub("<!\[CDATA\[", "", linea)
        linea = re.sub("]]>", "", linea)
        enlace = linea.split("\n")
        return enlace[0]
    elif ("comentarios" in linea):
        linea = re.sub("\t", "", linea)
        linea = re.sub("<comentarios>", "", linea)
        linea = re.sub("</comentarios>", "", linea)
        enlace = linea.split("\n")
        return enlace[0]


def leerXML():
    fileXMLOpened = open("xml.xml")
    lines = fileXMLOpened.readlines()

    try:
        #Todas las personas que se crearán
        personas = ['1','2','3','4','5','6','7','8','9','10','11','12','13']
        i = 0
        # Declaramos todos los elementos de una persona
        nombre = ""
        apellidos = ""
        fecha = ""
        lugar_nacimiento = ""
        coordenadas_nacimiento = ""
        lugar_residencia = ""
        coordenadas_residencia = ""
        fotografia = ""
        videos = ""
        numVideos = 0
        for linea in lines:
            if ("nombre" in linea):
                nombre = escribirLinea(linea)
            elif ("apellidos" in linea):
                apellidos = escribirLinea(linea)
            elif ("fecha" in linea):
                fecha = escribirLinea(linea)
            elif ("lugar_nacimiento" in linea):
                lugar_nacimiento = escribirLinea(linea)
            elif ("coordenadas_nacimiento" in linea):
                coordenadas_nacimiento = escribirLinea(linea)
            elif ("lugar_residencia" in linea):
                lugar_residencia = escribirLinea(linea)
            elif ("coordenadas_residencia" in linea):
                coordenadas_residencia = escribirLinea(linea)
            elif ("fotografia" in linea):
                fotografia = escribirLinea(linea)
            elif ("video" in linea):
                if(numVideos == 0):
                    videos = escribirLinea(linea)
                    numVideos += 1
                else:
                    videos += "@videovideo@" + escribirLinea(linea)
                    numVideos += 1
            elif ("comentarios" in linea):
                comentarios = escribirLinea(linea)
                #Se crea una persona
                persona = nombre + "@z@" + apellidos + "@z@" + fecha + "@z@" + lugar_nacimiento + "@z@" +\
                          coordenadas_nacimiento + "@z@" + lugar_residencia + "@z@" +\
                          coordenadas_residencia + "@z@" + fotografia + "@z@" + videos + "@z@" + comentarios
                personas[i] = persona
                i += 1
                numVideos = 0

    finally:
        fileXMLOpened.close()
        return personas

#Sacamos las personas y las enviamos al creador del .svg
personas = leerXML()
createContext(personas)

print("File Saved")