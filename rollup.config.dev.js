import baseConfig from './rollup.config.base'

baseConfig.output = [
  {
    file: 'dist/dark-fns.umd.js',
    format: 'umd',
    name: 'darkFns'
  },
  {
    file: 'dist/dark-fns.cjs.js',
    format: 'cjs',
    name: 'darkFns'
  },
  {
    file: 'dist/dark-fns.amd.js',
    format: 'amd',
    name: 'darkFns'
  },
  {
    file: 'dist/dark-fns.iife.js',
    format: 'iife',
    name: 'darkFns'
  }
]

export default baseConfig
