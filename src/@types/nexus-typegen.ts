/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * Pagination take amount type
     */
    takeAmount<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "TakeAmount";
    bigInt<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "BigInt";
    json<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSON";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Pagination take amount type
     */
    takeAmount<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "TakeAmount";
    bigInt<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "BigInt";
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSON";
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
  BigInt: bigint
  JSON: object
  TakeAmount: number
}

export interface NexusGenObjects {
  Asset: { // root type
    blockId: string; // String!
    token: NexusGenRootTypes['Token']; // Token!
    tokenId: string; // String!
    value: NexusGenScalars['BigInt']; // BigInt!
  }
  Box: { // root type
    additionalRegisters: NexusGenScalars['JSON']; // JSON!
    address: string; // String!
    assets: Array<NexusGenRootTypes['Asset'] | null>; // [Asset]!
    blockId: string; // String!
    boxId: string; // String!
    creationHeight: number; // Int!
    ergoTree: string; // String!
    globalIndex: number; // Int!
    index: number; // Int!
    mainChain: boolean; // Boolean!
    settlementHeight: number; // Int!
    transactionId: string; // String!
    value: NexusGenScalars['BigInt']; // BigInt!
  }
  Query: {};
  Token: { // root type
    box: NexusGenRootTypes['Box']; // Box!
    boxId: string; // String!
    decimals?: number | null; // Int
    description?: string | null; // String
    emissionAmount: NexusGenScalars['BigInt']; // BigInt!
    name?: string | null; // String
    tokenId: string; // String!
    type?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Asset: { // field return type
    blockId: string; // String!
    token: NexusGenRootTypes['Token']; // Token!
    tokenId: string; // String!
    value: NexusGenScalars['BigInt']; // BigInt!
  }
  Box: { // field return type
    additionalRegisters: NexusGenScalars['JSON']; // JSON!
    address: string; // String!
    assets: Array<NexusGenRootTypes['Asset'] | null>; // [Asset]!
    blockId: string; // String!
    boxId: string; // String!
    creationHeight: number; // Int!
    ergoTree: string; // String!
    globalIndex: number; // Int!
    index: number; // Int!
    mainChain: boolean; // Boolean!
    settlementHeight: number; // Int!
    transactionId: string; // String!
    value: NexusGenScalars['BigInt']; // BigInt!
  }
  Query: { // field return type
    boxes: NexusGenRootTypes['Box'][]; // [Box!]!
    tokens: NexusGenRootTypes['Token'][]; // [Token!]!
  }
  Token: { // field return type
    box: NexusGenRootTypes['Box']; // Box!
    boxId: string; // String!
    decimals: number | null; // Int
    description: string | null; // String
    emissionAmount: NexusGenScalars['BigInt']; // BigInt!
    name: string | null; // String
    tokenId: string; // String!
    type: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Asset: { // field return type name
    blockId: 'String'
    token: 'Token'
    tokenId: 'String'
    value: 'BigInt'
  }
  Box: { // field return type name
    additionalRegisters: 'JSON'
    address: 'String'
    assets: 'Asset'
    blockId: 'String'
    boxId: 'String'
    creationHeight: 'Int'
    ergoTree: 'String'
    globalIndex: 'Int'
    index: 'Int'
    mainChain: 'Boolean'
    settlementHeight: 'Int'
    transactionId: 'String'
    value: 'BigInt'
  }
  Query: { // field return type name
    boxes: 'Box'
    tokens: 'Token'
  }
  Token: { // field return type name
    box: 'Box'
    boxId: 'String'
    decimals: 'Int'
    description: 'String'
    emissionAmount: 'BigInt'
    name: 'String'
    tokenId: 'String'
    type: 'String'
  }
}

export interface NexusGenArgTypes {
  Query: {
    boxes: { // args
      address?: string | null; // String
      boxId?: string | null; // String
      skip: number; // Int!
      take: NexusGenScalars['TakeAmount']; // TakeAmount!
    }
    tokens: { // args
      skip: number; // Int!
      take: NexusGenScalars['TakeAmount']; // TakeAmount!
      tokenId?: string | null; // String
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
  context: any;
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
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
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