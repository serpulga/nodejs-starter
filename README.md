# [Nodejs Starter](https://appseed.us/boilerplate-code/nodejs-starter)

Express / [Nodejs Starter](https://appseed.us/boilerplate-code/nodejs-starter) with [JWT authentication](https://jwt.io/introduction/), [SQLite](https://www.sqlite.org/index.html) database, [Sequelize](http://docs.sequelizejs.com/) ORM, unit tests and basic tooling - Provided by **AppSeed** [Web App Generator](https://appseed.us/app-generator).

<br />

![Open-Source Nodejs Starter - Product cover image.](https://github.com/app-generator/static/blob/master/products/boilerplate-code-nodejs-starter-cover.jpg?raw=true)

<br />

## Requirements

- [Node.js](https://nodejs.org) >= 14.x
- [git](https://git-scm.com) >= 2.x

All of these must be available in your PATH. To verify things are set up properly, you can run this:

```sh
git --version
node --version
npm --version
```

<br />

## Authentication

Authentication is based on [json web tokens](https://jwt.io). `passport-jwt` strategy is used to handle the email / password authentication.
After a successful login the generated token is sent to the requester.

<br />

## API

TODO: add API examples

<br />

## Setting up for development

First clone this repository:

```sh
git clone https://github.com/app-generator/nodejs-starter.git
cd nodejs-starter
```

Install project dependencies:

```sh
npm install
npm install nodemon --global
```

<br />

**Run**

```sh
$ npm start # classic start OR
$ npm run dev # with nodemon live update
```

Runs the application with [nodemon]("https://nodemon.io/"). Server is listening on port 3000 by default. This can be overwritten by `HTTP_PORT` constant in `.env` file.

<br />

## Support

For issues and features request, use **Github** or access the [support page](https://appseed.us/support) provided by **AppSeed**

<br />

## License

ISC @ [AppSeed](https://appseed.us)

<br />

---

[Nodejs Starter](https://appseed.us/boilerplate-code/nodejs-starter) provided by **AppSeed**
