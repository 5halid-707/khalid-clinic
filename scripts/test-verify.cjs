// Verify a password against the DB hash
const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");
const p = new PrismaClient();

function verify(password, stored) {
  try {
    const parts = stored.split("$");
    if (parts.length !== 4 || parts[0] !== "scrypt") return false;
    const iterations = parseInt(parts[1], 10);
    const salt = Buffer.from(parts[2], "hex");
    const expectedHash = Buffer.from(parts[3], "hex");
    const hash = crypto.scryptSync(password, salt, expectedHash.length, {
      N: iterations, r: 8, p: 1,
    });
    return crypto.timingSafeEqual(hash, expectedHash);
  } catch (e) {
    console.error("verify err:", e.message);
    return false;
  }
}

(async () => {
  const u = await p.user.findUnique({ where: { email: "admin@kmh-erp.sa" } });
  console.log("User found:", !!u);
  console.log("Hash length:", u.passwordHash.length);
  console.log("Verify result:", verify("admin123", u.passwordHash));
  await p.$disconnect();
})();
