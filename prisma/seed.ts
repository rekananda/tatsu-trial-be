import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const rarities = [
    {
      rarity: 'legendary',
      color: '#cc001f',
      description: 'Item drops from world bosses, can be only one',
    },
    {
      rarity: 'unique',
      color: '#ff8c00',
      description: 'Item is A one-of-a-kind.',
    },
    {
      rarity: 'epic',
      color: '#800080',
      description: 'Limited edition item, only come with limited stock',
    },
    {
      rarity: 'rare',
      color: '#024bd4',
      description: 'Rare item, and rarer drop that uncommon',
    },
    {
      rarity: 'uncommon',
      color: '#008000',
      description: 'Slightly rarer than common item',
    },
    {
      rarity: 'common',
      color: '#808080',
      description: 'A widely available item',
    },
  ];

  for (const rarity of rarities) {
    await prisma.rarityDetails.upsert({
      where: { rarity: rarity.rarity },
      update: {
        color: rarity.color,
        description: rarity.description,
      },
      create: {
        rarity: rarity.rarity,
        color: rarity.color,
        description: rarity.description,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
