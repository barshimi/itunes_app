/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug'
import path from 'path'

const debug = _debug('app:config:_base')
const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_server : 'server',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : 'localhost',
  server_port : process.env.PORT || 8080,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_css_modules     : true,
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendor : [
    'history',
    'react',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux'
  ]
}

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test'
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendor = config.compiler_vendor
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
config.utils_paths = (() => {
  const resolve = path.resolve

  const base = (...args) => {
    return resolve.apply(resolve, [config.path_base, ...args])
  }

  return {
    base   : base,
    client : base.bind(null, config.dir_client),
    dist   : base.bind(null, config.dir_dist)
  }
})()

export default config