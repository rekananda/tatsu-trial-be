import { forwardRef, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CollectionInfoT, MagicEdenCollectionData, MagicEdenCollectionListing, MagicEdenCollectionStat, MagicEdenHolderNFTs, MagicEdenHolderStats, WalletInfoT } from 'src/magiceden-types';
import { PaginationListingDTO } from './magicEdenDTO';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MagicEdenService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  private readonly baseUrl = process.env.MAGIC_EDEN_API || 'https://api-mainnet.magiceden.dev';
  private readonly collectionSymbol = 'meekolony';

  async getCollectionInfo(): Promise<CollectionInfoT> {
    let result: CollectionInfoT = {
      symbol: this.collectionSymbol,
      name: '',
      totalItems: 0,
      totalSupply: 0,
      uniqueHolders: 0,
      floorPrice: 0,
      listedCount: 0,
      volumeAll: 0,
    };
    try {
      const responseInfo: { data: MagicEdenCollectionData } = await axios.get(`${this.baseUrl}/collections/${this.collectionSymbol}`);
      const responseStats: { data: MagicEdenCollectionStat } = await axios.get(`${this.baseUrl}/v2/collections/${this.collectionSymbol}/stats`);
      const responseHolder: { data: MagicEdenHolderStats } = await axios.get(`${this.baseUrl}/v2/collections/${this.collectionSymbol}/holder_stats`);
      result = {
        ...result,
        ...{
          name: responseInfo.data.name || this.collectionSymbol,
          totalItems: responseInfo.data.totalItems || 0,
          image: responseInfo.data.image,
          description: responseInfo.data.description,
        },
        ...{
          totalSupply: responseHolder.data.totalSupply || 0,
          uniqueHolders: responseHolder.data.uniqueHolders || 0,
        },
        ...{
          floorPrice: responseStats.data.floorPrice / 1e9 || 0,
          listedCount: responseStats.data.listedCount || 0,
          volumeAll: responseStats.data.volumeAll / 1e9 || 0,
        },
      };
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCollectionStat(): Promise<MagicEdenCollectionStat | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/v2/collections/${this.collectionSymbol}/stats`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCollectionHolderStat(): Promise<MagicEdenHolderStats | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/v2/collections/${this.collectionSymbol}/holder_stats`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCollectionListing(pagination: PaginationListingDTO): Promise<MagicEdenCollectionListing[]> {
    let params = Object.keys(pagination)
      .map((key) => `${key}=${pagination[key]}`)
      .join('&');

    params = params ? '?' + params : '';
    try {
      const response = await axios.get(`${this.baseUrl}/v2/collections/${this.collectionSymbol}/listings${params}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getWalletListing(walletAddress: string, pagination: PaginationListingDTO): Promise<MagicEdenHolderNFTs[]> {
    const params = Object.keys(pagination)
      .map((key) => `${key}=${pagination[key]}`)
      .join('&');

    try {
      const response = await axios.get(`${this.baseUrl}/v2/wallets/${walletAddress}/tokens?collection_symbol=${this.collectionSymbol}${params !== '' ? '&' + params : params}`);
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getWalletInfo(walletAddress: string): Promise<WalletInfoT> {
    let result: WalletInfoT = {
      address: walletAddress,
    };
    try {
      const response = await axios.get(`${this.baseUrl}/v2/wallets/${walletAddress}`);
      const user = await this.userService.findUserByWallet(walletAddress);
      const { name, email } = user;
      return (result = { ...result, ...response.data, ...{ name, email } });
    } catch (error) {
      return result;
    }
  }
}
