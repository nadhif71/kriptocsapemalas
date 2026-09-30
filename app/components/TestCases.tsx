import Button from "./Button";
import Reveal from "./Reveal";
import { encryptText, decryptHex, type Result } from "@/lib/xor";

const show = (r: Result) => (r.ok ? r.out : "Error: " + r.error);

const tests = [
  { input: 'Encrypt "CAT", key "K"', run: () => show(encryptText("CAT", "K")), expected: "08 0a 1f" },
  { input: 'Encrypt "OPEN SESAME", key "KEY"', run: () => show(encryptText("OPEN SESAME", "KEY")), expected: "04 15 1c 05 65 0a 0e 16 18 06 00" },
  { input: 'Encrypt "2026", key "Z"', run: () => show(encryptText("2026", "Z")), expected: "68 6a 68 6c" },
  { input: 'Decrypt "02 12 14 77 08 18 04", key "QW"', run: () => show(decryptHex("02 12 14 77 08 18 04", "QW")), expected: "SEE YOU" },
  { input: 'Encrypt "HI", empty key', run: () => show(encryptText("HI", "")), expected: "Error: Please enter a key." },
  { input: 'Decrypt "zz 10", key "K"', run: () => show(decryptHex("zz 10", "K")), expected: "Error: Ciphertext must be hex bytes, like: 1f 0d 72" },
];

export default function TestCases() {
  const results = tests.map((t) => {
    const out = t.run();
    return { ...t, out, pass: out === t.expected };
  });
  const passed = results.filter((r) => r.pass).length;

  return (
    <section id="tests" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl">Test Cases</h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Input → Algorithm → Your output → Expected output → PASS / FAIL.
          Result: <span className="font-medium">{passed} / {results.length} passed</span>
        </p>
      </Reveal>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] border border-line text-left text-sm">
          <thead className="bg-card">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Input</th>
              <th className="p-3">Your output</th>
              <th className="p-3">Expected output</th>
              <th className="p-3">Result</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} className="border-t border-line align-top">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{r.input}</td>
                <td className="p-3 font-mono">{r.out}</td>
                <td className="p-3 font-mono">{r.expected}</td>
                <td className="p-3">
                  <span className={"rounded-md px-2 py-1 font-medium " + (r.pass ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
                    {r.pass ? "PASS" : "FAIL"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
            <div className="mt-8">
                <Button href="#xor-cipher" variant="secondary">↑ Back to XOR Cipher</Button>
            </div>
    </section>
  );
}