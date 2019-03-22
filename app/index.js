const { prisma } = require('../prisma-client');
const { GraphQLServer } = require('graphql-yoga');
const _ = require('lodash');

const resolvers = {
  Query: {
    getHero(root, args, context) {
      return resolvers.Query.getUser(root, { name: 'Hero' }, context);
    },
    getMerchants(root, args, context) {
      return context.prisma.users({ where: { type: 'NPC' } });
    },
    getUser(root, { name }, context) {
      return context.prisma.user({ name });
    },
    getUserItemsByType(root, { name, itemType }, context) {
      const user = resolvers.Query.getUser(root, { name }, context);

      if (itemType) return user.bag({ where: { item: { type: itemType } } });
      return user.bag();
    },
    getUserItemSlot(root, { name, itemName }, context) {
      return context.prisma.inventories({
        where: {
          AND: [{ owner: { name: name } }, { item: { name: itemName } }],
        },
      });
    },
    getItemByName(root, { name }, context) {
      return context.prisma.item({ name });
    },
  },
  Mutation: {
    async itemTransaction(
      root,
      { buyerName, sellerName, itemName, quantity, shopSection },
      context
    ) {
      const buyer = await resolvers.Query.getUser(
        root,
        { name: buyerName },
        context
      );
      const seller = await resolvers.Query.getUser(
        root,
        { name: sellerName },
        context
      );
      const buyerItemSlot = await resolvers.Query.getUserItemSlot(
        root,
        { name: buyerName, itemName },
        context
      );
      const sellerItemSlot = await resolvers.Query.getUserItemSlot(
        root,
        { name: sellerName, itemName },
        context
      );
      const item = await resolvers.Query.getItemByName(
        root,
        { name: itemName },
        context
      );

      if (_.isEmpty(sellerItemSlot)) {
        // Error handling ...
      }

      const nbItemToBuy = Math.min(quantity, sellerItemSlot[0].quantity);

      // Update or delete seller inventory
      if (quantity === sellerItemSlot[0].quantity) {
        await context.prisma.deleteInventory({ id: sellerItemSlot[0].id });
      } else {
        await context.prisma.updateInventory({
          where: {
            id: sellerItemSlot[0].id,
          },
          data: {
            quantity: sellerItemSlot[0].quantity - nbItemToBuy,
          },
        });
      }

      // Create or Update buyer inventory
      if (_.isEmpty(buyerItemSlot)) {
        await context.prisma.createInventory({
          owner: {
            connect: { name: buyerName },
          },
          item: {
            connect: { name: itemName },
          },
          quantity: nbItemToBuy,
        });
      } else {
        await context.prisma.updateInventory({
          where: {
            id: buyerItemSlot[0].id,
          },
          data: {
            quantity: buyerItemSlot[0].quantity + nbItemToBuy,
          },
        });
      }

      // Update buyer and seller money
      await context.prisma.updateUser({
        where: { name: buyerName },
        data: { gils: buyer.gils - item.price * nbItemToBuy },
      });

      await context.prisma.updateUser({
        where: { name: sellerName },
        data: { gils: seller.gils + item.price * nbItemToBuy },
      });

      return resolvers.Query.getUserItemsByType(
        root,
        { name: sellerName, itemType: shopSection },
        context
      );
    },
  },
  User: {
    bag({ id }, args, context) {
      return context.prisma.user({ id }).bag();
    },
  },
  Inventory: {
    item({ id }, args, context) {
      return context.prisma.inventory({ id }).item();
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma,
  },
});
server.start(() => console.log('Server is running on http://localhost:4000'));
