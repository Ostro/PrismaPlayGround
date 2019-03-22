const { prisma } = require('../../prisma-client/index');

const items = [
  {
    type: 'MISC',
    name: 'Potion',
    description: 'Restores 100 HP.',
    price: 50,
  },
  {
    type: 'MISC',
    name: 'Hi-Potion',
    description: 'Restores 500 HP.',
    price: 80,
  },
  {
    type: 'MISC',
    name: 'X-Potion',
    description: 'Fully Restores HP.',
    price: 300,
  },
  {
    type: 'MISC',
    name: 'Ether',
    description: 'Restores 100 MP.',
    price: 150,
  },
  {
    type: 'MISC',
    name: 'Turbo Ether',
    description: 'Fully Restores MP.',
    price: 550,
  },
  {
    type: 'MISC',
    name: 'Elixir',
    description: 'Fully Restores HP/MP.',
    price: 700,
  },
  {
    type: 'MISC',
    name: 'Mega Elixir',
    description: 'Fully restores all members HP/MP.',
    price: 1500,
  },
  {
    type: 'MISC',
    name: 'Phoenix Down',
    description: "Revive a KO'd ally (HP restored to 1/4 of max HP).",
    price: 300,
  },
  {
    type: 'WEAPON',
    name: 'Mythril Saber',
    price: 1000,
    atk: 23,
    dmg: 98,
    mag: 4,
  },
  {
    type: 'WEAPON',
    name: 'Hardedge',
    price: 1500,
    atk: 32,
    dmg: 98,
    mag: 6,
  },
  {
    type: 'WEAPON',
    name: 'Butterfly Edge',
    price: 2800,
    atk: 39,
    dmg: 100,
    mag: 8,
  },
  {
    type: 'WEAPON',
    name: 'Enhance Sword',
    price: 12000,
    atk: 43,
    dmg: 107,
    mag: 16,
  },
  {
    type: 'WEAPON',
    name: 'Crystal Sword',
    price: 16000,
    atk: 76,
    dmg: 105,
    mag: 19,
  },
  {
    type: 'ARMOR',
    name: 'Iron Bangle',
    price: 150,
    def: 10,
    MDef: 2,
    HP: 150,
  },
  {
    type: 'ARMOR',
    name: 'Titan Bangle',
    price: 280,
    def: 14,
    MDef: 4,
    HP: 250,
  },
  {
    type: 'ARMOR',
    name: 'Mythril Armlet',
    price: 350,
    def: 18,
    MDef: 8,
    HP: 350,
  },
  {
    type: 'ARMOR',
    name: 'Carbon Bangle',
    price: 800,
    def: 27,
    MDef: 14,
    HP: 400,
  },
  {
    type: 'ARMOR',
    name: 'Silver Armlet',
    price: 1300,
    def: 34,
    MDef: 22,
    HP: 500,
  },
  {
    type: 'ARMOR',
    name: 'Gold Armlet',
    price: 2000,
    def: 46,
    MDef: 28,
    HP: 700,
  },
  {
    type: 'ARMOR',
    name: 'Diamond Bangle',
    price: 3200,
    def: 57,
    MDef: 37,
    HP: 1000,
  },
];

const promises = items.map(async item => await prisma.createItem(item));
Promise.all(promises)
  .then(() => {
    console.log('All Items has been inserted');
  })
  .catch(err => {
    console.log('Error while inserting items', err);
  });
