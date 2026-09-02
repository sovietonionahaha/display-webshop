import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const createPrismaClient = () => {
  return new PrismaClient({
    adapter,
  }).$extends({
    result: {
      product: {
        discountPrice: {
          needs: {
            price: true,
            discountPercent: true,
          },

          compute(product) {
            if (!product?.discountPercent) {
              return product.price;
            }

            return Math.round(
              product.price * (1 - product.discountPercent / 100),
            );
          },
        },
      },
    },
  });
};

type PrismaClientExtended = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientExtended | undefined;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
