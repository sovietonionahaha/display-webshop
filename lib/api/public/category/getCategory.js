import prisma from "@/lib/prisma";

export default async function getCategory(uri) {
  const category = await prisma.category.findFirst({
    where: {
      uri: uri
    },
    select: {
      id: true,
      title: true,
      uri: true
    }
  })

  return category
}