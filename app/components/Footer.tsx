const explore = [
  { label: "Home", href: "#home" },
  { label: "XOR Cipher", href: "#xor-cipher" },
  { label: "One-Time Pad", href: "#otp" },
  { label: "How It Works", href: "#how-it-works" },
];
const resources = ["Cryptography Basics", "XOR", "Stream Ciphers", "One-Time Pad"];

export default function Footer() {
  return (
    <footer className="w-full border-t border-line bg-surface/60">
      <div className="grid w-full gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-semibold">XOR Lab</p>
          <p className="mt-3 max-w-xs text-sm text-muted">An interactive introduction to XOR-based encryption.</p>
        </div>
        <div>
          <p className="font-heading font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {explore.map((l) => (
              <li key={l.href}><a href={l.href} className="hover:text-accent">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-heading font-semibold">Resources</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {resources.map((r) => (
              <li key={r}><a href="#" className="hover:text-accent">{r}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-6 text-center text-sm text-muted">
        © 2026 XOR Lab. Built for educational purposes.
      </div>
    </footer>
  );
}
