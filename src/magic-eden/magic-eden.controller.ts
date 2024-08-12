import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MagicEdenService } from './magic-eden.service';
import { PaginationListingDTO } from './magicEdenDTO';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@ApiTags('Magic Eden')
@Controller('magic-eden')
export class MagicEdenController {
  constructor(private readonly magicEdenService: MagicEdenService) {}

  @Get('collection/info')
  @ApiOperation({ summary: 'Get meekolony collection info' })
  async collectionInfo() {
    return this.magicEdenService.getCollectionInfo();
  }

  @Post('collection/listing')
  @ApiOperation({ summary: 'Get meekolony collection listing NFTs' })
  async collectionListing(@Body() body: PaginationListingDTO) {
    return this.magicEdenService.getCollectionListing(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('wallet/listing')
  @ApiOperation({ summary: 'Get meekolony logged user listing NFTs' })
  async mywalletListing(@Request() req, @Body() body: PaginationListingDTO) {
    return this.magicEdenService.getWalletListing(req.user.solanaWalletAddress, body);
  }

  @Post('wallet/listing/:walletAddress')
  @ApiOperation({ summary: 'Get meekolony listing NFTs by wallet address' })
  async walletListing(@Param('walletAddress') walletAddress: string, @Body() body: PaginationListingDTO) {
    return this.magicEdenService.getWalletListing(walletAddress, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('wallet/info')
  @ApiOperation({ summary: 'Get logged user wallet info' })
  async mywalletInfo(@Request() req) {
    return this.magicEdenService.getWalletInfo(req.user.solanaWalletAddress);
  }

  @Get('wallet/info/:walletAddress')
  @ApiOperation({ summary: 'Get wallet info by wallet address' })
  async walletInfo(@Param('walletAddress') walletAddress: string) {
    return this.magicEdenService.getWalletInfo(walletAddress);
  }

  // @Get('collection/stats')
  // @ApiOperation({ summary: 'Get meekolony collection stats (floor price etc)' })
  // async collectionStat() {
  //   return this.magicEdenService.getCollectionStat();
  // }

  // @Get('collection/holder-stats')
  // @ApiOperation({ summary: 'Get meekolony collection holder stats (uniqueHolders)' })
  // async collectionHolderStat() {
  //   return this.magicEdenService.getCollectionHolderStat();
  // }
}
