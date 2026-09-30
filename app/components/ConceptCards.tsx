import Reveal from "./Reveal";

const concepts = [
  {
    id: "xor-cipher",
    title: "XOR Stream Cipher",
    text: "A stream cipher combines plaintext with a generated keystream using the XOR operation to produce ciphertext.",
    cta: "Explore XOR →",
    accent: "hover:border-accent/50 text-accent",
  },
  {
    id: "otp",
    title: "One-Time Pad",
    text: "The One-Time Pad uses a truly random key that is as long as the message and is used only once.",
    cta: "Explore OTP →",
    accent: "hover:border-accent2/50 text-accent2",
  },
];

export default function ConceptCards() {
  return (
    <section className="border-y border-line bg-surface/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl">Two Concepts, One Operation</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {concepts.map((c, i) => (
            <Reveal key={c.id} delay={i * 120}>
              <article
                id={c.id}
                className={`flex h-full flex-col rounded-2xl border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-1 ${c.accent.split(" ")[0]}`}
              >
                <h3 className="font-heading text-2xl font-semibold">{c.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{c.text}</p>
                <a href={`#${c.id}`} className={`mt-8 inline-block w-fit text-sm font-semibold ${c.accent.split(" ")[1]}`}>
                  {c.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
