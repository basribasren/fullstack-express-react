# boilerplate-react-redux

[![Build Status](https://travis-ci.org/basribasren/boilerplate-react-redux.svg?branch=master)](https://travis-ci.org/basribasren/boilerplate-react-redux) [![Build status](https://ci.appveyor.com/api/projects/status/weuboxr8dwbpp0q2/branch/master?svg=true)](https://ci.appveyor.com/project/basribasren/boilerplate-react-redux/branch/master) [![dependencies Status](https://david-dm.org/basribasren/boilerplate-react-redux/status.svg)](https://david-dm.org/basribasren/boilerplate-react-redux) ![GitHub All Releases](https://img.shields.io/github/downloads/basribasren/boilerplate-react-redux/total.svg) [![GitHub license](https://img.shields.io/github/license/basribasren/boilerplate-react-redux.svg)](https://github.com/basribasren/boilerplate-react-redux/blob/master/LICENSE) [![GitHub last commit](https://img.shields.io/github/last-commit/basribasren/boilerplate-react-redux.svg)](https://github.com/basribasren/boilerplate-react-redux/commits/master)

boilerplate for create web or progressive web app using react and redux.
Tools : React, Redux, Webpack, Eslint, Babel, Workbox, Material-UI, material-dashboard theme.

## Ecosystem

<!-- prettier-ignore -->
| Project | Status | Description |
|---------|--------|-------------|
| [react]          | [![react-status]][react-package] | A declarative, efficient, and flexible JavaScript library for building user interfaces. |
| [redux]          | [![redux-status]][redux-package] | Predictable state container for JavaScript apps. |
| [materialui]          | [![materialui-status]][materialui-package] | React components that implement Google's Material Design. |
| [babel]          | [![babel-status]][babel-package] | Babel is a compiler for writing next generation JavaScript. |
| [webpack]          | [![webpack-status]][webpack-package] | A bundler for javascript and friends. |
| [workbox]          | [![workbox-status]][workbox-package] | JavaScript libraries for Progressive Web Apps. |
| [prettier]          | [![prettier-status]][prettier-package] | Prettier is an opinionated code formatter. |
| [eslint]          | [![eslint-status]][eslint-package] | A fully pluggable tool for identifying and reporting on patterns in JavaScript. |

[react]: https://github.com/facebook/react
[react-status]: https://img.shields.io/npm/v/react.svg
[react-package]: https://npmjs.com/package/react
[redux]: https://github.com/reduxjs/redux
[redux-status]: https://img.shields.io/npm/v/redux.svg
[redux-package]: https://npmjs.com/package/redux
[materialui]: https://github.com/mui-org/material-ui
[materialui-status]: https://img.shields.io/npm/v/material-ui.svg
[materialui-package]: https://npmjs.com/package/material-ui
[babel]: https://github.com/babel/babel
[babel-status]: https://img.shields.io/npm/v/babel.svg
[babel-package]: https://npmjs.com/package/babel
[webpack]: https://github.com/webpack/webpack
[webpack-status]: https://img.shields.io/npm/v/webpack.svg
[webpack-package]: https://npmjs.com/package/webpack
[workbox]: https://github.com/googlechrome/workbox
[workbox-status]: https://img.shields.io/npm/v/workbox.svg
[workbox-package]: https://npmjs.com/package/workbox
[prettier]: https://github.com/prettier/prettier
[prettier-status]: https://img.shields.io/npm/v/prettier.svg
[prettier-package]: https://npmjs.com/package/prettier
[eslint]: https://github.com/eslint/eslint
[eslint-status]: https://img.shields.io/npm/v/eslint.svg
[eslint-package]: https://npmjs.com/package/eslint

## Folder Structure

After creation, your project should look like this:

```
my-app/
├── node_modules/
├── public/
│   └── index.html
│   └── favicon.ico
├── src/
│   └── assets/
│   └── components/
│   └── redux/
│   └── routes/
│   └── variable/
│   └── views/
│   └── app.js
│   └── index.js
│   └── sw.js
├── .babelrc.js
├── .editorconfig
├── .env
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .travis.yml
├── .appveyor.yml
├── LICENSE
├── README.md
├── server.js
├── webpack.config.analyze.js
├── webpack.config.js
├── webpack.config.prod.js
├── package.json

```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the result of build command with simple express server.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `yarn build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn serve`

Runs the app in development mode using `webpack-dev-server`<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `yarn analyze`

Runs the app in production mode and get detail bundles `webpack-bundle-analyzer`<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Maintainers

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<img src="https://avatars0.githubusercontent.com/u/25193994?v=4" width="100px;"/><br /><sub><b>Basri Basren</b></sub>

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Something Missing?

If you have ideas for more “How To” recipes that should be on this page, [let us know](https://github.com/basribasren/boilerplate-react-redux/issues)
