module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017
  },
  env: {
    es6: true,
    node: true
  },
  extends: 'sane',
  overrides: [
    {
      files: [
        'test/**'
      ],
      env: {
        mocha: true
      },
      plugins: [
        'mocha'
      ],
      rules: {
        'mocha/no-exclusive-tests': 'error'
      },
    }
  ]
};
