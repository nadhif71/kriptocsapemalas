import Reveal from "./Reveal";

const PLAINTEXT = "01001000";
const KEY = "10110110";
const CIPHERTEXT = "11111110";

function Bits({ value, color, offset = 0 }: { value: string; color: string; offset?: number }) {
  return (
    <div className={`flex gap-1.5 font-mono text-2xl tracking-wider sm:gap-2 sm:text-3xl ${color}`} aria-label={value}>
      {value.split("").map((bit, i) => (
        <span
          key={i}
          aria-hidden
          className="animate-bit motion-reduce:animate-none"
          style={{ animationDelay: `${(i + offset) * 0.25}s` }}
        >
          {bit}
        </span>
      ))}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium tracking-wide text-muted">{label}</p>
      {children}
    </div>
  );
}

function Operator({ symbol }: { symbol: string }) {
  return <div className="my-4 font-mono text-xl text-muted">{symbol}</div>;
}

export default function Hero() {
  return (
    <section id="home" className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2">
      <Reveal>
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Explore Encryption Through XOR
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Learn how XOR can be used to encrypt and decrypt information, and discover how the
          One-Time Pad takes the same concept to its theoretical limit.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#xor-cipher" className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-90">
            Explore XOR
          </a>
          <a href="#otp" className="rounded-lg border border-line px-5 py-3 text-sm font-semibold transition-colors hover:border-accent2 hover:text-accent2">
            Learn About OTP
          </a>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
          <Row label="PLAINTEXT"><Bits value={PLAINTEXT} color="text-accent" /></Row>
          <Operator symbol="⊕" />
          <Row label="KEY"><Bits value={KEY} color="text-accent2" offset={2} /></Row>
          <Operator symbol="=" />
          <Row label="CIPHERTEXT"><Bits value={CIPHERTEXT} color="text-ink" offset={4} /></Row>
        </div>
      </Reveal>
    </section>
  );
}
