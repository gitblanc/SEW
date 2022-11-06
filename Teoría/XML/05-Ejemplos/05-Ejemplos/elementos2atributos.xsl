<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
	  
<xsl:output method="xml" indent="yes"/>

<xsl:template match="//verso">
   <xsl:element name="elemento">
      <xsl:attribute name="{name()}">
         <xsl:value-of select="."/>
      </xsl:attribute>
   </xsl:element>
</xsl:template>

</xsl:stylesheet>
