/* eslint-disable */

// @ts-nocheck

import { IDL } from '@icp-sdk/core/candid';

export const ContactMessage = IDL.Record({
  'id' : IDL.Nat,
  'name' : IDL.Text,
  'email' : IDL.Text,
  'message' : IDL.Text,
  'timestamp' : IDL.Int,
  'mobile' : IDL.Text,
});
export const Product = IDL.Record({
  'id' : IDL.Nat,
  'inStock' : IDL.Bool,
  'name' : IDL.Text,
  'description' : IDL.Text,
  'imageUrl' : IDL.Text,
  'category' : IDL.Text,
  'price' : IDL.Nat,
});
export const SignupEntry = IDL.Record({
  'id' : IDL.Nat,
  'city' : IDL.Text,
  'fullName' : IDL.Text,
  'email' : IDL.Text,
  'timestamp' : IDL.Int,
  'mobile' : IDL.Text,
});

export const idlService = IDL.Service({
  'addProduct' : IDL.Func([IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Bool], [IDL.Nat], []),
  'updateProduct' : IDL.Func([IDL.Nat, IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Bool], [], []),
  'deleteProduct' : IDL.Func([IDL.Nat], [], []),
  'getAllProducts' : IDL.Func([], [IDL.Vec(Product)], ['query']),
  'getProductsByCategory' : IDL.Func([IDL.Text], [IDL.Vec(Product)], ['query']),
  'getProduct' : IDL.Func([IDL.Nat], [Product], ['query']),
  'setStock' : IDL.Func([IDL.Nat, IDL.Bool], [], []),
  'submitSignup' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
  'getAllSignups' : IDL.Func([], [IDL.Vec(SignupEntry)], ['query']),
  'submitContactMessage' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
  'getAllContactMessages' : IDL.Func([], [IDL.Vec(ContactMessage)], ['query']),
});

export const idlInitArgs = [];

export const idlFactory = ({ IDL }) => {
  const ContactMessage = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
    'timestamp' : IDL.Int,
    'mobile' : IDL.Text,
  });
  const Product = IDL.Record({
    'id' : IDL.Nat,
    'inStock' : IDL.Bool,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'imageUrl' : IDL.Text,
    'category' : IDL.Text,
    'price' : IDL.Nat,
  });
  const SignupEntry = IDL.Record({
    'id' : IDL.Nat,
    'city' : IDL.Text,
    'fullName' : IDL.Text,
    'email' : IDL.Text,
    'timestamp' : IDL.Int,
    'mobile' : IDL.Text,
  });
  return IDL.Service({
    'addProduct' : IDL.Func([IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Bool], [IDL.Nat], []),
    'updateProduct' : IDL.Func([IDL.Nat, IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Bool], [], []),
    'deleteProduct' : IDL.Func([IDL.Nat], [], []),
    'getAllProducts' : IDL.Func([], [IDL.Vec(Product)], ['query']),
    'getProductsByCategory' : IDL.Func([IDL.Text], [IDL.Vec(Product)], ['query']),
    'getProduct' : IDL.Func([IDL.Nat], [Product], ['query']),
    'setStock' : IDL.Func([IDL.Nat, IDL.Bool], [], []),
    'submitSignup' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getAllSignups' : IDL.Func([], [IDL.Vec(SignupEntry)], ['query']),
    'submitContactMessage' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getAllContactMessages' : IDL.Func([], [IDL.Vec(ContactMessage)], ['query']),
  });
};

export const init = ({ IDL }) => { return []; };
