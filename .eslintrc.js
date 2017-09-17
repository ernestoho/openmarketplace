module.exports = {
	"plugins": ["meteor"],
  "extends": ["plugin:meteor/recommended", "standard"],
	"parserOptions": {
		"sourceType": "module",
		"ecmaVersion": 8
	},
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true,
		"mocha": true,
		"meteor": true,
		"mongo": true
	}
}
