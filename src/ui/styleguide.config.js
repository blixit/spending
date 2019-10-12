const path = require('path');

module.exports = {
  styleguideComponents: {
    Wrapper: path.resolve('src/doc-only/Wrapper')
  },
  require: [
    path.resolve('styleguide.setup.js')
  ],
  moduleAliases: {
    'ui': path.resolve(__dirname, 'src'),
    'atoms': path.resolve(__dirname, 'src/atoms'),
    'inputs': path.resolve(__dirname, 'src/inputs'),
    'molecules': path.resolve(__dirname, 'src/molecules'),
    'structure': path.resolve(__dirname, 'src/structure'),
    'system': path.resolve(__dirname, 'src/system'),
    'theming': path.resolve(__dirname, 'src/theming'),
    'doc-only': path.resolve(__dirname, 'src/doc-only')
  },
  sections: [
    {
      name: 'Atoms',
      components: 'src/atoms/**/*.js'
    },
    {
      name: 'Inputs',
      components: 'src/inputs/**/*.js'
    },
    {
      name: 'Molecules',
      components: 'src/molecules/**/*.js'
    },
    {
      name: 'Structure',
      components: 'src/structure/**/*.js'
    },
    {
      name: 'System',
      components: 'src/system/**/*.js'
    },
    {
      name: 'Theming',
      components: 'src/theming/**/*.js'
    },
    {
      name: 'Doc',
      components: 'src/doc-only/*.js'
    }
  ]
};