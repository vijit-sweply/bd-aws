module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
  ],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  ignorePatterns: [
    'ckeditor/**/*.js',
  ],
  rules: {
    'linebreak-style': 0,
    'no-promise-executor-return': 0,
    'func-names': [
      'error',
      'as-needed',
    ],
    'react-hooks/exhaustive-deps': 0,
    'react/jsx-no-constructed-context-values': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/button-has-type': 0,
    'react/jsx-filename-extension': [
      0,
      {
        extensions: [
          '.js',
        ],
      },
    ],
    'react/jsx-props-no-spreading': [
      0,
      {
        html: 'ignore',
        custom: 'ignore',
      },
    ],
    'react/destructuring-assignment': [
      0,
      'never',
      {
        ignoreClassFields: true,
      },
    ],
    'jsx-a11y/anchor-has-content': [
      2,
      {
        components: [
          'Anchor',
        ],
      },
    ],
    'react/no-deprecated': 0,
    'react/require-extension': 0,
    'react/no-did-mount-set-state': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/sort-comp': 0,
    'react/static-property-placement': 0,
    'react/jsx-no-bind': 0,
    'arrow-parens': [
      2,
      'as-needed',
    ],
    'arrow-body-style': [
      2,
      'as-needed',
    ],
    'implicit-arrow-linebreak': 0,
    'import/no-mutable-exports': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-cycle': 0,
    'no-console': 0,
    'no-restricted-globals': 0,
    'no-underscore-dangle': 0,
    strict: 0,
    'new-cap': [
      2,
      {
        capIsNewExceptions: [
          'Router',
        ],
      },
    ],
    'function-paren-newline': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0, // This fixes a problem with Codeclimate https://github.com/codeclimate/codeclimate-eslint/issues/90
    'no-trailing-spaces': 2,
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
  },
  globals: {
    describe: true,
    context: true,
    it: true,
    xit: true,
    before: true,
    beforeEach: true,
    afterEach: true,
    Modernizr: true,
  },
};
