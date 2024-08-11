import { Controller, Get, Query } from '@nestjs/common';
import { SolanaService } from './solana.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Solana')
@Controller('solana')
export class SolanaController {
  constructor(private readonly solanaService: SolanaService) {}

  @Get('balance')
  @ApiOperation({ summary: 'Get SOL balance of a wallet' })
  async getBalance(@Query('publicKey') publicKey: string) {
    return this.solanaService.getAccountBalance(publicKey);
  }

  @Get('nfts')
  @ApiOperation({ summary: 'Get NFTs owned by a wallet' })
  async getNFTs(@Query('publicKey') publicKey: string) {
    return this.solanaService.getNFTsByWallet(publicKey);
  }
}
