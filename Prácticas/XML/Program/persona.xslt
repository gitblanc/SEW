<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="persona">
	<html>
		<body>
			<h1>Social Network</h1>
				<xsl:for-each select="persona/persona">
					<h2><xsl:value-of select="datos"/></h2>
				</xsl:for-each>
			 
		</body>
	</html>
</xsl:template>

</xsl:stylesheet>
