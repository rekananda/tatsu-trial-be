export interface CollectionInfoT {
  symbol: string;
  description?: string;
  image?: string;
  name: string;
  totalItems: number;
  totalSupply: number;
  uniqueHolders: number;
  floorPrice: number;
  listedCount: number;
  volumeAll: number;
}

export interface WalletInfoT {
  address: string;
  displayName?: string;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface MagicEdenCollectionData {
  symbol: string;
  candyMachineIds: any[];
  createdAt: Date;
  description: string;
  discord: string;
  image: string;
  isDraft: boolean;
  name: string;
  totalItems: number;
  twitter: string;
  enabledAttributesFilters: boolean;
  website: string;
  categories: string[];
  derivativeDetails: DerivativeDetails;
  isDerivative: boolean;
  nftImageType: string;
  rarity: CollectionRarity;
  updatedAt: Date;
  watchlistCount: number;
  enabledTotalSupply: boolean;
  enabledUniqueOwners: boolean;
  enabledVersionFilter: boolean;
  onChainCollectionAddress: string;
  iframe: string;
  sortBy: string;
  stackBy: any[];
  isVerified: boolean;
  mmmStatus: string;
  blackListAttributes: any[];
  blockedMints: any[];
  efpcUpdatedAt: Date;
  enabledBidding: boolean;
  excludeFromPopularCollections: boolean;
  isAppend: boolean;
  isAutolist: boolean;
  isMIP1: boolean;
  isOcp: boolean;
  lmnft: string;
  masterEditionPda: string;
  mints: any[];
  isEligibleForDiamondsForMaker: boolean;
  mmmAllowlistUpdatedAt: Date;
  hasAllItems: boolean;
}

export interface MagicEdenHolderStats {
  symbol: string;
  totalSupply: number;
  uniqueHolders: number;
  tokenHistogram: TokenHistogram;
  topHolders: TopHolder[];
}

export interface MagicEdenCollectionStat {
  symbol: string;
  floorPrice: number;
  listedCount: number;
  volumeAll: number;
}

export interface MagicEdenCollectionListing {
  pdaAddress: string;
  auctionHouse: string;
  tokenAddress: string;
  tokenMint: string;
  seller: string;
  sellerReferral: string;
  tokenSize: number;
  price: number;
  priceInfo: PriceInfo;
  rarity: Rarity;
  extra: Extra;
  expiry: number;
  token: Token;
  listingSource: string;
}

export interface MagicEdenHolderNFTs {
  mintAddress: string;
  owner: string;
  supply: number;
  collection: string;
  collectionName: string;
  name: string;
  updateAuthority: string;
  primarySaleHappened: boolean;
  sellerFeeBasisPoints: number;
  image: string;
  animationUrl: string;
  externalUrl: string;
  attributes: Attribute[];
  properties: Properties;
  listStatus: string;
  delegate?: string;
}

export interface MagicEdenCollectionOffer {
  results: Result[];
}

export interface Result {
  spotPrice: number;
  curveType: sting;
  curveDelta: number;
  reinvestFulfillBuy: boolean;
  reinvestFulfillSell: boolean;
  expiry: number;
  lpFeeBp: number;
  buysideCreatorRoyaltyBp: number;
  poolOwner: string;
  sellsideAssetAmount: number;
  buysidePaymentAmount: number;
  buyOrdersAmount: number;
  collectionSymbol: string;
  collectionName: string;
  poolType: string;
  updatedAt: Date;
  uuid: string;
  poolKey: string;
  cosigner: string;
  mints: any[];
  collectionSellerFeeBasisPoints: number;
  lpFeeEarned: number;
  isMIP1: boolean;
  isOCP: boolean;
  sharedEscrowInfo?: SharedEscrowInfo;
}

export interface DerivativeDetails {
  originLink: string;
  originName: string;
}

export interface CollectionRarity {
  showMoonrank: boolean;
  showHowrare: boolean;
  showMagicEden: boolean;
}

export interface TokenHistogram {
  bars: Bar[];
}

export interface Bar {
  l_val: number;
  hight: number;
}

export interface TopHolder {
  owner: string;
  tokens: number;
  ownerDisplay?: OwnerDisplay;
  avatarMintImg?: string;
}

export interface OwnerDisplay {
  sol: string;
}

export interface Extra {
  img: string;
}

export interface PriceInfo {
  solPrice: SolPrice;
}

export interface SolPrice {
  rawAmount: string;
  address: string;
  decimals: number;
}

export interface Rarity {
  moonrank: Moonrank;
}

export interface Moonrank {
  rank: number;
  absolute_rarity: number;
  crawl: Crawl;
}

export interface Crawl {}

export interface Token {
  mintAddress: string;
  owner: string;
  supply: number;
  collection: string;
  collectionName: string;
  name: string;
  updateAuthority: string;
  primarySaleHappened: boolean;
  sellerFeeBasisPoints: number;
  image: string;
  animationUrl: string;
  externalUrl: string;
  attributes: Attribute[];
  properties: Properties;
  price: number;
  listStatus: string;
  tokenAddress: string;
  priceInfo: PriceInfo;
}

export interface Attribute {
  trait_type: TraitType;
  value: string;
}

export enum TraitType {
  Accessory = 'Accessory',
  Aura = 'Aura',
  Body = 'Body',
  Feet = 'Feet',
  HairColor = 'Hair Color',
  HairType = 'Hair Type',
  Legs = 'Legs',
  Race = 'Race',
}

export interface Properties {
  files: File[];
  category: string;
  creators: Creator[];
}

export interface Creator {
  share: number;
  address: string;
}

export interface File {
  uri: string;
  type: string;
}

export interface SharedEscrowInfo {
  sharedEscrowAddress: string;
  sharedEscrowCount: number;
  sharedEscrowBuysidePaymentAmount: number;
}
