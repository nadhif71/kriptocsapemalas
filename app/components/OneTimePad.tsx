import Reveal from "./Reveal";
import KeyReuseDemo from "./KeyReuseDemo";

const rules = [
  { title: "Truly random", text: "Every bit of the key is picked by chance. No pattern." },
  { title: "As long as the message", text: "The key never repeats. A 100-letter message needs a 100-letter key." },
  { title: "Kept secret", text: "Only Alice and Bob know the key." },
  { title: "Never reused", text: "After one message, throw the key away." },
];

export default function OneTimePad() {
  return (
    <section id="otp" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl">One-Time Pad</h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          The One-Time Pad is XOR taken to its limit. If you follow these 4 rules, nobody can break it.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {rules.map((r, i) => (
          <Reveal key={r.title} delay={i * 80}>
            <div className="h-full rounded-xl border border-line bg-card p-6">
              <h3 className="font-heading text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-muted">{r.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-8 rounded-xl border border-line bg-card p-6">
          <h3 className="font-heading text-lg font-semibold">Why never reuse the key?</h3>
          <p className="mt-2 text-muted">
            If two messages use the same key, an attacker can XOR the two encrypted messages. The key
            cancels out, and what is left shows how the two messages relate. From there, the messages can
            be guessed.
          </p>
        </div>
      </Reveal>

      <div className="mt-8">
        <KeyReuseDemo />
      </div>
    </section>
  );
}