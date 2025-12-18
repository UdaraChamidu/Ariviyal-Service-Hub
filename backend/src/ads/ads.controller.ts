import { Controller, Get, Post, Body, Param, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() createAdDto: any) {
    // Ensure the user ID from the token is used
    // The frontend sends userEmail, but we should rely on the token for userId
    // We need to match the Prisma Schema requirements.
    // Schema: userId String, user User @relation...
    // The createAdDto might contain some of this, but we override userId from the token for security.
    
    return this.adsService.create({
      ...createAdDto,
      user: {
        connect: { id: req.user.userId },
      },
      // Remove any fields that might cause issues if they're not in schema or handled by relations
      userId: undefined, 
      userEmail: undefined 
    });
  }

  @Get()
  findAll() {
    return this.adsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateAdDto: any) {
    return this.adsService.update(id, req.user.userId, updateAdDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.adsService.remove(id, req.user.userId);
  }
}
