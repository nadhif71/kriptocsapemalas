"use client";

import { useState } from "react";

const enc = new TextEncoder();
const dec = new TextDecoder();

function xor(a: Uint8Array, b: Uint8Array, len = a.length) {
  if (!a.length || !b.length) return new Uint8Array(0);
  const out = new Uint8Array(len);
  for (let i = 0; i < len; i++) out[i] = a[i % a.length] ^ b[i % b.length];
  return out;
}

const hex = (b: Uint8Array) =>
  Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join(" ");

function Row({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
      <span className="w-48 shrink-0 text-muted">{label}</span>
      <span className={"break-all " + (good ? "text-accent" : "")}>{value || "-"}</span>
    </div>
  );
}

export default function KeyReuseDemo() {
  const [m1, setM1] = useState("ATTACK AT DAWN");
  const [m2, setM2] = useState("RETREAT NOW!!!");
  const [key, setKey] = useState("SECRET");

  const a = enc.encode(m1);
  const b = enc.encode(m2);
  const k = enc.encode(key);

  const c1 = xor(a, k);
  const c2 = xor(b, k);
  const n = Math.min(c1.length, c2.length);

  const c1xc2 = xor(c1, c2, n);
  const m1xm2 = xor(a, b, n);
  const same = n > 0 && hex(c1xc2) === hex(m1xm2);

  // attacker knows Message 1 -> gets Message 2
  const leaked = dec.decode(xor(c1xc2, a, n));

  const input =
    "w-full rounded-md border border-line bg-card p-2 font-mono text-sm";

  return (
    <div className="rounded-xl border border-line bg-card p-6">
      <h3 className="font-heading text-lg font-semibold">Attack demo: same key used twice</h3>
      <p className="mt-2 text-muted">
        Two messages are locked with the SAME key. The attacker never sees the key, but the key cancels out.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <input className={input} value={m1} onChange={(e) => setM1(e.target.value)} placeholder="Message 1" />
        <input className={input} value={m2} onChange={(e) => setM2(e.target.value)} placeholder="Message 2" />
        <input className={input} value={key} onChange={(e) => setKey(e.target.value)} placeholder="Same key" />
      </div>

      <div className="mt-6 space-y-2 font-mono text-sm">
        <Row label="Ciphertext 1" value={hex(c1)} />
        <Row label="Ciphertext 2" value={hex(c2)} />
        <Row label="C1 XOR C2" value={hex(c1xc2)} good />
        <Row label="Message 1 XOR Message 2" value={hex(m1xm2)} good />
        <p className={same ? "text-accent" : "text-muted"}>
          {same ? "✓ They are equal. The key is gone!" : "Type both messages and a key."}
        </p>
        <Row label="If attacker knows Message 1, Message 2 is:" value={leaked} good />
      </div>
    </div>
  );
}