/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as prisma from "./schema/source-types"
import { Context } from "./schema/context"
import { core, connectionPluginCore } from "nexus"

declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}


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
  Colour: prisma.Colour;
  Link: prisma.Link;
  LinkEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Link'] | null; // Link
  }
  LinkVotes_Connection: { // root type
    edges?: Array<NexusGenRootTypes['VoteEdge'] | null> | null; // [VoteEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  Mutation: {};
  PageCursor: { // root type
    cursor: string; // String!
    isCurrent: boolean; // Boolean!
    page: number; // Int!
  }
  PageCursors: { // root type
    around: NexusGenRootTypes['PageCursor'][]; // [PageCursor!]!
    first?: NexusGenRootTypes['PageCursor'] | null; // PageCursor
    last?: NexusGenRootTypes['PageCursor'] | null; // PageCursor
    previous?: NexusGenRootTypes['PageCursor'] | null; // PageCursor
    totalRecords: number; // Int!
  }
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  Query: {};
  Subscription: {};
  User: prisma.User;
  UserLinks_Connection: { // root type
    edges?: Array<NexusGenRootTypes['LinkEdge'] | null> | null; // [LinkEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  Vote: prisma.Vote;
  VoteEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Vote'] | null; // Vote
  }
}

export interface NexusGenInterfaces {
  Node: core.Discriminate<'Colour', 'required'> | core.Discriminate<'Link', 'required'> | core.Discriminate<'User', 'required'> | core.Discriminate<'Vote', 'required'>;
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
  Colour: { // field return type
    hexValue: string; // String!
    id: string; // ID!
    localId: number; // Int!
    name: string; // String!
    pantoneValue: string; // String!
    year: number; // Int!
  }
  Link: { // field return type
    description: string | null; // String
    id: string; // ID!
    internalId: number; // Int!
    postedBy: NexusGenRootTypes['User'] | null; // User
    url: string | null; // String
    votes: NexusGenRootTypes['LinkVotes_Connection'] | null; // LinkVotes_Connection
  }
  LinkEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Link'] | null; // Link
  }
  LinkVotes_Connection: { // field return type
    edges: Array<NexusGenRootTypes['VoteEdge'] | null> | null; // [VoteEdge]
    pageCursors: NexusGenRootTypes['PageCursors'] | null; // PageCursors
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  Mutation: { // field return type
    addVote: NexusGenRootTypes['Vote'] | null; // Vote
    createLink: NexusGenRootTypes['Link']; // Link!
    deleteLink: NexusGenRootTypes['Link']; // Link!
    signup: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    updateLink: NexusGenRootTypes['Link']; // Link!
  }
  PageCursor: { // field return type
    cursor: string; // String!
    isCurrent: boolean; // Boolean!
    page: number; // Int!
  }
  PageCursors: { // field return type
    around: NexusGenRootTypes['PageCursor'][]; // [PageCursor!]!
    first: NexusGenRootTypes['PageCursor'] | null; // PageCursor
    last: NexusGenRootTypes['PageCursor'] | null; // PageCursor
    previous: NexusGenRootTypes['PageCursor'] | null; // PageCursor
    totalRecords: number; // Int!
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Query: { // field return type
    colours: Array<NexusGenRootTypes['Colour'] | null>; // [Colour]!
    feed: Array<NexusGenRootTypes['Link'] | null>; // [Link]!
    link: NexusGenRootTypes['Link'] | null; // Link
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    node: NexusGenRootTypes['Node'] | null; // Node
  }
  Subscription: { // field return type
    newLink: NexusGenRootTypes['Link'] | null; // Link
    newVote: NexusGenRootTypes['Vote'] | null; // Vote
  }
  User: { // field return type
    email: string; // String!
    faveColour: NexusGenRootTypes['Colour']; // Colour!
    id: string; // ID!
    links: NexusGenRootTypes['UserLinks_Connection']; // UserLinks_Connection!
    name: string; // String!
  }
  UserLinks_Connection: { // field return type
    edges: Array<NexusGenRootTypes['LinkEdge'] | null> | null; // [LinkEdge]
    pageCursors: NexusGenRootTypes['PageCursors'] | null; // PageCursors
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  Vote: { // field return type
    id: string; // ID!
    link: NexusGenRootTypes['Link'] | null; // Link
    user: NexusGenRootTypes['User'] | null; // User
  }
  VoteEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Vote'] | null; // Vote
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
  Colour: { // field return type name
    hexValue: 'String'
    id: 'ID'
    localId: 'Int'
    name: 'String'
    pantoneValue: 'String'
    year: 'Int'
  }
  Link: { // field return type name
    description: 'String'
    id: 'ID'
    internalId: 'Int'
    postedBy: 'User'
    url: 'String'
    votes: 'LinkVotes_Connection'
  }
  LinkEdge: { // field return type name
    cursor: 'String'
    node: 'Link'
  }
  LinkVotes_Connection: { // field return type name
    edges: 'VoteEdge'
    pageCursors: 'PageCursors'
    pageInfo: 'PageInfo'
  }
  Mutation: { // field return type name
    addVote: 'Vote'
    createLink: 'Link'
    deleteLink: 'Link'
    signup: 'AuthPayload'
    updateLink: 'Link'
  }
  PageCursor: { // field return type name
    cursor: 'String'
    isCurrent: 'Boolean'
    page: 'Int'
  }
  PageCursors: { // field return type name
    around: 'PageCursor'
    first: 'PageCursor'
    last: 'PageCursor'
    previous: 'PageCursor'
    totalRecords: 'Int'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Query: { // field return type name
    colours: 'Colour'
    feed: 'Link'
    link: 'Link'
    login: 'AuthPayload'
    node: 'Node'
  }
  Subscription: { // field return type name
    newLink: 'Link'
    newVote: 'Vote'
  }
  User: { // field return type name
    email: 'String'
    faveColour: 'Colour'
    id: 'ID'
    links: 'UserLinks_Connection'
    name: 'String'
  }
  UserLinks_Connection: { // field return type name
    edges: 'LinkEdge'
    pageCursors: 'PageCursors'
    pageInfo: 'PageInfo'
  }
  Vote: { // field return type name
    id: 'ID'
    link: 'Link'
    user: 'User'
  }
  VoteEdge: { // field return type name
    cursor: 'String'
    node: 'Vote'
  }
  Node: { // field return type name
    id: 'ID'
  }
}

export interface NexusGenArgTypes {
  Link: {
    votes: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
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
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    node: { // args
      id: string; // ID!
    }
  }
  User: {
    links: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  Node: "Colour" | "Link" | "User" | "Vote"
}

export interface NexusGenTypeInterfaces {
  Colour: "Node"
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