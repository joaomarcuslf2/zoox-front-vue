module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 120,
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': 'off',
    indent: 'off',
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'max-len': 'off',
    'new-cap': 'off',
    'no-case-declarations': 'warn',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxBOF: 1,
        maxEOF: 1,
      },
    ],
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'space-after-keywords': 'off',
    'no-useless-escape': 'off',
    'object-curly-spacing': 'off',
    'prefer-template': 'error',
    'valid-jsdoc': [
      'error',
      {
        requireReturnType: true,
        requireParamDescription: true,
        requireReturnDescription: true,
        prefer: {
          arg: 'param',
          argument: 'param',
          class: 'constructor',
          return: 'returns',
          virtual: 'abstract',
        },
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
