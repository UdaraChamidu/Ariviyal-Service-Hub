"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdsService = class AdsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.ad.create({
            data,
        });
    }
    async findAll() {
        return this.prisma.ad.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                user: true
            }
        });
    }
    async findOne(id) {
        return this.prisma.ad.findUnique({
            where: { id },
            include: {
                user: true
            }
        });
    }
    async update(id, userId, data) {
        const ad = await this.findOne(id);
        if (!ad) {
            throw new common_1.NotFoundException('Ad not found');
        }
        if (ad.userId !== userId) {
            throw new common_1.ForbiddenException('You can only edit your own ads');
        }
        return this.prisma.ad.update({
            where: { id },
            data,
        });
    }
    async remove(id, userId) {
        const ad = await this.findOne(id);
        if (!ad) {
            throw new common_1.NotFoundException('Ad not found');
        }
        if (ad.userId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own ads');
        }
        await this.prisma.ad.delete({
            where: { id },
        });
    }
    async findByUser(userId) {
        return this.prisma.ad.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                user: true,
            },
        });
    }
};
exports.AdsService = AdsService;
exports.AdsService = AdsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdsService);
//# sourceMappingURL=ads.service.js.map