import Reveal from "./Reveal";

const steps = [
  {
    title: "1. Pick a key",
    text: "Alice and Bob both know the same secret key. Nobody else does.",
  },
  {
    title: "2. Encrypt",
    text: "Alice turns her message into bits. She XORs each bit with the key. The result is the ciphertext, and it looks like noise.",
  },
  {
    title: "3. Decrypt",
    text: "Bob XORs the ciphertext with the same key. The original message comes back.",
  },
];

export default function XorSteps() {
  return (
    <div className="mb-12">
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <div className="h-full rounded-xl border border-line bg-card p-6">
              <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-card p-6 font-mono text-sm sm:text-base">
            <p className="mb-3 font-sans font-medium">Encrypt the letter H</p>
            <p><span className="text-muted">Plaintext:  </span>01001000</p>
            <p><span className="text-muted">Key:        </span>10110110</p>
            <p><span className="text-muted">Ciphertext: </span><span className="text-accent">11111110</span></p>
          </div>
          <div className="rounded-xl border border-line bg-card p-6 font-mono text-sm sm:text-base">
            <p className="mb-3 font-sans font-medium">Decrypt it with the same key</p>
            <p><span className="text-muted">Ciphertext: </span>11111110</p>
            <p><span className="text-muted">Key:        </span>10110110</p>
            <p><span className="text-muted">Plaintext:  </span><span className="text-accent2">01001000</span></p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={250}>
        <p className="mt-6 max-w-2xl text-muted">
          Why does it work? XOR with the same key twice cancels out: (P ⊕ K) ⊕ K = P. So Bob needs the
          exact same key. A wrong key gives noise.
        </p>
      </Reveal>
    </div>
  );
}