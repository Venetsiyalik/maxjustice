#!/usr/bin/env node
/**
 * Admin parolining hash'ini va sessiya kalitini yaratadi.
 *
 *   npm run admin:hash
 *
 * Parol ekranda ko'rinmaydi va hech qayerga yozilmaydi. Chiqqan ikki qatorni
 * Vercel → Settings → Environment Variables ga qo'shing (va ADMIN_LOGIN ni).
 */
import { randomBytes, scryptSync } from "node:crypto";
import readline from "node:readline";

function askHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (str) => {
      if (str.includes(question)) process.stdout.write(str);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

const password = await askHidden("Yangi admin paroli: ");
const repeat = await askHidden("Parolni takrorlang: ");

if (password !== repeat) {
  console.error("Parollar mos kelmadi.");
  process.exit(1);
}
if (password.length < 12) {
  console.error("Parol kamida 12 belgi bo'lsin.");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log("\nVercel'ga qo'shing (Production):\n");
console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt.toString("base64")}:${hash.toString("base64")}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(32).toString("base64url")}`);
console.log("\nVa ADMIN_LOGIN=<o'zingiz tanlagan login>");
