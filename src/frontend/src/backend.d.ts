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
    city: string;
    name: string;
    email: string;
    mobile: string;
}
export interface Product {
    id: bigint;
    inStock: boolean;
    imageUrls: Array<string>;
    name: string;
    description: string;
    isFeatured: boolean;
    addedAt: bigint;
    quantity: bigint;
    category: string;
    price: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, description: string, price: bigint, category: string, imageUrls: Array<string>, inStock: boolean, isFeatured: boolean, quantity: bigint): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllSignups(): Promise<Array<SignupEntry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getMyRole(): Promise<UserRole>;
    getProduct(id: bigint): Promise<Product>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    getRecentProducts(): Promise<Array<Product>>;
    getSignupsByCity(city: string): Promise<Array<SignupEntry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeAdmin(adminToken: string, userProvidedToken: string): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    markProductAsFeatured(id: bigint, isFeatured: boolean): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProducts(term: string): Promise<Array<Product>>;
    setStock(id: bigint, inStock: boolean, quantity: bigint): Promise<void>;
    submitContactMessage(name: string, email: string, mobile: string, message: string): Promise<bigint>;
    submitSignup(fullName: string, email: string, mobile: string, city: string): Promise<bigint>;
    updateProduct(id: bigint, name: string, description: string, price: bigint, category: string, imageUrls: Array<string>, inStock: boolean, isFeatured: boolean, quantity: bigint): Promise<void>;
}
