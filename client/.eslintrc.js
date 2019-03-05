module.exports = {
	parser: "babel-eslint",
	extends: [
		"airbnb-base",
		"eslint:recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended",
		"plugin:import/recommended"
	],
	plugins: ["prettier", "react", "import", "jsx-a11y"],
	env: {
		es6: true,
		browser: true,
		node: true
	},
	parserOptions: {
		ecmaVersion: 7,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		react: {
			createClass: "createReactClass", // Regex for Component Factory to use,
			// default to "createReactClass"
			pragma: "React", // Pragma to use, default to "React"
			version: "16.0", // React version, default to the latest React stable release
			flowVersion: "0.53" // Flow version
		},
		propWrapperFunctions: ["forbidExtraProps"] // The names of any functions used to wrap the
		// propTypes object, e.g. `forbidExtraProps`.
		// If this isn't set, any propTypes wrapped in
		// a function will be skipped.
	},
	rules: {
		"object-shorthand": 0,
		"arrow-body-style": 0,
		"linebreak-style": 0,
		"func-names": 0,
		"no-console": 0,
		"no-use-before-define": 0,
		"no-param-reassign": 0,
		"no-var": 0,
		"no-unused-expressions": 0,
		"no-unused-vars": 0,
		"no-undef": 0,
		"prefer-destructuring": 0,
		"prefer-arrow-callback": 0,
		"class-methods-use-this": 0,
		"react/prop-types": [0, { ignore: ["children"] }],
		"prettier/prettier": "off",
		"import/prefer-default-export": 0,
		"import/newline-after-import": 0,
		"import/extensions": 0,
		"import/no-unresolved": 0,
		"react/no-string-refs": 0
	}
};
