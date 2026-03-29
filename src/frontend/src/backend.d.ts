import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    mobile: string;
}
export interface SignupEntry {
    id: bigint;
    city: string;
    fullName: string;
    email: string;
    timestamp: bigint;
    mobile: string;
}
export interface UserProfile {
    name: string;
}
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, description: string, price: bigint, category: string, imageUrl: string, inStock: boolean): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllSignups(): Promise<Array<SignupEntry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProduct(id: bigint): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStock(id: bigint, inStock: boolean): Promise<void>;
    submitContactMessage(name: string, email: string, mobile: string, message: string): Promise<bigint>;
    submitSignup(fullName: string, email: string, mobile: string, city: string): Promise<bigint>;
    updateProduct(id: bigint, name: string, description: string, price: bigint, category: string, imageUrl: string, inStock: boolean): Promise<void>;
}
