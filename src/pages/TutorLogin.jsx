import { useEffect, useState } from "react";
import { getTutorById } from "../data/mockDb";

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

export default function TutorLogin({ navigate, tutorId }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isEntering, setIsEntering] = useState(false);
  const tutor = getTutorById(tutorId);
  const isNewEducator = Boolean(tutor.isNew);

  useEffect(() => {
    if (!isEntering) return undefined;
    const transition = setTimeout(
      () => navigate("tutor-dashboard", { tutorId: tutor.id }),
      900,
    );
    return () => clearTimeout(transition);
  }, [isEntering, navigate, tutor.id]);

  const enterSpace = (event) => {
    event.preventDefault();
    const isValid = isNewEducator
      ? code === tutor.password
      : code.trim().toUpperCase() === "KULDEEP10";
    if (!isValid) {
      setError(
        isNewEducator
          ? "That password does not match this educator space."
          : "That tutor code does not match the demo space.",
      );
      return;
    }
    setIsEntering(true);
  };

  if (isEntering) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1865F2]">
            Unnati
          </p>
          <h1 className="mt-4 text-3xl font-bold text-[#111827]">
            Welcome {tutor.greetingName || tutor.name}...
          </h1>
          <p className="mt-3 text-[#4B5563]">Opening your educator space</p>
        </div>
      </div>
    );
  }

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
            onClick={() => navigate("landing")}
          >
            Back to home
          </button>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl justify-center px-4 py-12 sm:px-8 sm:py-20">
        <section className="w-full max-w-lg rounded-lg border border-[#E5E7EB] bg-white p-6 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1865F2]">
            Tutor space
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Welcome back, {tutor.name}.
          </h1>
          <p className="mt-4 leading-7 text-[#4B5563]">
            Enter your {isNewEducator ? "password" : "tutor code"} to open your
            Class {tutor.classLevel} {tutor.subject} space.
          </p>

          <form className="mt-8" onSubmit={enterSpace}>
            <label
              className="block text-sm font-semibold text-[#111827]"
              htmlFor="tutor-code"
            >
              {isNewEducator ? "Password" : "Tutor code"}
            </label>
            <input
              id="tutor-code"
              name="tutor-credential"
              type={isNewEducator ? "password" : "text"}
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setError("");
              }}
              className="mt-2 min-h-12 w-full rounded-lg border border-[#E5E7EB] px-4 text-base text-[#111827] outline-none focus:border-[#1865F2] focus:ring-2 focus:ring-[#1865F2]/20"
              autoComplete={isNewEducator ? "current-password" : "off"}
            />
            {error && (
              <p
                className="mt-2 text-sm font-semibold text-[#C2410C]"
                role="alert"
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              className="mt-6 min-h-12 w-full rounded-lg bg-[#1865F2] px-6 font-semibold text-white hover:bg-[#0B58CA]"
            >
              Enter {tutor.name}&apos;s space
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
