"use client";

import { useState } from "react";

import { bin, toBytes, parseHex, encryptText, decryptHex } from "@/lib/xor";

type Step = { ch: string; p: string; k: string; c: string };

const input = "w-full rounded-md border border-line bg-card p-2 font-mono text-sm";
const panel = "space-y-3 rounded-xl border border-line bg-card p-5";
const button = "rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90";

function Error({ text }: { text: string }) {
  if (!text) return null;
  return <p className="rounded-md bg-red-50 p-2 font-mono text-sm text-red-700">❌ Error: {text}</p>;
}

export default function XorDemo() {
  const [plain, setPlain] = useState("");
  const [key1, setKey1] = useState("");
  const [cipherOut, setCipherOut] = useState("");
  const [err1, setErr1] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [lastEnc, setLastEnc] = useState<{ cipher: string; key: string } | null>(null);
  const [cipherIn, setCipherIn] = useState("");
  const [key2, setKey2] = useState("");
  const [plainOut, setPlainOut] = useState("");
  const [err2, setErr2] = useState("");

    function encrypt() {
    setCipherOut("");
    setSteps([]);
    const r = encryptText(plain, key1);
    if (!r.ok) return setErr1(r.error);
    setErr1("");
    setCipherOut(r.out);
    setLastEnc({ cipher: r.out, key: key1 });
    const p = toBytes(plain);
    const k = toBytes(key1);
    const c = parseHex(r.out) ?? [];
    setSteps(
      p.slice(0, 5).map((b, i) => ({ ch: plain[i], p: bin(b), k: bin(k[i % k.length]), c: bin(c[i]) }))
    );
  }

      function decrypt() {
    setPlainOut("");
    const sameAsLast = lastEnc && cipherIn.trim() === lastEnc.cipher;
    if (sameAsLast && key2 && key2 !== lastEnc.key) {
      return setErr2("Wrong Key!!.");
    }
    const r = decryptHex(cipherIn, key2);
    if (!r.ok) return setErr2(r.error);
    setErr2("");
    const rightKey = sameAsLast && key2 === lastEnc.key;
    if (!rightKey && !r.looksLikeText) setPlainOut("Unreadable text. The key is probably wrong.");
    else setPlainOut(r.out);
  }
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className={panel}>
          <h3 className="text-lg font-semibold">Encrypt</h3>
          <input className={input} value={plain} onChange={(e) => setPlain(e.target.value)} placeholder="Plaintext (example: MEET AT 5)" />
          <input className={input} value={key1} onChange={(e) => setKey1(e.target.value)} placeholder="Key (example: K9)" />
          <button className={button} onClick={encrypt}>Encrypt</button>
          <Error text={err1} />
          {cipherOut && (
            <div>
              <p className="text-sm text-muted">Ciphertext (hex):</p>
              <p className="break-all font-mono text-sm">{cipherOut}</p>
              <button className="mt-2 text-sm text-accent" onClick={() => setCipherIn(cipherOut)}>
                Copy to Decrypt →
              </button>
            </div>
          )}
        </div>

        <div className={panel}>
          <h3 className="text-lg font-semibold">Decrypt</h3>
          <textarea className={input} value={cipherIn} onChange={(e) => setCipherIn(e.target.value)} placeholder="Ciphertext (hex bytes)" />
          <input className={input} value={key2} onChange={(e) => setKey2(e.target.value)} placeholder="Key" />
          <button className={button} onClick={decrypt}>Decrypt</button>
          <Error text={err2} />
          {plainOut && (
            <div>
              <p className="text-sm text-muted">Plaintext:</p>
              <p className="break-all font-mono text-sm">{plainOut}</p>
            </div>
          )}
        </div>
      </div>

      {steps.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-line bg-card p-5">
          <p className="mb-3 text-sm text-muted">Step by step (first letters): plaintext ⊕ key = ciphertext</p>
          <table className="w-full min-w-[480px] text-left font-mono text-sm">
            <thead className="text-muted">
              <tr><th className="p-2">Letter</th><th className="p-2">Plaintext bits</th><th className="p-2">Key bits</th><th className="p-2">Ciphertext bits</th></tr>
            </thead>
            <tbody>
              {steps.map((s, i) => (
                <tr key={i} className="border-t border-line">
                  <td className="p-2">{s.ch}</td><td className="p-2">{s.p}</td><td className="p-2">{s.k}</td><td className="p-2 text-accent">{s.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}