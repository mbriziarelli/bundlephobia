const stories = [
  '../components/**/*.stories.[tj]s',
  '../components/**/*.stories.[tj]sx',
]

const webpackFinal = async config => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          configFile: 'tsconfig.webpack.json',
        },
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  })

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}

module.exports = {
  stories,
  webpackFinal,
}
