<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="redSocial">
	<html>
		<body>
			<h1>Social Network</h1>
				<!-- Nivel 1 -->
				<xsl:foreach select="redSocial/persona">
					<p>Nombre: <xsl:value-of select="nombre" /></p>
					<p>Apellidos: <xsl:value-of select="apellidos" /></p>
					<p>Fecha: <xsl:value-of select="fecha" /></p>
					<p>Lugar de nacimiento: <xsl:value-of select="lugar_nacimiento" /></p>
					<p>Coordenadas de nacimiento: <xsl:value-of select="coordenadas_nacimiento" /></p>
					<p>Lugar de residencia: <xsl:value-of select="lugar_residencia" /></p>
					<p>Coordenadas de residencia: <xsl:value-of select="coordenadas_residencia" /></p>
					<p><xsl:value-of select="fotografia" /></p>
					<p><xsl:value-of select="video" /></p>
					<p>Comentarios: <xsl:value-of select="comentarios" /></p>
				</xsl:foreach> 
		</body>
	</html>
</xsl:template>

</xsl:stylesheet>
