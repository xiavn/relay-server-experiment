/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as prisma from "./schema/source-types"
import { Context } from "./schema/context"
import { core } from "nexus"




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
  Link: prisma.Link;
  Mutation: {};
  Query: {};
  Subscription: {};
  User: prisma.User;
  Vote: prisma.Vote;
}

export interface NexusGenInterfaces {
  Node: core.Discriminate<'Link', 'required'> | core.Discriminate<'User', 'required'> | core.Discriminate<'Vote', 'required'>;
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Link: { // field return type
    description: string | null; // String
    id: string; // ID!
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
    node: NexusGenRootTypes['Node'] | null; // Node
  }
  Subscription: { // field return type
    newLink: NexusGenRootTypes['Link'] | null; // Link
    newVote: NexusGenRootTypes['Vote'] | null; // Vote
  }
  User: { // field return type
    email: string; // String!
    id: string; // ID!
    links: NexusGenRootTypes['Link'][]; // [Link!]!
    name: string; // String!
  }
  Vote: { // field return type
    id: string; // ID!
    link: NexusGenRootTypes['Link'] | null; // Link
    user: NexusGenRootTypes['User'] | null; // User
  }
  Node: { // field return type
    id: string; // ID!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Link: { // field return type name
    description: 'String'
    id: 'ID'
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
    node: 'Node'
  }
  Subscription: { // field return type name
    newLink: 'Link'
    newVote: 'Vote'
  }
  User: { // field return type name
    email: 'String'
    id: 'ID'
    links: 'Link'
    name: 'String'
  }
  Vote: { // field return type name
    id: 'ID'
    link: 'Link'
    user: 'User'
  }
  Node: { // field return type name
    id: 'ID'
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
      id: string; // ID!
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
      id: string; // ID!
      url?: string | null; // String
    }
  }
  Query: {
    link: { // args
      id: number; // Int!
    }
    node: { // args
      id: string; // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  Node: "Link" | "User" | "Vote"
}

export interface NexusGenTypeInterfaces {
  Link: "Node"
  User: "Node"
  Vote: "Node"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    __typename: true
    isTypeOf: false
    resolveType: false
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