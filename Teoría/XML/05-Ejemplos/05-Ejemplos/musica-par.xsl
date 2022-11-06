<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

 <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" /> 
 
 <xsl:param name="ordenadoPor" select="'artist'"/>
 <xsl:param name="orden" select="'ascending'"/>

<xsl:template match="/">
<html>
<body>
<h1>Mi catálogo de CD's</h1>
<h2>Listado de artistas ordenado</h2>  
  
  <xsl:for-each select="catalogo/cd">
    <xsl:sort select = "*[name()=$ordenadoPor]" order="{$orden}"/>
	<p><xsl:value-of select="*[name()=$ordenadoPor]"/></p>
  </xsl:for-each>
  
  </body>
  </html>
</xsl:template>

</xsl:stylesheet> 