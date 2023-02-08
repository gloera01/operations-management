# Operations API

## About

This is a web api for users management

## Getting started

- Clone the repo at: https://github.com/gloera01/operations-management
- Configure environment
  - Create a `.env` file
  - must have mongoDB installed
- Install dependencies

  - in the root folder run the following command `npm install`

- Recommended settings for vs code
  - editor.defaultFormatter: "esbenp.prettier-vscode"
  - editor.formatOnSave: true
  - editor.formatOnPaste: false
  - files.eol: "\n"

## HTTP API

### Routes / Endpoints

- /users
- /accounts

## Swagger documentation

TBD

## Database mongo

TODO: add a link to a document containing the collections.

## Testing

Run `npm run test`

- Controllers

### Coverage

Run `npm run test:coverage` for coverage details

TODO: add details how to view coverage report

## Notes

`npm express-async-errors` library helps with erroring when we use async functions with express

## Todos / pendings

- Configure authentication
  - Review login endpoint
  - Review auth middleware
- Define model schemas
  - define operation schema
  - define roles and permissions process
- Add full unit tests for 1 controller (miercoles)
- Create signup endpoint (miercoles)
  - consider user role and permissions
- Create signup unit tests (miercoles)
- Implement system logger (jueves)
- Implement swagger on 1 endpoint (jueves)
