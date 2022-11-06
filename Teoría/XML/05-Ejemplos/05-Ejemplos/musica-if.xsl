<?xml version="1.0" encoding="UTF-8" ?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" /> 
<xsl:template match="/">
<html>
<body>
  <h1>Mi catálogo de CD's ordenados por años posteriores a 1990</h1> 
  <table>
<tr>
  <th>Título</th> 
  <th>Artista</th> 
  <th>País</th>
  <th>Compañia</th>
  <th>Precio</th>
  <th>Año</th>
  </tr>
 <xsl:for-each select="catalogo/cd">
 <xsl:sort order="ascending" select="year"/> 
 <xsl:if test="year &gt; 1990">
   <tr>
    <td><xsl:value-of select="title" /> </td>
    <td><xsl:value-of select="artist" /> </td>
	<td><xsl:value-of select="country" /> </td>
	<td><xsl:value-of select="company" /> </td>
	<td><xsl:value-of select="price" /> </td>
	<td><xsl:value-of select="year" /> </td>
   </tr>
  </xsl:if>
  </xsl:for-each>
  </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>