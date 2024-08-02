// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.products.create({
      data:{title: "CLock1",
      price: 100,
      description: 'This is a beautiful clock',
      url:"https://m.media-amazon.com/images/I/919fIauAkfL._AC_UF894,1000_QL80_.jpg" ,
      weight: "200g",}
  });

  const post2 = await prisma.products.create({ 
        data:{title: "CLock2",
        price: 100,
        description: 'This is a beautiful clock',
        url:"https://m.media-amazon.com/images/I/919fIauAkfL._AC_UF894,1000_QL80_.jpg" ,
        weight:"100g",}
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
