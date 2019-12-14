import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  external: [],
  plugins: [
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**'
    })
  ]
}
