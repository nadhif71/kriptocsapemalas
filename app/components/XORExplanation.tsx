import Reveal from "./Reveal";

const ops: [number, number][] = [[0, 0], [0, 1], [1, 0], [1, 1]];

export default function XORExplanation() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl">The Core Operation: XOR</h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {ops.map(([a, b], i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="rounded-xl border border-line bg-card p-6 text-center font-mono text-xl transition-colors duration-300 hover:border-accent/50 sm:text-2xl">
              <span className="text-accent">{a}</span>
              <span className="mx-2 text-muted">⊕</span>
              <span className="text-accent2">{b}</span>
              <span className="mx-2 text-muted">=</span>
              <span>{a ^ b}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={200}>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          XOR produces 1 when the two input bits are different and 0 when they are the same.
        </p>
      </Reveal>
    </section>
  );
}
