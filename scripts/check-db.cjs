// Quick check what's in the DB
const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
(async () => {
  const users = await p.user.findMany({ select: { email: true, name: true, passwordHash: true, role: true } });
  for (const u of users) {
    console.log(`${u.email} | ${u.role} | ${u.passwordHash?.substring(0, 50) || "null"}`);
  }
  await p.$disconnect();
})();
