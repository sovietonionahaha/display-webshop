import prisma from "@/lib/prisma";

export default async function getCategory(uri) {
  const category = await prisma.category.findFirst({
    where: {
        uri: uri
    },
    select: {
        title: true,
        uri: true
    }
  })

  return category
}