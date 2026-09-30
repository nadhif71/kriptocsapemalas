"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import ScrollButton from "./ScrollButton";

const tests = [
  { input: 'Encrypt "CAT", key "K"', expected: "08 0a 1f" },
  { input: 'Decrypt "02 12 14 77 08 18 04", key "QW"', expected: "SEE YOU" },
  { input: 'Encrypt "HI", key left empty', expected: "Error: Please enter a key." },
];

type Status = "pass" | "fail" | "empty" | null;

const clean = (s: string) =>
  s.replace("❌", "").replace(/^\s*error:\s*/i, "").replace(/\s+/g, " ").trim();

const box = "w-full rounded-md border border-line bg-card p-2 font-mono text-sm";
const small = "rounded-md border border-line px-3 py-1 text-sm hover:bg-card";

export default function TestCases() {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [status, setStatus] = useState<Status[]>([null, null, null]);

  function setAnswer(i: number, v: string) {
    setAnswers((a) => a.map((x, j) => (j === i ? v : x)));
    setStatus((s) => s.map((x, j) => (j === i ? null : x)));
  }

  function check(i: number) {
    let result: Status;
    if (!answers[i].trim()) result = "empty";
    else result = clean(answers[i]) === clean(tests[i].expected) ? "pass" : "fail";
    setStatus((s) => s.map((x, j) => (j === i ? result : x)));
  }

  function reset() {
    setAnswers(["", "", ""]);
    setStatus([null, null, null]);
  }

  const passed = status.filter((s) => s === "pass").length;

  return (
    <section id="tests" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl">Test Cases</h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Try each test yourself in the{" "}
          <a href="#demo" className="text-accent underline">Encrypt / Decrypt box</a>. Type what you
            got in "Your output", then click Check.        </p>
      </Reveal>

      <div className="mt-6 flex items-center gap-3">
        <button className={small} onClick={reset}>Reset</button>
        <span className="text-sm text-muted">Passed: {passed} / {tests.length}</span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] border border-line text-left text-sm">
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
            {tests.map((t, i) => (
              <tr key={i} className="border-t border-line align-top">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{t.input}</td>
                <td className="p-3">
                  <input className={box} value={answers[i]} onChange={(e) => setAnswer(i, e.target.value)} placeholder="Type your output" />
                </td>
                <td className="p-3 font-mono">{t.expected}</td>
                <td className="p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button className={small} onClick={() => check(i)}>Check</button>
                    {status[i] === null && <span className="text-muted">Not run</span>}
                    {status[i] === "empty" && <span className="text-red-700">Type your output first</span>}
                    {status[i] === "pass" && <span className="rounded-md bg-green-50 px-2 py-1 font-medium text-green-700">PASS</span>}
                    {status[i] === "fail" && <span className="rounded-md bg-red-50 px-2 py-1 font-medium text-red-700">FAIL</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <ScrollButton target="demo">↑ Back to the demo</ScrollButton>
      </div>
    </section>
  );
}