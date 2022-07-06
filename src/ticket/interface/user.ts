import { Address } from "./address";

export interface User {
    _id: string;
    full_name: string;
    username: string;
    email: string;
    role: string;
    address: Address;
    password_hashed: string;
    token_hashed: string;
}