module.exports = {
	"plugins": ["meteor"],
  "extends": ["plugin:meteor/recommended", "standard"],
	"parserOptions": {
		"sourceType": "module",
		"ecmaVersion": 6
	},
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"node": true,
		"jquery": true,
		"mocha": true
	},
    "globals": {
		"_"                           : false,
		"__meteor_runtime_config__"   : false,
		"Accounts"                    : false,
		"Assets"                      : false,
		"Blaze"                       : false,
		"BlazeLayout"                 : false,
		"check"                       : false,
		"CryptoJS"                    : false,
		"DDPRateLimiter"              : false,
		"EJSON"                       : false,
		"Email"                       : false,
		"HTTP"                        : false,
		"Logger"                      : false,
		"Match"                       : false,
		"Meteor"                      : false,
		"moment"                      : false,
		"Mongo"                       : false,
		"Npm"                         : false,
		"Package"                     : false,
		"Promise"                     : false,
		"Random"                      : false,
		"ReactiveVar"                 : false,
		"s"                           : false,
		"ServiceConfiguration"        : false,
		"Session"                     : false,
		"Settings"                    : false,
		"TAPi18n"                     : false,
		"Template"                    : false,
		"Tracker"                     : false
	}
};
