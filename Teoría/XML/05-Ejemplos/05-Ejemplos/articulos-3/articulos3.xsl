<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
	<xsl:output method="html" version="5.0" encoding="utf-8" indent="yes"/>
	<xsl:variable name="since-year" select="2010"/>
	<xsl:variable name="until-year" select="2015"/>

	<xsl:template match="articles">
		<xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html></xsl:text>
		<html lang="es">
			<head>
				<meta name="description" content="Ejercicio resuelto 3"/>
				<title>Ejercicio 3</title>
				<link rel="stylesheet" type="text/css" href="style.css"/>
			</head>
			<body>
				<header>
					<h1>EJERCICIO 3</h1>
					<h2>Artículos de revista entre 2 fechas (<xsl:value-of select="$since-year"/> - <xsl:value-of select="$until-year"/>) y ordenados
					</h2>
				</header>
				<main>
					<xsl:for-each select="article">
						<xsl:sort order="descending" select="@year"/>
						<xsl:if test="$since-year &lt; @year and @year &lt;= $until-year">
							<section class="article">
								<h3>
									<xsl:value-of select="title"/>
								</h3>
								<p>
									<span class="section">Año: </span>
									<xsl:value-of select="@year"/>
								</p>
								<p>
									<span class="section">Revista: </span>
									<xsl:value-of select="journal"/>
								</p>
								<p>
									<span class="section">Volumen: </span>
									<xsl:value-of select="volume"/>
								</p>
								<xsl:if test="count(keywords//keyword) &gt; 0">
									<p>
										<span class="section">Palabras clave: </span>
										<xsl:for-each select="keywords//keyword">
											<xsl:value-of select="."/>
											<xsl:if test="not(position()=last())">
												<xsl:text>, </xsl:text>
											</xsl:if>
										</xsl:for-each>
									</p>
								</xsl:if>
								<p>
									<span class="section">Páginas del artículo: </span>
									<xsl:value-of select="@start-page"/>
									<xsl:text>-</xsl:text>
									<xsl:value-of select="@end-page"/>
								</p>
								<p class="authors-section">
									<span class="section">Autores: </span>
								</p>
								<ul class="authors">
									<xsl:for-each select="authors//author">
										<li>
											<xsl:value-of select="."/>
											<span class="email">
												<xsl:text> (</xsl:text>
												<xsl:value-of select="@email"/>
												<xsl:text>) </xsl:text>
											</span>
										</li>
									</xsl:for-each>
								</ul>
								<p class="summary-section">
									<span class="section">Resumen: </span>
								</p>
								<p class="summary">
									<xsl:value-of select="summary"/>
								</p>
							</section>
						</xsl:if>
					</xsl:for-each>
					<footer>
						<div>
							<p>Máster en Ingeniería Web</p>
							<p>Universidad de Oviedo</p>
						</div>
						<div class="validations">
							<a href="https://validator.w3.org/check?uri=referer">
								<img src="https://www.w3.org/html/logo/badge/html5-badge-h-solo.png" alt=" HTML5 Válido!" height=" 64" width="63" />
							</a>
							<a href=" http://jigsaw.w3.org/css-validator/check/referer ">
								<img src=" http://jigsaw.w3.org/css-validator/images/vcss" alt="¡CSS Válido!" height="31" width="88" />
							</a>
							<a href="http://www.w3.org/WAI/WCAG2AAA-Conformance">
								<img src="http://www.w3.org/WAI/wcag2AAA" alt="Level Triple-A conformance, W3C WAI Web Content Accessibility Guidelines 2.0"/>
							</a>
						</div>
					</footer>
				</main>
			</body>
		</html>
	</xsl:template>

</xsl:stylesheet>