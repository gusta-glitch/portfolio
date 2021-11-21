require(`dotenv`).config();

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

module.exports = {
	siteMetadata: {
		// You can overwrite values here that are used for the SEO component
		// You can also add new values here to query them like usual
		// See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-cara/gatsby-config.js
		siteTitle: `Gustavo Freitas`,
		siteTitleAlt: `Gustavo Freitas - Portfólio`,
		siteHeadline: `Cara - Gatsby Theme from @lekoarts`,
		siteUrl: `https://cara.lekoarts.de`,
		siteDescription: `Playful and Colorful One-Page portfolio featuring Parallax effects and animations`,
		siteLanguage: `pt-BR`,
		siteImage: `/banner.jpg`,
		author: `@gustavofreitas`,
	},
	plugins: [
		{
			resolve: `@lekoarts/gatsby-theme-cara`,
			// See the theme's README for all available options
			options: {},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Gustavo Freitas - Portfólio`,
				short_name: `Gustavo Freitas`,
				description: `Site feito em Gatsby, um framework de geração de paginas estáticas baseado em React`,
				start_url: `/`,
				background_color: `#141821`,
				// This will impact how browsers show your PWA/website
				// https://css-tricks.com/meta-theme-color-and-trickery/
				// theme_color: `#f6ad55`,
				display: `standalone`,
				icons: [
					{
						src: `/android-chrome-192x192.png`,
						sizes: `192x192`,
						type: `image/png`,
					},
					{
						src: `/android-chrome-512x512.png`,
						sizes: `512x512`,
						type: `image/png`,
					},
				],
			},
		},
		`gatsby-plugin-gatsby-cloud`,
		shouldAnalyseBundle && {
			resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
			options: {
				analyzerMode: `static`,
				reportFilename: `_bundle.html`,
				openAnalyzer: false,
			},
		},
	].filter(Boolean),
	pathPrefix: "/portfolio",
};
