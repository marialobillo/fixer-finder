import { randomUUID } from "node:crypto";

export interface UserProps {
    id?: string
    username: string
    email: string
    password: string
    role: string
}

export class User {
    public id?: string
    public username: string
    public email: string
    public password: string
    public role: string

    constructor({ id, username, email, password, role }: UserProps) {
        this.id = id ?? randomUUID();
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}