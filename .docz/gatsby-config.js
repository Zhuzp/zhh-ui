const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'happy-ui',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/Users/zhuzhengpin/Desktop/code/zhh-ui/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: './packages/components/**/*.{md,markdown,mdx}',
        public: '/public',
        dest: 'doc-site',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'happy-ui',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3001,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/zhuzhengpin/Desktop/code/zhh-ui',
          templates:
            '/Users/zhuzhengpin/Desktop/code/zhh-ui/node_modules/.pnpm/docz-core@2.4.0_eslint-loader@2.2.1_eslint@6.8.0_webpack@4.47.0__eslint@6.8.0_gatsby@2.32.13__lmjz6o5qk2twlfjykvzlgkm5tu/node_modules/docz-core/dist/templates',
          docz: '/Users/zhuzhengpin/Desktop/code/zhh-ui/.docz',
          cache: '/Users/zhuzhengpin/Desktop/code/zhh-ui/.docz/.cache',
          app: '/Users/zhuzhengpin/Desktop/code/zhh-ui/.docz/app',
          appPackageJson: '/Users/zhuzhengpin/Desktop/code/zhh-ui/package.json',
          appTsConfig: '/Users/zhuzhengpin/Desktop/code/zhh-ui/tsconfig.json',
          gatsbyConfig:
            '/Users/zhuzhengpin/Desktop/code/zhh-ui/gatsby-config.js',
          gatsbyBrowser:
            '/Users/zhuzhengpin/Desktop/code/zhh-ui/gatsby-browser.js',
          gatsbyNode: '/Users/zhuzhengpin/Desktop/code/zhh-ui/gatsby-node.js',
          gatsbySSR: '/Users/zhuzhengpin/Desktop/code/zhh-ui/gatsby-ssr.js',
          importsJs:
            '/Users/zhuzhengpin/Desktop/code/zhh-ui/.docz/app/imports.js',
          rootJs: '/Users/zhuzhengpin/Desktop/code/zhh-ui/.docz/app/root.jsx',
          indexJs: '/Users/zhuzhengpin/Desktop/code/zhh-ui/.docz/app/index.jsx',
          indexHtml:
            '/Users/zhuzhengpin/Desktop/code/zhh-ui/.docz/app/index.html',
          db: '/Users/zhuzhengpin/Desktop/code/zhh-ui/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
