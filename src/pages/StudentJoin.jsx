import { useState } from "react";
import { getStudents } from "../data/mockDb";

export default function StudentJoin({ navigate }) {
  const students = getStudents();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const joinSpace = (event) => {
    event.preventDefault();
    const expectedPassword = `${selectedStudent.id.split("-")[0].toUpperCase()}10`;
    if (code.trim().toUpperCase() !== expectedPassword) {
      setError("That student access password does not match this space.");
      return;
    }
    navigate("student-dashboard", { studentId: selectedStudent.id });
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
          {!selectedStudent ? (
            <>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#111827]">
                Select your name
              </h1>
              <p className="mt-4 leading-7 text-[#4B5563]">
                Choose your student profile to continue to the Student Portal.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {students.map((student) => (
                  <button
                    key={student.id}
                    type="button"
                    className="flex min-h-14 items-center gap-3 rounded-lg border border-[#E5E7EB] px-4 text-left font-semibold text-[#111827] hover:border-[#1865F2] hover:text-[#1865F2]"
                    onClick={() => {
                      setSelectedStudent(student);
                      setError("");
                    }}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6F4EA] text-xs font-bold text-[#008537]">
                      {student.avatarInitials}
                    </span>
                    {student.name}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                className="text-sm font-bold text-[#1865F2]"
                onClick={() => {
                  setSelectedStudent(null);
                  setCode("");
                  setError("");
                }}
              >
                ← Choose a different student
              </button>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#111827]">
                Welcome, {selectedStudent.name}
              </h1>
              <p className="mt-4 leading-7 text-[#4B5563]">
                Enter your student access password to open your learning space.
              </p>
              <form className="mt-8" onSubmit={joinSpace}>
                <label
                  htmlFor="join-code"
                  className="block text-sm font-semibold text-[#111827]"
                >
                  Student access password
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
                  Enter Student Portal
                </button>
              </form>
            </>
          )}
          <div className="mt-8 border-l-4 border-[#008537] bg-[#E6F4EA] p-4 text-sm leading-6 text-[#008537]">
            You are joining Kuldeep Verma&apos;s Class 10 Mathematics space.
          </div>
        </section>
      </main>
    </div>
  );
}
