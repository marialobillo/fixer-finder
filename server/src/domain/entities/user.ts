import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

export interface UserProps {
    id?: string;
    email: string;
    password: string;
    createdAt?: Date;
}

export class User {
    public readonly id?: string;
    public email: string;
    public password: string;
    public createdAt: Date;

    constructor({ id, email, password, createdAt}: UserProps) {
        this.id = id || randomUUID();
        this.email = email;
        this.password = password;
        this.createdAt = createdAt ?? new Date();
    }

    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async verifyPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}