<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

 <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" /> 
<xsl:template match="/">
<html>
<body>
<h1>Mi catálogo de CD's</h1>
<h2>Lista de precios</h2>  
  
 <xsl:for-each select="catalogo/cd/price">
    <xsl:variable name = "precio" select = "." />        
    <p><xsl:value-of select = "$precio" /></p> 
  </xsl:for-each>
 
  </body>
  </html>
</xsl:template>

</xsl:stylesheet> 