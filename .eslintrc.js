module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:meteor/recommended",
    "standard"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "allowImportExportEverywhere": true,
    "ecmaVersion": 8,
		"sourceType": "module"
  },
  "rules": {
    "babel/generator-star-spacing": 0,
    "babel/array-bracket-spacing": 0,
    "babel/object-curly-spacing": 0,
    "babel/object-shorthand": 0,
    "babel/arrow-parens": 0,
    "no-await-in-loop": 1,
    "comma-dangle": 0,
    "key-spacing": 0,
    "no-extra-boolean-cast": 0,
    "no-undef": 1,
    "no-unused-vars": [1, {
      "vars": "all",
      "args": "none"
    }],
    "no-console": 1,
    "no-case-declarations": 0,
    "space-before-function-paren": ["error", "never"]
  },
  "env": {
    "browser": true,
    "commonjs": true,
		"meteor": true,
		"mocha": true,
    "mongo": true,
    "node": true
  },
  "plugins": [
    "babel",
    "meteor"
  ]
};

