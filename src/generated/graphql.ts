import { GraphQLResolveInfo } from 'graphql';
import { Link as LinkModel, User as UserModel, Vote as VoteModel } from '@prisma/client/index.d';
import { Context } from 'src/index';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Colour = Node & {
  __typename?: 'Colour';
  id: Scalars['ID'];
  localId: Scalars['Int'];
  name: Scalars['String'];
  year: Scalars['Int'];
  hexValue: Scalars['String'];
  pantoneValue: Scalars['String'];
};

export type Link = Node & {
  __typename?: 'Link';
  id: Scalars['ID'];
  internalId: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  postedBy?: Maybe<User>;
  votes?: Maybe<LinkVotes_Connection>;
};


export type LinkVotesArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type LinkEdge = {
  __typename?: 'LinkEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Link>;
};

export type LinkVotes_Connection = {
  __typename?: 'LinkVotes_Connection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<VoteEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  pageCursors?: Maybe<PageCursors>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLink: NewLink;
  updateLink: Link;
  deleteLink: Link;
  editUser: User;
  signup?: Maybe<AuthPayload>;
  login?: Maybe<AuthPayload>;
  addVote?: Maybe<Vote>;
};


export type MutationCreateLinkArgs = {
  url: Scalars['String'];
  description: Scalars['String'];
};


export type MutationUpdateLinkArgs = {
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};


export type MutationDeleteLinkArgs = {
  id: Scalars['ID'];
};


export type MutationEditUserArgs = {
  name?: Maybe<Scalars['String']>;
  faveColour?: Maybe<Scalars['Int']>;
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  faveColour?: Maybe<Scalars['Int']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationAddVoteArgs = {
  linkId: Scalars['Int'];
};

export type NewLink = {
  __typename?: 'NewLink';
  item: Link;
  feed: Array<Link>;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageCursor = {
  __typename?: 'PageCursor';
  cursor: Scalars['String'];
  page: Scalars['Int'];
  isCurrent: Scalars['Boolean'];
};

export type PageCursors = {
  __typename?: 'PageCursors';
  /** Optional, may be included in `around` (if current page is near the beginning). */
  first?: Maybe<PageCursor>;
  /** Optional, may be included in `around` (if current page is near the end). */
  last?: Maybe<PageCursor>;
  /** Always includes current page */
  around: Array<PageCursor>;
  previous?: Maybe<PageCursor>;
  totalRecords: Scalars['Int'];
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  links?: Maybe<QueryLinks_Connection>;
  feed: Array<Link>;
  link?: Maybe<Link>;
  user?: Maybe<User>;
  currentUser?: Maybe<AuthPayload>;
  colours: Array<Maybe<Colour>>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryLinksArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};


export type QueryLinkArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type QueryLinks_Connection = {
  __typename?: 'QueryLinks_Connection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<LinkEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  pageCursors?: Maybe<PageCursors>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newLink?: Maybe<Link>;
  newVote?: Maybe<Vote>;
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  faveColour: Colour;
  links: UserLinks_Connection;
};


export type UserLinksArgs = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
};

export type UserLinks_Connection = {
  __typename?: 'UserLinks_Connection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<LinkEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
  pageCursors?: Maybe<PageCursors>;
};

export type Vote = Node & {
  __typename?: 'Vote';
  id: Scalars['ID'];
  link?: Maybe<Link>;
  user?: Maybe<User>;
};

export type VoteEdge = {
  __typename?: 'VoteEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Vote>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Colour: ResolverTypeWrapper<Colour>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Link: ResolverTypeWrapper<LinkModel>;
  LinkEdge: ResolverTypeWrapper<Omit<LinkEdge, 'node'> & { node?: Maybe<ResolversTypes['Link']> }>;
  LinkVotes_Connection: ResolverTypeWrapper<Omit<LinkVotes_Connection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversTypes['VoteEdge']>>> }>;
  Mutation: ResolverTypeWrapper<{}>;
  NewLink: ResolverTypeWrapper<Omit<NewLink, 'item' | 'feed'> & { item: ResolversTypes['Link'], feed: Array<ResolversTypes['Link']> }>;
  Node: ResolversTypes['Colour'] | ResolversTypes['Link'] | ResolversTypes['User'] | ResolversTypes['Vote'];
  PageCursor: ResolverTypeWrapper<PageCursor>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  PageCursors: ResolverTypeWrapper<PageCursors>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  QueryLinks_Connection: ResolverTypeWrapper<Omit<QueryLinks_Connection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversTypes['LinkEdge']>>> }>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<UserModel>;
  UserLinks_Connection: ResolverTypeWrapper<Omit<UserLinks_Connection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversTypes['LinkEdge']>>> }>;
  Vote: ResolverTypeWrapper<VoteModel>;
  VoteEdge: ResolverTypeWrapper<Omit<VoteEdge, 'node'> & { node?: Maybe<ResolversTypes['Vote']> }>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: Omit<AuthPayload, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  String: Scalars['String'];
  Colour: Colour;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Link: LinkModel;
  LinkEdge: Omit<LinkEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Link']> };
  LinkVotes_Connection: Omit<LinkVotes_Connection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversParentTypes['VoteEdge']>>> };
  Mutation: {};
  NewLink: Omit<NewLink, 'item' | 'feed'> & { item: ResolversParentTypes['Link'], feed: Array<ResolversParentTypes['Link']> };
  Node: ResolversParentTypes['Colour'] | ResolversParentTypes['Link'] | ResolversParentTypes['User'] | ResolversParentTypes['Vote'];
  PageCursor: PageCursor;
  Boolean: Scalars['Boolean'];
  PageCursors: PageCursors;
  PageInfo: PageInfo;
  Query: {};
  QueryLinks_Connection: Omit<QueryLinks_Connection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversParentTypes['LinkEdge']>>> };
  Subscription: {};
  User: UserModel;
  UserLinks_Connection: Omit<UserLinks_Connection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversParentTypes['LinkEdge']>>> };
  Vote: VoteModel;
  VoteEdge: Omit<VoteEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Vote']> };
}>;

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ColourResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Colour'] = ResolversParentTypes['Colour']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  localId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hexValue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pantoneValue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LinkResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Link'] = ResolversParentTypes['Link']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  internalId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postedBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  votes?: Resolver<Maybe<ResolversTypes['LinkVotes_Connection']>, ParentType, ContextType, RequireFields<LinkVotesArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LinkEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LinkEdge'] = ResolversParentTypes['LinkEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LinkVotes_ConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LinkVotes_Connection'] = ResolversParentTypes['LinkVotes_Connection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['VoteEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  pageCursors?: Resolver<Maybe<ResolversTypes['PageCursors']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createLink?: Resolver<ResolversTypes['NewLink'], ParentType, ContextType, RequireFields<MutationCreateLinkArgs, 'url' | 'description'>>;
  updateLink?: Resolver<ResolversTypes['Link'], ParentType, ContextType, RequireFields<MutationUpdateLinkArgs, 'id'>>;
  deleteLink?: Resolver<ResolversTypes['Link'], ParentType, ContextType, RequireFields<MutationDeleteLinkArgs, 'id'>>;
  editUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationEditUserArgs, never>>;
  signup?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'password' | 'name'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  addVote?: Resolver<Maybe<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<MutationAddVoteArgs, 'linkId'>>;
}>;

export type NewLinkResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NewLink'] = ResolversParentTypes['NewLink']> = ResolversObject<{
  item?: Resolver<ResolversTypes['Link'], ParentType, ContextType>;
  feed?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Colour' | 'Link' | 'User' | 'Vote', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type PageCursorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageCursor'] = ResolversParentTypes['PageCursor']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isCurrent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageCursorsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageCursors'] = ResolversParentTypes['PageCursors']> = ResolversObject<{
  first?: Resolver<Maybe<ResolversTypes['PageCursor']>, ParentType, ContextType>;
  last?: Resolver<Maybe<ResolversTypes['PageCursor']>, ParentType, ContextType>;
  around?: Resolver<Array<ResolversTypes['PageCursor']>, ParentType, ContextType>;
  previous?: Resolver<Maybe<ResolversTypes['PageCursor']>, ParentType, ContextType>;
  totalRecords?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  links?: Resolver<Maybe<ResolversTypes['QueryLinks_Connection']>, ParentType, ContextType, RequireFields<QueryLinksArgs, never>>;
  feed?: Resolver<Array<ResolversTypes['Link']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType, RequireFields<QueryLinkArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  currentUser?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType>;
  colours?: Resolver<Array<Maybe<ResolversTypes['Colour']>>, ParentType, ContextType>;
}>;

export type QueryLinks_ConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['QueryLinks_Connection'] = ResolversParentTypes['QueryLinks_Connection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['LinkEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  pageCursors?: Resolver<Maybe<ResolversTypes['PageCursors']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  newLink?: SubscriptionResolver<Maybe<ResolversTypes['Link']>, "newLink", ParentType, ContextType>;
  newVote?: SubscriptionResolver<Maybe<ResolversTypes['Vote']>, "newVote", ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  faveColour?: Resolver<ResolversTypes['Colour'], ParentType, ContextType>;
  links?: Resolver<ResolversTypes['UserLinks_Connection'], ParentType, ContextType, RequireFields<UserLinksArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserLinks_ConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserLinks_Connection'] = ResolversParentTypes['UserLinks_Connection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['LinkEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  pageCursors?: Resolver<Maybe<ResolversTypes['PageCursors']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoteResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['Link']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoteEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VoteEdge'] = ResolversParentTypes['VoteEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Vote']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Colour?: ColourResolvers<ContextType>;
  Link?: LinkResolvers<ContextType>;
  LinkEdge?: LinkEdgeResolvers<ContextType>;
  LinkVotes_Connection?: LinkVotes_ConnectionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NewLink?: NewLinkResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageCursor?: PageCursorResolvers<ContextType>;
  PageCursors?: PageCursorsResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QueryLinks_Connection?: QueryLinks_ConnectionResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserLinks_Connection?: UserLinks_ConnectionResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  VoteEdge?: VoteEdgeResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
