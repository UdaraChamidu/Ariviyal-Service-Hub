import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
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
    getProfile(req: any): any;
}
