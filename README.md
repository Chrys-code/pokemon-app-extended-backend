# Requirements

- Node.js
- Node Package Manager

## Tools used:

- Node.js
- Express.js
- Mongoose (ORM librarly)
- MongoDB (Database)
- Typescript
- SwaggerUI

## Start

- set .env based on env.example
- npm i
- npm run dev

It will run on port 3001 or the preferred one specified in .env

## Routes

Auth:
- Login
- Register

Pokemons: (protected)
- Catch
- Release
- List

## Tests

Had no time for test coverage. The test found in __tests__ is just an example written by me.

## Differenced from task description:

Express.js is used instead of Nest.js

Express.js is a lightweight libary for Node.js. Since the application does not process data but assigned only with I/O tasks Express.js is perfectly enough for the usecase.

I would also consider using Python-FastAPI. Perfect for I/O communication and dependecy injection makes the development seriously fast. There is one important note to that. It is easy to protect routes by dependecy injection but Auth0 - for example - has no documentation on permission handling with FastAPI yet. 

## Notes

Please note that the application is not finished and requires more work.

This applicataion was not developed under 8 but 14 hours so far instead.