import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Ad, Prisma } from '@prisma/client';

@Injectable()
export class AdsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AdCreateInput): Promise<Ad> {
    return this.prisma.ad.create({
      data,
    });
  }

  async findAll(): Promise<Ad[]> {
    return this.prisma.ad.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true // Include user details if needed for display
      }
    });
  }

  async findOne(id: string): Promise<Ad | null> {
    return this.prisma.ad.findUnique({
      where: { id },
      include: {
        user: true
      }
    });
  }

  async update(id: string, userId: string, data: Prisma.AdUpdateInput): Promise<Ad> {
    const ad = await this.findOne(id);
    if (!ad) {
      throw new NotFoundException('Ad not found');
    }

    if (ad.userId !== userId) {
      throw new ForbiddenException('You can only edit your own ads');
    }

    return this.prisma.ad.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    const ad = await this.findOne(id);
    if (!ad) {
      throw new NotFoundException('Ad not found');
    }

    if (ad.userId !== userId) {
      throw new ForbiddenException('You can only delete your own ads');
    }

    await this.prisma.ad.delete({
      where: { id },
    });
  }

  async findByUser(userId: string): Promise<Ad[]> {
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
}
