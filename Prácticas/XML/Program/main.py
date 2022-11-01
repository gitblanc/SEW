from lxml import etree
# import module

def xml_html_converter():

    xslt_doc = etree.parse("persona.xslt")
    xslt_transformer = etree.XSLT(xslt_doc)

    #El xml inicial
    source_doc = etree.parse("xml.xml")
    #El html final
    output_doc = xslt_transformer(source_doc)
    return output_doc


def writeToArchive(fileReaded, fileWritten):
    # open both files
    with open(fileWritten, 'w') as secondfile:
        # read content from first file
        for line in fileReaded:
            # append content to second file
            secondfile.write(line)
    print("SUCCESS")

fileReaded = str(xml_html_converter())
print(fileReaded)
fileWritten = "persona.html"

fileRTrimmed = fileReaded.split("\n")
writeToArchive(fileRTrimmed,fileWritten)