/// <reference types="react-scripts" />

declare module '*.graphql' {
  const Schema: any;
  export = Schema;
}
