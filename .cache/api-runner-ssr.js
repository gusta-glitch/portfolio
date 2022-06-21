var plugins = [{
      name: 'gatsby-plugin-mdx',
      plugin: require('/home/justino/Documentos/Desenvolvimento/JavaScript/Node/portfolio/node_modules/gatsby-plugin-mdx/gatsby-ssr.js'),
      options: {"plugins":[],"lessBabel":true,"extensions":[".mdx"],"defaultLayouts":{},"gatsbyRemarkPlugins":[],"remarkPlugins":[],"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"root":"/home/justino/Documentos/Desenvolvimento/JavaScript/Node/portfolio","commonmark":false,"JSFrontmatterEngine":false,"engines":{}},
    },{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('/home/justino/Documentos/Desenvolvimento/JavaScript/Node/portfolio/node_modules/gatsby-plugin-react-helmet/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-theme-ui',
      plugin: require('/home/justino/Documentos/Desenvolvimento/JavaScript/Node/portfolio/node_modules/gatsby-plugin-theme-ui/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('/home/justino/Documentos/Desenvolvimento/JavaScript/Node/portfolio/node_modules/gatsby-plugin-manifest/gatsby-ssr.js'),
      options: {"plugins":[],"name":"Gustavo Freitas - Portfólio","short_name":"Gustavo Freitas","description":"Site feito em Gatsby, um framework de geração de paginas estáticas baseado em React","start_url":"/","background_color":"#141821","display":"standalone","icons":[{"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}],"legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":null},
    },{
      name: 'gatsby-plugin-gatsby-cloud',
      plugin: require('/home/justino/Documentos/Desenvolvimento/JavaScript/Node/portfolio/node_modules/gatsby-plugin-gatsby-cloud/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'partytown',
      plugin: require('/home/justino/Documentos/Desenvolvimento/JavaScript/Node/portfolio/node_modules/gatsby/dist/internal-plugins/partytown/gatsby-ssr.js'),
      options: {"plugins":[]},
    }]
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`
  }

  throw err
}

export function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      return
    }

    try {
      const result = apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  })

  return results.length ? results : [defaultReturn]
}

export async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      continue
    }

    try {
      const result = await apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  }

  return results.length ? results : [defaultReturn]
}
