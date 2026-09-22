import { useState } from "react";
import { createAssignment, getDbSnapshot } from "../data/mockDb";

export default function CreateAssignment({ navigate }) {
  const db = getDbSnapshot();
  const [sectionId, setSectionId] = useState("trigonometry");
  const [studentId, setStudentId] = useState("aarav-sharma");
  const selectedSet = db.questionSets.find(
    (set) => set.sectionId === sectionId && set.questions.length > 0,
  );
  const section = db.sections.find((item) => item.id === sectionId);

  const submitAssignment = (event) => {
    event.preventDefault();
    createAssignment({
      questionSetId: selectedSet.id,
      tutorId: db.tutor.id,
      studentIds: [studentId],
    });
    navigate("tutor-dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="border-b border-[#E5E7EB] bg-white">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8"
          aria-label="Assignment navigation"
        >
          <button
            type="button"
            className="text-xl font-bold tracking-tight text-[#1865F2]"
            onClick={() => navigate("tutor-dashboard")}
          >
            Unnati
          </button>
          <button
            type="button"
            className="min-h-11 rounded-lg px-3 text-sm font-semibold text-[#4B5563] hover:bg-white hover:text-[#1865F2]"
            onClick={() => navigate("tutor-dashboard")}
          >
            Back to dashboard
          </button>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
        <p className="text-sm font-semibold text-[#1865F2]">Question bank</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
          Create an assignment
        </h1>
        <p className="mt-3 max-w-2xl text-[#4B5563]">
          Choose a chapter and a student. Questions are pulled from
          Unnati&apos;s shared CBSE Class 10 Mathematics bank.
        </p>
        <form
          className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]"
          onSubmit={submitAssignment}
        >
          <section className="rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold text-[#111827]">
              Assignment details
            </h2>
            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="chapter"
                  className="block text-sm font-semibold text-[#111827]"
                >
                  Chapter
                </label>
                <select
                  id="chapter"
                  value={sectionId}
                  onChange={(event) => setSectionId(event.target.value)}
                  className="mt-2 min-h-12 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-[#111827] outline-none focus:border-[#1865F2]"
                >
                  {db.sections.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="student"
                  className="block text-sm font-semibold text-[#111827]"
                >
                  Assign to
                </label>
                <select
                  id="student"
                  value={studentId}
                  onChange={(event) => setStudentId(event.target.value)}
                  className="mt-2 min-h-12 w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-[#111827] outline-none focus:border-[#1865F2]"
                >
                  {db.students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 min-h-12 w-full rounded-lg bg-[#1865F2] px-5 font-semibold text-white hover:bg-[#0B58CA]"
            >
              Create and share assignment
            </button>
          </section>
          <aside className="rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-7">
            <p className="text-sm font-semibold text-[#4B5563]">Set preview</p>
            <h2 className="mt-2 text-2xl font-bold text-[#111827]">
              {selectedSet.title}
            </h2>
            <div className="mt-5 space-y-3 text-sm text-[#4B5563]">
              <p>
                <strong className="text-[#111827]">
                  {selectedSet.questions.length}
                </strong>{" "}
                CBSE-style questions
              </p>
              <p>
                <strong className="text-[#111827]">
                  {selectedSet.durationMinutes} minutes
                </strong>{" "}
                suggested time
              </p>
              <p>
                <strong className="text-[#111827]">
                  {section.classAveragePct}%
                </strong>{" "}
                current class average
              </p>
            </div>
            <div className="mt-6 border-t border-[#E5E7EB] pt-5">
              <p className="text-sm leading-6 text-[#4B5563]">
                Every question is aligned to the Class 10 NCERT curriculum and
                ready to assign. You do not need to author content.
              </p>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
}
