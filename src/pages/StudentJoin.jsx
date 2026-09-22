import { useState } from "react";
import { getTutor } from "../data/mockDb";

export default function StudentJoin({ navigate }) {
  const tutor = getTutor();
  const [code, setCode] = useState("KULDEEP10");
  const [error, setError] = useState("");
  const joinSpace = (event) => {
    event.preventDefault();
    if (code.trim().toUpperCase() !== tutor.tutorCode) {
      setError("We could not find a tutor space with that code.");
      return;
    }
    navigate("student-dashboard");
  };
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="border-b border-[#E5E7EB] bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
          <button
            type="button"
            className="text-xl font-bold tracking-tight text-[#1865F2]"
            onClick={() => navigate("landing")}
          >
            Unnati
          </button>
          <button
            type="button"
            className="min-h-11 rounded-lg px-3 text-sm font-semibold text-[#4B5563]"
            onClick={() => navigate("landing")}
          >
            Back to home
          </button>
        </nav>
      </header>
      <main className="mx-auto flex max-w-6xl justify-center px-4 py-12 sm:px-8 sm:py-20">
        <section className="w-full max-w-lg rounded-lg border border-[#E5E7EB] bg-white p-6 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1865F2]">
            Student Portal
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#111827]">
            Join your tutor&apos;s space
          </h1>
          <p className="mt-4 leading-7 text-[#4B5563]">
            Enter the code shared by your tutor to see your assignments and
            practice history.
          </p>
          <form className="mt-8" onSubmit={joinSpace}>
            <label
              htmlFor="join-code"
              className="block text-sm font-semibold text-[#111827]"
            >
              Tutor code
            </label>
            <input
              id="join-code"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                setError("");
              }}
              className="mt-2 min-h-12 w-full rounded-lg border border-[#E5E7EB] px-4 uppercase tracking-[0.12em] outline-none focus:border-[#1865F2]"
              autoComplete="off"
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
              Join learning space
            </button>
          </form>
          <div className="mt-8 border-l-4 border-[#008537] bg-[#E6F4EA] p-4 text-sm leading-6 text-[#008537]">
            You are joining Shobha Ma&apos;am&apos;s Class 10 Mathematics space.
          </div>
        </section>
      </main>
    </div>
  );
}
