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

- /auth
- /users
- /accounts
- /accounts/:accountId/members
- /operations

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

### Model schemas

done

### Roles permissions

User permissions will be validated per role on a middleware apart before an action occurs (user creation, account creation, etc)

### Unit tests

- Add full UT for 1 controller (auth)

### Endpoints development

- Auth controller
  - login
  - reset password?
- Users controller
  - create
  - Read
  - Update
  - Delete
- Accounts controller
  - create
  - Read
  - Update
  - Delete
- Account members controller
  - Create (add a member in an account)
  - Update?
  - Delete?
- Operations history controller
  - Create
  - Read

### System logger

- Research about logger options
- Implement system logger

### Swagger documentation

- Research swagger library
- Implement swagger on 1 endpoint
