-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "solanaWalletAddress" TEXT,
    "solanaPrivateKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "floorPrice" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RarityDetails" (
    "rarity" TEXT NOT NULL,
    "color" TEXT,
    "iconUrl" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RarityDetails_pkey" PRIMARY KEY ("rarity")
);

-- CreateTable
CREATE TABLE "Holders" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Holders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFTs" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT,
    "tokenId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" TEXT,
    "maxSupply" INTEGER NOT NULL,
    "currentSupply" INTEGER NOT NULL DEFAULT 0,
    "uniqueHolders" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NFTs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "HoldersId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionHistory" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "senderWallletId" TEXT,
    "reciverWalletId" TEXT,
    "transactionType" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NFTs_tokenId_key" ON "NFTs"("tokenId");

-- AddForeignKey
ALTER TABLE "Holders" ADD CONSTRAINT "Holders_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFTs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holders" ADD CONSTRAINT "Holders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTs" ADD CONSTRAINT "NFTs_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTs" ADD CONSTRAINT "NFTs_rarity_fkey" FOREIGN KEY ("rarity") REFERENCES "RarityDetails"("rarity") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFTs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_HoldersId_fkey" FOREIGN KEY ("HoldersId") REFERENCES "Holders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFTs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_senderWallletId_fkey" FOREIGN KEY ("senderWallletId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_reciverWalletId_fkey" FOREIGN KEY ("reciverWalletId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
