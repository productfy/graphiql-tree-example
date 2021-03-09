## @productfy/graphiql-tree-example

Example of installing the [@productfy/grapiql-tree](https://github.com/productfy/graphiql-tree) plugin for the GraphiQL IDE that allows
you to explore a GraphQL schema in a manner similar to a file explorer interface.

You can test drive this app with the GitHub API GraphQL schema at https://static.productfy.io/graphql/

## Setup

This example app pulls and makes calls against the GitHub API. For this, you will need a GitHub
[personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token),
which you can enter in the input text field at the top of the app. Otherwise feel free to modify
the App.tsx file to point your API calls to a different API endpoint.

First, install the dependencies

```
npm install
# or
yarn install
```

Then start the server

```
npm run start
# or
yarn start
```

Your browser will automatically open to http://localhost:3000 with the example app.

## Usage

When importing into your own project, remember to add these required dependencies:
* codemirror
* graphiql
* graphql
* lodash
* react
* react-dom
