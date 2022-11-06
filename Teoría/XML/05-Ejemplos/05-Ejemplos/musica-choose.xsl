<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<body>
  <h1>Mi catálogo de CD's</h1>
  <h2>Marcados con *** los de precio superior a 10</h2>
  <table>
    <tr>
      <th>Título</th>
      <th>Artista</th>
    </tr>
    <xsl:for-each select="catalogo/cd">
	<xsl:sort order="ascending" select="artist"/> 
    <tr>
      <td><xsl:value-of select="title"/></td>
      <xsl:choose>
      <xsl:when test="price &gt; 10">
         <td>
		 ***
         <xsl:value-of select="artist"/>
		 ***
         </td>
      </xsl:when>
      <xsl:otherwise>
         <td><xsl:value-of select="artist"/></td>
      </xsl:otherwise>
      </xsl:choose>
    </tr>
    </xsl:for-each>
  </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
