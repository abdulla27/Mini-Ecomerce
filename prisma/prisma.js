// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// async function main() {
//   // createmany
//   //   const post = await prisma.post.createMany({
//   //     data: [
//   //       { title: "hello prisma", content: "this is prisma information" },
//   //       { title: "hello prisma", content: "this is prisma information" },
//   //       { title: "hello prisma", content: "this is prisma information" },
//   //       { title: "hello prisma", content: "this is prisma information" },
//   //     ],
//   //   });mysql
//   //   console.log(post);
//   // findmany
//   //   const allpost = await prisma.post.findMany();
//   //   console.log(allpost);
//   //findUnique
//   //   const post = await prisma.post.findUnique({
//   //     where: {
//   //       id: 18,
//   //     },
//   //   });
//   //   console.log(post);
//   //update
//   //   const updatepost = await prisma.post.update({
//   //     where: {
//   //       id: 16,
//   //     },
//   //     data: { title: "hello pi", content: "th is" },
//   //   });
//   //   console.log(updatepost);
//   // }
//   // delete
//   //   const deletepost = await prisma.post.delete({
//   //     where: {
//   //       id: 17,
//   //     },
//   //   });
//   //   console.log(deletepost, "deleted");
// }
// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
