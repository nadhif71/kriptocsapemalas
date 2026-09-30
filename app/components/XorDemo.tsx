
"use client";
import { useState } from "react";

function xor(data: Uint8Array, key: Uint8Array) {
  return data.map((b, i) => b ^ key[i % key.length]);
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");
}

function fromHex(hex: string) {
  const nums = hex.trim().split(/\s+/).filter(Boolean).map((p) => parseInt(p, 16));
  if (nums.some((n) => Number.isNaN(n) || n > 255)) return null;
  return new Uint8Array(nums);
}

export default function XorDemo() {
  const [message, setMessage] = useState("Hello Bob!");
  const [aliceKey, setAliceKey] = useState("secret");
  const [received, setReceived] = useState("");
  const [bobKey, setBobKey] = useState("");

  const enc = new TextEncoder();

  const cipher =
    message && aliceKey
      ? toHex(xor(enc.encode(message), enc.encode(aliceKey)))
      : "";

  const bytes = fromHex(received);
  const decrypted =
    bytes && bobKey
      ? new TextDecoder().decode(xor(bytes, enc.encode(bobKey)))
      : "";

  const input =
    "w-full rounded-md border border-slate-300 bg-white p-2 font-mono text-sm text-ink";
  const panel = "space-y-3 rounded-xl border border-slate-300 bg-white p-5";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className={panel}>
        <h3 className="text-lg font-semibold text-ink">Alice (sender)</h3>
        <input className={input} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
        <input className={input} value={aliceKey} onChange={(e) => setAliceKey(e.target.value)} placeholder="Key" />
        <p className="text-sm text-slate-500">Encrypted:</p>
        <p className="break-all font-mono text-sm text-ink">{cipher || "-"}</p>
        <button
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
          onClick={() => setReceived(cipher)}
        >
          Send to Bob →
        </button>
      </div>

      <div className={panel}>
        <h3 className="text-lg font-semibold text-ink">Bob (receiver)</h3>
        <textarea className={input} value={received} onChange={(e) => setReceived(e.target.value)} placeholder="Encrypted message" />
        <input className={input} value={bobKey} onChange={(e) => setBobKey(e.target.value)} placeholder="Bob's key" />
        <p className="text-sm text-slate-500">Decrypted:</p>
        <p className="break-all font-mono text-sm text-ink">{decrypted || "-"}</p>
      </div>
    </div>
  );
}