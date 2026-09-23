import { useState } from "react";
import { createEducator } from "../data/mockDb";

function Logo({ onClick }) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#1865F2]"
      onClick={onClick}
    >
      <span
        className="flex h-8 w-8 items-end justify-center gap-0.5 rounded-md bg-[#E6F4EA] pb-1"
        aria-hidden="true"
      >
        <span className="h-2 w-1.5 bg-[#1865F2]" />
        <span className="h-4 w-1.5 bg-[#1865F2]" />
        <span className="h-6 w-1.5 bg-[#1865F2]" />
      </span>
      Unnati
    </button>
  );
}

export default function EducatorRegistration({ navigate, onRegistered }) {
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = (event) => {
    event.preventDefault();
    if (!name.trim() || !focus.trim() || !password) {
      setError(
        "Enter an educator name, class/subject focus, and password to continue.",
      );
      return;
    }

    const educator = createEducator({ name, focus, password });
    onRegistered(educator);
    navigate("landing", { role: "tutor" });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="border-b border-[#E5E7EB] bg-white">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8"
          aria-label="Main navigation"
        >
          <Logo onClick={() => navigate("landing")} />
          <button
            type="button"
            className="min-h-11 rounded-lg px-3 text-sm font-semibold text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#1865F2]"
            onClick={() => navigate("landing", { role: "tutor" })}
          >
            Back to educators
          </button>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl justify-center px-4 py-12 sm:px-8 sm:py-20">
        <section className="w-full max-w-lg rounded-lg border border-[#E5E7EB] bg-white p-6 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1865F2]">
            New educator
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Create your educator space.
          </h1>
          <p className="mt-4 leading-7 text-[#4B5563]">
            Set up a private learning space for your students.
          </p>

          <form className="mt-8" onSubmit={register}>
            <label
              className="block text-sm font-semibold text-[#111827]"
              htmlFor="educator-name"
            >
              Educator name
            </label>
            <input
              id="educator-name"
              name="educator-name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              className="mt-2 min-h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-base text-[#111827] outline-none focus:border-[#1865F2] focus:ring-2 focus:ring-[#1865F2]/20"
              autoComplete="name"
              required
            />
            <label
              className="mt-5 block text-sm font-semibold text-[#111827]"
              htmlFor="educator-focus"
            >
              Class/Subject Focus
            </label>
            <input
              id="educator-focus"
              name="educator-focus"
              value={focus}
              onChange={(event) => {
                setFocus(event.target.value);
                setError("");
              }}
              placeholder="e.g., Class 12 Physics or All Subjects"
              className="mt-2 min-h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-base text-[#111827] outline-none focus:border-[#1865F2] focus:ring-2 focus:ring-[#1865F2]/20"
              required
            />
            <label
              className="mt-5 block text-sm font-semibold text-[#111827]"
              htmlFor="educator-password"
            >
              Password
            </label>
            <input
              id="educator-password"
              name="educator-password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              className="mt-2 min-h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-base text-[#111827] outline-none focus:border-[#1865F2] focus:ring-2 focus:ring-[#1865F2]/20"
              autoComplete="new-password"
              required
            />
            {error && (
              <p
                className="mt-3 text-sm font-semibold text-[#C2410C]"
                role="alert"
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              className="mt-6 min-h-12 w-full rounded-lg bg-[#1865F2] px-6 font-semibold text-white hover:bg-[#0B58CA]"
            >
              Create educator space
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
