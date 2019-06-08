# fullstack-express-react

[![Build Status](https://travis-ci.org/basribasren/boilerplate-react-redux.svg?branch=master)](https://travis-ci.org/basribasren/boilerplate-react-redux) [![Build status](https://ci.appveyor.com/api/projects/status/weuboxr8dwbpp0q2?svg=true)](https://ci.appveyor.com/project/basribasren/boilerplate-react-redux) [![dependencies Status](https://david-dm.org/basribasren/boilerplate-react-redux/status.svg)](https://david-dm.org/basribasren/boilerplate-react-redux) ![GitHub All Releases](https://img.shields.io/github/downloads/basribasren/boilerplate-react-redux/total.svg) [![GitHub license](https://img.shields.io/github/license/basribasren/boilerplate-react-redux.svg)](https://github.com/basribasren/boilerplate-react-redux/blob/master/LICENSE) [![GitHub last commit](https://img.shields.io/github/last-commit/basribasren/boilerplate-react-redux.svg)](https://github.com/basribasren/boilerplate-react-redux/commits/master)

Boilerplate for Full stack web development with Swagger-ui for API Documentation, ExpressJs for Server and ReactJs for Client
Tools : Swagger-ui, Swagger-jsdocs, Babel, Eslint, Prettier, Express, Mongoose, React, Redux, Webpack, Workbox, Material-UI.

## Ecosystem Global

<!-- prettier-ignore -->
| Project | Status | Description |
|---------|--------|-------------|
| [babel]          | [![babel-status]][babel-package] | Babel is a compiler for writing next generation JavaScript. |
| [prettier]          | [![prettier-status]][prettier-package] | Prettier is an opinionated code formatter. |
| [eslint]          | [![eslint-status]][eslint-package] | A fully pluggable tool for identifying and reporting on patterns in JavaScript. |

[babel]: https://github.com/babel/babel
[babel-status]: https://img.shields.io/npm/v/babel.svg
[babel-package]: https://npmjs.com/package/babel
[prettier]: https://github.com/prettier/prettier
[prettier-status]: https://img.shields.io/npm/v/prettier.svg
[prettier-package]: https://npmjs.com/package/prettier
[eslint]: https://github.com/eslint/eslint
[eslint-status]: https://img.shields.io/npm/v/eslint.svg
[eslint-package]: https://npmjs.com/package/eslint

## Ecosystem Server

<!-- prettier-ignore -->
| Project | Status | Description |
|---------|--------|-------------|
| [express]          | [![express-status]][express-package] | Fast, unopinionated, minimalist web framework for node. |
| [mongoose]          | [![mongoose-status]][mongoose-package] | Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. |
| [redis]          | [![redis-status]][redis-package] | This is a complete and feature rich Redis client for node.js. It supports all Redis commands and focuses on high performance. |
| [swagger-ui]          | [![swagger-ui-status]][swagger-ui-package] | A fully pluggable tool for identifying and reporting on patterns in JavaScript. |
| [jsonwebtoken]          | [![jsonwebtoken-status]][jsonwebtoken-package] | An implementation of JSON Web Tokens. |
| [nodemailer]          | [![nodemailer-status]][nodemailer-package] | Send e-mails from Node.js – easy as cake! 🍰✉️. |

[express]: https://github.com/expressjs/express
[express-status]: https://img.shields.io/npm/v/express.svg
[express-package]: https://npmjs.com/package/express
[mongoose]: https://github.com/Automattic/mongoose
[mongoose-status]: https://img.shields.io/npm/v/mongoose.svg
[mongoose-package]: https://npmjs.com/package/mongoose
[redis]: https://github.com/NodeRedis/node_redis
[redis-status]: https://img.shields.io/npm/v/redis.svg
[redis-package]: https://npmjs.com/package/redis
[swagger-ui]: https://github.com/swagger-api/swagger-ui
[swagger-ui-status]: https://img.shields.io/npm/v/swagger-ui.svg
[swagger-ui-package]: https://npmjs.com/package/swagger-ui
[jsonwebtoken]: https://github.com/auth0/node-jsonwebtoken
[jsonwebtoken-status]: https://img.shields.io/npm/v/jsonwebtoken.svg
[jsonwebtoken-package]: https://npmjs.com/package/jsonwebtoken
[nodemailer]: https://github.com/nodemailer/nodemailer
[nodemailer-status]: https://img.shields.io/npm/v/nodemailer.svg
[nodemailer-package]: https://npmjs.com/package/nodemailer

## Ecosystem Client

<!-- prettier-ignore -->
| Project | Status | Description |
|---------|--------|-------------|
| [react]          | [![react-status]][react-package] | A declarative, efficient, and flexible JavaScript library for building user interfaces. |
| [redux]          | [![redux-status]][redux-package] | Predictable state container for JavaScript apps. |
| [materialui]          | [![materialui-status]][materialui-package] | React components that implement Google's Material Design. |
| [webpack]          | [![webpack-status]][webpack-package] | A bundler for javascript and friends. |
| [workbox]          | [![workbox-status]][workbox-package] | JavaScript libraries for Progressive Web Apps. |

[react]: https://github.com/facebook/react
[react-status]: https://img.shields.io/npm/v/react.svg
[react-package]: https://npmjs.com/package/react
[redux]: https://github.com/reduxjs/redux
[redux-status]: https://img.shields.io/npm/v/redux.svg
[redux-package]: https://npmjs.com/package/redux
[materialui]: https://github.com/mui-org/material-ui
[materialui-status]: https://img.shields.io/npm/v/material-ui.svg
[materialui-package]: https://npmjs.com/package/material-ui
[webpack]: https://github.com/webpack/webpack
[webpack-status]: https://img.shields.io/npm/v/webpack.svg
[webpack-package]: https://npmjs.com/package/webpack
[workbox]: https://github.com/googlechrome/workbox
[workbox-status]: https://img.shields.io/npm/v/workbox.svg
[workbox-package]: https://npmjs.com/package/workbox

## Folder Structure

After creation, your project should look like this:

```
fullstack-express-react/
├── node_modules/
├── bin/
├── client/
│   └── dist/		will contain client in production mode
│   └── public/		
│   └── setting/	will contain configuration for webpack, dll
│   └── src/		will contain client in development mode
│   └── .babelrc.js
│   └── .package.json
│   └── .README.md
├── server/
│   └── config/		will contain configuration for server
│   └── database/ 	will contain migration and seed
│   └── docs/	 	will contain swagge-ui and api docs
│   └── dist/		will contain server in production mode
│   └── helpers/	
│   └── log/		will contain log
│   └── modules/	will contain model, service, controller, route with hierarchy Structure
├── .babelrc
├── .editorconfig
├── .env
├── .env.example
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .travis.yml
├── .appveyor.yml
├── server-dev.js
├── server-prod.js
├── LICENSE
├── README.md
├── package.json

```

## Available Scripts

In the project directory, you can run:

    "client-build": "cd client && npm run build",
    "client-dev": "npm run serve --prefix client",

    "server-build": "babel serber-dev.js --out-file server-prod.js",
    "server-dev": "nodemon .",

    "development": "concurrently \"npm run server-dev\" \"npm run client-dev\"",

    "start": "node server-prod.js",

    "test": "echo \"Error: no test specified\" && exit 1",

    "heroku-prebuild": "npm install npm@latest -g && cd client && npm install --production=false",
    "heroku-postbuild": "concurrently \"npm run server-build\" \"npm run client-build\""

## Maintainers

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<img src="https://avatars0.githubusercontent.com/u/25193994?v=4" width="100px;"/><br /><sub><b>Basri Basren</b></sub>

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Something Missing?

If you have ideas for more “How To” recipes that should be on this page, [let us know](https://github.com/basribasren/boilerplate-react-redux/issues)
