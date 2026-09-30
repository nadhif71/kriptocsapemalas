export const isAscii = (s: string) => /^[\x20-\x7E]+$/.test(s);
export const toBytes = (s: string) => Array.from(s).map((c) => c.charCodeAt(0));
export const toHex = (b: number[]) => b.map((x) => x.toString(16).padStart(2, "0")).join(" ");
export const bin = (n: number) => n.toString(2).padStart(8, "0");
export const xor = (data: number[], key: number[]) => data.map((b, i) => b ^ key[i % key.length]);

export function parseHex(s: string): number[] | null {
  const out: number[] = [];
  for (const p of s.trim().split(/\s+/)) {
    if (!/^[0-9a-fA-F]{2}$/.test(p)) return null;
    out.push(parseInt(p, 16));
  }
  return out;
}

export type Result = { ok: true; out: string } | { ok: false; error: string };

export function encryptText(plain: string, key: string): Result {
  if (!plain) return { ok: false, error: "Please enter a message." };
  if (!key) return { ok: false, error: "Please enter a key." };
  if (!isAscii(plain) || !isAscii(key))
    return { ok: false, error: "Only English letters, numbers, and symbols are supported." };
  return { ok: true, out: toHex(xor(toBytes(plain), toBytes(key))) };
}

export function decryptHex(hex: string, key: string): Result {
  if (!hex.trim()) return { ok: false, error: "Please enter the ciphertext." };
  if (!key) return { ok: false, error: "Please enter a key." };
  if (!isAscii(key))
    return { ok: false, error: "Only English letters, numbers, and symbols are supported." };
  const c = parseHex(hex);
  if (!c) return { ok: false, error: "Ciphertext must be hex bytes, like: 1f 0d 72" };
  const p = xor(c, toBytes(key));
  const readable = p.every((b) => b >= 32 && b <= 126);
  return { ok: true, out: readable ? String.fromCharCode(...p) : "Unreadable text. The key is probably wrong." };
}