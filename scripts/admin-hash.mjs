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
/**
 * Parolni so'raydi: har bir belgi o'rnida "*" chiqadi, Backspace ishlaydi,
 * Enter — tugatish, Ctrl+C — chiqish.
 */
function askHidden(question) {
  return new Promise((resolve) => {
    const { stdin, stdout } = process;
    stdout.write(question);
    let value = "";

    if (!stdin.isTTY) {
      // Terminal bo'lmasa (masalan, pipe) — oddiy qator sifatida o'qiymiz
      stdin.setEncoding("utf8");
      stdin.once("data", (data) => resolve(String(data).split(/\r?\n/)[0]));
      return;
    }

    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === "\r" || ch === "\n") {
          stdin.setRawMode(false);
          stdin.pause();
          stdin.off("data", onData);
          stdout.write("\n");
          resolve(value);
          return;
        }
        if (ch === "\u0003") {
          stdout.write("\n");
          process.exit(130);
        }
        if (ch === "\u007f" || ch === "\b") {
          if (value.length > 0) {
            value = value.slice(0, -1);
            stdout.write("\b \b");
          }
          continue;
        }
        if (ch >= " ") {
          value += ch;
          stdout.write("*");
        }
      }
    };
    stdin.on("data", onData);
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
