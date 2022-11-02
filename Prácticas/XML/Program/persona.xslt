<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="persona">
	<html>
		<body>
			<h1>Social Network</h1>
				<xsl:value-of select="persona">
					<h2><xsl:value-of select="@nombre"/></h2>
					<h2><xsl:value-of select="@apellidos"/></h2>
					<ul>
						<xsl:value-of select="fecha"/><br/>
						<xsl:value-of select="lugar_nacimiento"/><br/>
						<xsl:value-of select="coordenadas_nacimiento"/><br/>
						<xsl:value-of select="lugar_residencia"/><br/>
						<xsl:value-of select="coordenadas_residencia"/><br/>
						<xsl:value-of select="fotografia"/><br/>
						<xsl:value-of select="video"/><br/>
						<xsl:value-of select="comentarios"/><br/>
					</ul>
					<xsl:for-each select="persona">
					</xsl:for-each>
				</xsl:value-of>
			 
		</body>
	</html>
</xsl:template>

</xsl:stylesheet>

