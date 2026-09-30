"use client";

import { useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "XOR Cipher", href: "#xor-cipher" },
  { label: "One-Time Pad", href: "#otp" },
  { label: "How It Works", href: "#how-it-works" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-bg/70 backdrop-blur-md bg-amber-600">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6">
        <a href="#home" className="leading-tight">
          <span className="block font-heading text-lg font-semibold">XOR Lab</span>
          <span className="block text-xs text-muted">Understanding encryption through XOR</span>
        </a>

        <nav aria-label="Main" className="hidden gap-8 text-sm text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-accent">
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-md p-2 text-muted hover:text-ink md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-surface/95 px-4 py-3 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-3 text-muted hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
