import { uglify } from 'rollup-plugin-uglify'
import baseConfig from './rollup.config.base'

baseConfig.output = [
  {
    file: 'dist/dark-fns.umd.min.js',
    format: 'umd',
    name: 'darkFns'
  },
  {
    file: 'dist/dark-fns.cjs.min.js',
    format: 'cjs',
    name: 'darkFns'
  },
  {
    file: 'dist/dark-fns.amd.min.js',
    format: 'amd',
    name: 'darkFns'
  },
  {
    file: 'dist/dark-fns.iife.min.js',
    format: 'iife',
    name: 'darkFns'
  }
]

baseConfig.plugins.push(uglify())

export default baseConfig
