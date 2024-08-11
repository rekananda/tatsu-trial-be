import { Injectable } from '@nestjs/common';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

@Injectable()
export class SolanaService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  }

  async getAccountBalance(publicKey: string): Promise<number> {
    const key = new PublicKey(publicKey);
    const balance = await this.connection.getBalance(key);
    return balance / 1e9;
  }

  async getNFTsByWallet(publicKey: string): Promise<any[]> {
    const key = new PublicKey(publicKey);
    const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(key, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    });

    const nfts = tokenAccounts.value
      .filter((accountInfo) => accountInfo.account.data.parsed.info.tokenAmount.decimals === 0 && accountInfo.account.data.parsed.info.tokenAmount.uiAmount === 1)
      .map((accountInfo) => ({
        mint: accountInfo.account.data.parsed.info.mint,
        owner: accountInfo.account.data.parsed.info.owner,
        amount: accountInfo.account.data.parsed.info.tokenAmount.uiAmount,
      }));

    return nfts;
  }
}
