<?xml version="1.0" encoding="UTF-8" ?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" /> 
<xsl:template match="/">
  <html>
  <body>
  <h1>Mi catálogo de CD's</h1>
  <ul>
  <xsl:apply-templates/>
  </ul>
  </body>
  </html>
</xsl:template>

<xsl:template match="cd">
  <li>
  <xsl:apply-templates select="title"/>
  <xsl:apply-templates select="artist"/>
  </li>
</xsl:template>

<xsl:template match="title">
  Título: <xsl:value-of select="."/> 
</xsl:template>

<xsl:template match="artist">
  Artista: <xsl:value-of select="."/>
</xsl:template>

</xsl:stylesheet> 