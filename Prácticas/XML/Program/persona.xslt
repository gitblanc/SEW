<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="persona">
	<html>
		<body>
			<h1>Social Network</h1>
				<!-- Nivel 1 -->
				<xsl:value-of select="persona">
					<p><xsl:value-of select="nombre" /></p>
					<p><xsl:value-of select="apellidos" /></p>
					<p><xsl:value-of select="fecha" /></p>
					<p><xsl:value-of select="lugar_nacimiento" /></p>
					<p><xsl:value-of select="coordenadas_nacimiento" /></p>
					<p><xsl:value-of select="lugar_residencia" /></p>
					<p><xsl:value-of select="coordenadas_residencia" /></p>
					<p><xsl:value-of select="fotografia" /></p>
					<p><xsl:value-of select="video" /></p>
					<p><xsl:value-of select="comentarios" /></p>
				</xsl:value-of> 
		</body>
	</html>
</xsl:template>

</xsl:stylesheet>
