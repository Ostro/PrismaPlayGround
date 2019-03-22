const { prisma } = require('../../prisma-client/index');

const users = [
  {
    name: 'Hero',
    type: 'PLAYER',
    gils: 100000,
    bag: {
      create: [],
    },
  },
  {
    name: 'Vendor 1',
    type: 'NPC',
    gils: 100000,
    bag: {
      create: [
        {
          item: {
            connect: { name: 'Potion' },
          },
          quantity: 10,
        },
        {
          item: {
            connect: { name: 'Hi-Potion' },
          },
          quantity: 3,
        },
        {
          item: {
            connect: { name: 'Ether' },
          },
          quantity: 10,
        },
        {
          item: {
            connect: { name: 'Phoenix Down' },
          },
          quantity: 10,
        },
        {
          item: {
            connect: { name: 'Mythril Saber' },
          },
          quantity: 2,
        },
        {
          item: {
            connect: { name: 'Hardedge' },
          },
          quantity: 1,
        },
        {
          item: {
            connect: { name: 'Iron Bangle' },
          },
          quantity: 5,
        },
        {
          item: {
            connect: { name: 'Titan Bangle' },
          },
          quantity: 2,
        },
      ],
    },
  },
  {
    name: 'Vendor 2',
    type: 'NPC',
    gils: 100000,
    bag: {
      create: [
        {
          item: {
            connect: { name: 'Potion' },
          },
          quantity: 20,
        },
        {
          item: {
            connect: { name: 'Hi-Potion' },
          },
          quantity: 10,
        },
        {
          item: {
            connect: { name: 'X-Potion' },
          },
          quantity: 1,
        },
        {
          item: {
            connect: { name: 'Ether' },
          },
          quantity: 20,
        },
        {
          item: {
            connect: { name: 'Turbo Ether' },
          },
          quantity: 2,
        },
        {
          item: {
            connect: { name: 'Phoenix Down' },
          },
          quantity: 10,
        },
        {
          item: {
            connect: { name: 'Elixir' },
          },
          quantity: 3,
        },
        {
          item: {
            connect: { name: 'Mythril Saber' },
          },
          quantity: 5,
        },
        {
          item: {
            connect: { name: 'Hardedge' },
          },
          quantity: 2,
        },
        {
          item: {
            connect: { name: 'Butterfly Edge' },
          },
          quantity: 1,
        },
        {
          item: {
            connect: { name: 'Iron Bangle' },
          },
          quantity: 5,
        },
        {
          item: {
            connect: { name: 'Titan Bangle' },
          },
          quantity: 2,
        },
        {
          item: {
            connect: { name: 'Mythril Armlet' },
          },
          quantity: 2,
        },
        {
          item: {
            connect: { name: 'Carbon Bangle' },
          },
          quantity: 2,
        },
      ],
    },
  },
  {
    name: 'Vendor 3',
    gils: 100000,
    type: 'NPC',
    bag: {
      create: [
        {
          item: {
            connect: { name: 'X-Potion' },
          },
          quantity: 99,
        },
        {
          item: {
            connect: { name: 'Turbo Ether' },
          },
          quantity: 99,
        },
        {
          item: {
            connect: { name: 'Mega Elixir' },
          },
          quantity: 99,
        },
        {
          item: {
            connect: { name: 'Phoenix Down' },
          },
          quantity: 99,
        },
        {
          item: {
            connect: { name: 'Enhance Sword' },
          },
          quantity: 99,
        },
        {
          item: {
            connect: { name: 'Crystal Sword' },
          },
          quantity: 99,
        },
        {
          item: {
            connect: { name: 'Gold Armlet' },
          },
          quantity: 99,
        },
        {
          item: {
            connect: { name: 'Diamond Bangle' },
          },
          quantity: 99,
        },
      ],
    },
  },
];

const promises = users.map(async item => await prisma.createUser(item));
Promise.all(promises)
  .then(() => {
    console.log('All Users has been inserted');
  })
  .catch(err => {
    console.log('Error while inserting Users', err);
  });
