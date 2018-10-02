
# Karbon14 Home API
[![travis](https://travis-ci.org/karbon14/crowdsale-home-api.svg?branch=master)](https://travis-ci.org/karbon14/crowdsale-home-api)
[![codecov](https://codecov.io/gh/karbon14/crowdsale-home-api/branch/master/graph/badge.svg)](https://codecov.io/gh/karbon14/crowdsale-home-api)
[![greenkeeper](https://badges.greenkeeper.io/karbon14/crowdsale-home-api.svg)](https://greenkeeper.io/)

This API exposes the following services:

- Download a file.
- Subscribe users in a list of mailchimp.
- Users can send a message of support.

# Index

1. [Requirements](#requirements)  
2. [Installation](#installation)
3. [Routes](#routes)
4. [Running the tests](#running-the-tests)
5. [Built With](#built-with)
6. [Team](#team)
7. [License](#license)

## Requirements
You have to install:

- **Docker**
- **Docker-compose**
- **Node ^9.11.1**

## Installation
The Karbon14 API is a basic API that you can use. Yes! It sounds good, does not it?
How is this? The Karbon14 API use environment variables. With a minimal setup configuration you will be able to easily setup this API to fit your needs too.

**First step**

You need to clone the repository

```js
git clone git@github.com:karbon14/home-api.git
```

**Second step**

Now, you need to install packages. Run in the console:

```cmd
npm run install
```


**Third step**

The project needs you to declare your environment variables in the **.env** file. We leave an example with which you can guide yourself in root **.env.example**
If you don't declare the environment variables and you run the api, you will notice a warning message in the terminal with the missing variables create.

```
Create file .env in root, and use the file .env.example as example
```

**Fourth step**

You are ready to run the project. You can run:

```cmd
npm run start
```

or

```cmd
npm run start:dev
```

## Routes

```js
POST /contact
```
```js
POST /subscribe
```
```js
GET /whitepaper
```
## Running the tests

To run the unit test you can do

```
npm run test:unit
```

To run the e2e test you can do. **Notice:** remember start api before the e2e test

```
npm run test:e2e
```

To run both, unit and e2e tests, you can do

```
npm run test
```

## Built With
- Koa
- Babel
- Eslint
- Jest (For testing)
- Joi
- Nodemailer
- Mailchimp


[![Natanael Zalazar](https://avatars.githubusercontent.com/u/11928153?s=64)](https://github.com/zalazarnatanael)  |
[![Vision K14](https://avatars3.githubusercontent.com/u/41881618?s=64)](https://github.com/visionk14) |
[![Wolverine K14](https://avatars3.githubusercontent.com/u/41843272?s=64)](https://github.com/wolverinek14) |
|---|---|---|
Natanael Zalazar | Vision K14 | Wolverine K14 |
:octocat:[@zalazarnatanael](https://github.com/zalazarnatanael) | :octocat:[@visionk14](https://github.com/visionk14) | :octocat:[@wolverinek14](https://github.com/wolverinek14) |


## License
[MIT](https://github.com/karbon14/home-api/blob/master/LICENSE)
