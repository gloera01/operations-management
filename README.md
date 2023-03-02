# Operations API

## About

This is a web api for users management

## Getting started

- Clone the repo at: https://github.com/gloera01/operations-management
- Configure environment
  - Create a `.env` file following the example file `.env.example`
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

### Documentation

Api endpoints are documented on swagger openapi specification

### Middlewares

#### WithHttpResponse

Description
Where to use

#### RequireAuth

#### RequirePermissions

### Security

Every endpoint is protected with JWT authentication

## Database

The app database was designed with mongodb architecture using mongoose as the main ORM.

TODO: add a link to a document containing the collections.

## Testing

Run `npm run test`

- Controllers
- Services

### Coverage

Run `npm run test:coverage` for coverage details

Open file `coverage/icov-report/index.html` to view coverage report

### Notes

When mocking mongoose models, the implementation should be provided. Example:
`jest.mock('../../src/models/User', () => ({ paginate: jest.fn() }));`

## Todos / pendings

### Model schemas

done

### Roles permissions

User permissions will be validated per role on a middleware apart before an action occurs (user creation, account creation, etc)

### Unit tests

- Add full UT for 1 controller (auth)

### Endpoints development

- Auth controller ✅
  - login
  - reset password?
- Users controller ✅
  - create ✅
  - Read ✅
    - add filters for: create and modified dates (pending)
  - Update ✅
  - Delete (jueves)
- Accounts controller
  - create ✅
  - Read ✅
  - Update
    - name
      - validate name does not conflict with an existing one
    - client
    - not allowed to update members
  - Delete
    - soft delete
- Account members controller
  - Create ✅
  - Update?
    - assignation dates
  - Delete ✅
    - Add unit test
- Operations history controller
  - Read ✅
    - support dates
    - unit test

### System logger

- Research about logger options
- Implement system logger

### Swagger documentation

- Research swagger library
- Implement swagger on 1 endpoint

## Notes

`npm express-async-errors` library helps with erroring when we use async functions with express
