/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { Context } from "./schema/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Link: { // root type
    description?: string | null; // String
    id: number; // Int!
    url?: string | null; // String
  }
  Mutation: {};
  Query: {};
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  Vote: { // root type
    id: number; // Int!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Link: { // field return type
    description: string | null; // String
    id: number; // Int!
    postedBy: NexusGenRootTypes['User'] | null; // User
    url: string | null; // String
    votes: NexusGenRootTypes['Vote'][]; // [Vote!]!
  }
  Mutation: { // field return type
    addVote: NexusGenRootTypes['Vote'] | null; // Vote
    createLink: NexusGenRootTypes['Link']; // Link!
    deleteLink: NexusGenRootTypes['Link']; // Link!
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    signup: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    updateLink: NexusGenRootTypes['Link']; // Link!
  }
  Query: { // field return type
    feed: Array<NexusGenRootTypes['Link'] | null>; // [Link]!
    link: NexusGenRootTypes['Link'] | null; // Link
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    links: NexusGenRootTypes['Link'][]; // [Link!]!
    name: string; // String!
  }
  Vote: { // field return type
    id: number; // Int!
    link: NexusGenRootTypes['Link'] | null; // Link
    user: NexusGenRootTypes['User'] | null; // User
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Link: { // field return type name
    description: 'String'
    id: 'Int'
    postedBy: 'User'
    url: 'String'
    votes: 'Vote'
  }
  Mutation: { // field return type name
    addVote: 'Vote'
    createLink: 'Link'
    deleteLink: 'Link'
    login: 'AuthPayload'
    signup: 'AuthPayload'
    updateLink: 'Link'
  }
  Query: { // field return type name
    feed: 'Link'
    link: 'Link'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    links: 'Link'
    name: 'String'
  }
  Vote: { // field return type name
    id: 'Int'
    link: 'Link'
    user: 'User'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addVote: { // args
      linkId: number; // Int!
    }
    createLink: { // args
      description: string; // String!
      url: string; // String!
    }
    deleteLink: { // args
      id: number; // Int!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    signup: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
    updateLink: { // args
      description?: string | null; // String
      id: number; // Int!
      url?: string | null; // String
    }
  }
  Query: {
    link: { // args
      id: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}