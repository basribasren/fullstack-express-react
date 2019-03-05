const presets = [
	[
		"@babel/preset-env",
		{
			modules: false
		}
	],
	"@babel/preset-react"
];
const plugins = [
	"@babel/plugin-proposal-class-properties",
	"@babel/plugin-transform-runtime",
	"@babel/plugin-transform-arrow-functions",
	"@babel/plugin-syntax-dynamic-import",
	"emotion",
	[
		"module-resolver",
		{
			root: ["./src"]
		}
	],
	["import-rename", { "^(.*)\\.jsx$": "$1" }]
];

module.exports = { presets, plugins };
