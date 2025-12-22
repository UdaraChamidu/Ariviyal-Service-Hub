import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
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
    register(userData: {
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
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        name: string;
        phoneNumber: string | null;
        photoURL: string | null;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateProfile(req: any, body: {
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
