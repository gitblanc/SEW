import cairo

def createRectangle(context, x, y, width, height):
    # creating a rectangle(square) for left eye
    context.rectangle(x, y, width, height)
    return context

def createContext():
    # creating a SVG surface
    # here geek is file name & 700, 700 is dimension
    with cairo.SVGSurface("redSocial.svg", 700, 700) as surface:
        # creating a cairo context object
        context = cairo.Context(surface)

        #Creamos los rectángulos
        x = 0
        y = 0
        i=0
        for i in range(4):
            context = createRectangle(context, x, y, 300,100)
            x+=110
            y+=110

        # setting scale of the context
        context.scale(700, 700)

        # setting line width of the context
        context.set_line_width(0.004)
        # setting color of the context
        context.set_source_rgba(0.4, 1, 0.4, 1)

        # stroke out the color and width property
        context.stroke()

createContext()
print("File Saved")