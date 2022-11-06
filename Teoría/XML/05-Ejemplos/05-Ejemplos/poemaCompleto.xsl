<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html"/>

<xsl:template match="poema">
<html> 
 <body>
  <p>Autor : <xsl:value-of select="@autor"/></p>
  <p>Fecha : <xsl:value-of select="@fecha"/></p>
  <p>Lugar : <xsl:value-of select="@lugar"/></p>
  <p>Título: <xsl:value-of select="titulo"/></p>
  <p>Versos:</p>
  <xsl:for-each select="verso">
    <p><xsl:value-of select="."/></p>
  </xsl:for-each>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>