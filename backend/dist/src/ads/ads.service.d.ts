import { PrismaService } from '../prisma/prisma.service';
import { Ad, Prisma } from '@prisma/client';
export declare class AdsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.AdCreateInput): Promise<Ad>;
    findAll(): Promise<Ad[]>;
    findOne(id: string): Promise<Ad | null>;
    update(id: string, userId: string, data: Prisma.AdUpdateInput): Promise<Ad>;
    remove(id: string, userId: string): Promise<void>;
}
