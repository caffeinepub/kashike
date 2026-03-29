/* eslint-disable */

// @ts-nocheck

import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';

export interface ContactMessage {
  'id' : bigint,
  'name' : string,
  'email' : string,
  'message' : string,
  'timestamp' : bigint,
  'mobile' : string,
}
export interface Product {
  'id' : bigint,
  'inStock' : boolean,
  'name' : string,
  'description' : string,
  'imageUrl' : string,
  'category' : string,
  'price' : bigint,
}
export interface SignupEntry {
  'id' : bigint,
  'city' : string,
  'fullName' : string,
  'email' : string,
  'timestamp' : bigint,
  'mobile' : string,
}
export interface _SERVICE {
  'addProduct' : ActorMethod<[string, string, bigint, string, string, boolean], bigint>,
  'updateProduct' : ActorMethod<[bigint, string, string, bigint, string, string, boolean], undefined>,
  'deleteProduct' : ActorMethod<[bigint], undefined>,
  'getAllProducts' : ActorMethod<[], Array<Product>>,
  'getProductsByCategory' : ActorMethod<[string], Array<Product>>,
  'getProduct' : ActorMethod<[bigint], Product>,
  'setStock' : ActorMethod<[bigint, boolean], undefined>,
  'submitSignup' : ActorMethod<[string, string, string, string], bigint>,
  'getAllSignups' : ActorMethod<[], Array<SignupEntry>>,
  'submitContactMessage' : ActorMethod<[string, string, string, string], bigint>,
  'getAllContactMessages' : ActorMethod<[], Array<ContactMessage>>,
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
