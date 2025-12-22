import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            phoneNumber: any;
            photoURL: any;
        };
    }>;
    register(data: {
        email: string;
        password: string;
        name: string;
        phoneNumber: string;
    }): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            phoneNumber: any;
            photoURL: any;
        };
    }>;
    getUserProfile(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        phoneNumber: string | null;
        photoURL: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateUser(userId: string, data: {
        name?: string;
        phoneNumber?: string;
        photoURL?: string;
    }): Promise<{
        id: string;
        email: string;
        name: string;
        phoneNumber: string | null;
        photoURL: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
