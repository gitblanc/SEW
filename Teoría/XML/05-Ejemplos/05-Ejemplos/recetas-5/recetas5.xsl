<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 
	<xsl:output method="html" version="5.0" encoding="utf-8" indent="yes"/>

	<xsl:template match="cooking-recipes">
		<xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html></xsl:text>
		<html lang="es">
			<head>
				<meta name="description" content="Ejercicio resuelto 5"/>
				<title>Ejercicio 5</title>
				<link rel="stylesheet" type="text/css" href="style.css"/>
			</head>
			<body>
				<header>
					<h1>EJERCICIO 5</h1>
					<h2>Transformación de recetas de cocina</h2>
				</header>
				<main>
					<xsl:for-each select="cooking-recipe">
						<section class="cooking-recipe">
							<h3>
								<xsl:value-of select="name"/>
							</h3>
							<p>
								<span class="section">Tipo de plato: </span>
								<xsl:value-of select="@type"/>
							</p>
							<p>
								<span class="section">Plato vegano: </span>
								<xsl:value-of select="@vegan"/>
							</p>
							<p class="ingredients-section">
								<span class="section">Ingredientes: </span>
							</p>
							<ul class="ingredients">
								<xsl:for-each select="ingredients//ingredient">
									<li>
										<xsl:value-of select="."/>
										<xsl:text> </xsl:text>
										<xsl:text> (</xsl:text>
										<xsl:value-of select="@quantity"/>
										<xsl:text> </xsl:text>
										<xsl:value-of select="@measure"/>
										<xsl:text>) </xsl:text>
										<xsl:if test="@calories">
											<span class="calories">
												<xsl:text> / (</xsl:text>
												<xsl:value-of select="@calories"/>
												<xsl:text> calorías) </xsl:text>
											</span>
										</xsl:if>
									</li>
								</xsl:for-each>
							</ul>
							<xsl:if test="count(elaboration-process//elements//element) &gt; 0">
								<p class="elements-section">
									<span class="section">Elementos necesarios: </span>
								</p>
								<ul class="ingredients">
									<xsl:for-each select="elaboration-process//elements//element">
										<li>
											<xsl:value-of select="."/>
										</li>
									</xsl:for-each>
								</ul>
							</xsl:if>
							<p>
								<span class="section">Origen de la receta: </span>
								<xsl:choose>
									<xsl:when test="contains(origin,'http')">
										<a href="{origin}">
											<xsl:value-of select="origin"/>
										</a>
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="origin"/>
									</xsl:otherwise>
								</xsl:choose>
							</p>
							<p>
								<span class="section">Dificultad de elaboración: </span>
								<xsl:value-of select="elaboration-process/@difficulty"/>
							</p>
							<p>
								<span class="section">Tiempo de elaboración (minutos): </span>
								<xsl:variable name="dHours" select="elaboration-process/@time-minutes div 60"/>
								<xsl:variable name="hours">
									<xsl:choose>
										<xsl:when test="contains($dHours,'.')">
											<xsl:value-of select="substring-before($dHours, '.')"/>
										</xsl:when>
										<xsl:otherwise>
											<xsl:value-of select="$dHours"/>
										</xsl:otherwise>
									</xsl:choose>
								</xsl:variable>
								<xsl:variable name="minutes" select="elaboration-process/@time-minutes mod 60"/>
								<xsl:choose>
									<xsl:when test="$hours = 0">
										<xsl:value-of select="$minutes"/>
										<xsl:text> minutos</xsl:text>
									</xsl:when>
									<xsl:when test="$hours != 0">
										<xsl:value-of select="$hours"/>
										<xsl:if test="$hours = 1">
											<xsl:text> hora</xsl:text>
										</xsl:if>
										<xsl:if test="$hours > 1">
											<xsl:text> horas</xsl:text>
										</xsl:if>
										<xsl:if test="$minutes != 0">
											<xsl:text> y </xsl:text>
											<xsl:value-of select="$minutes"/>
											<xsl:text> minutos</xsl:text>
										</xsl:if>
									</xsl:when>
								</xsl:choose>
							</p>
							<p class="elaboration-process-section">
								<span class="section">Proceso de elaboración: </span>
							</p>
							<ul class="elaboration-process">
								<xsl:for-each select="elaboration-process//steps//step">
									<li>
										<span class="step">
											<xsl:text>Paso </xsl:text>
											<xsl:value-of select="@number"/>
										</span>
										<xsl:text>. </xsl:text>
										<xsl:value-of select="."/>
									</li>
								</xsl:for-each>
							</ul>
						</section>
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