import { useState } from "react";
import {
  assignTargetedPractice,
  getAttemptsForStudent,
  getDbSnapshot,
} from "../data/mockDb";

export default function TutorStudentReport({ navigate, studentId }) {
  const db = getDbSnapshot();
  const student =
    db.students.find((item) => item.id === studentId) || db.students[0];
  const attempts = getAttemptsForStudent(student.id).sort(
    (a, b) => new Date(b.completedAt) - new Date(a.completedAt),
  );
  const latest = attempts[0];
  const [assigned, setAssigned] = useState(false);
  const assignPractice = () => {
    assignTargetedPractice({
      tutorId: db.tutor.id,
      studentId: student.id,
      questionSetId: "trigonometry-set-1",
    });
    setAssigned(true);
  };
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="border-b border-[#E5E7EB] bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <button
            type="button"
            className="text-xl font-bold tracking-tight text-[#1865F2]"
            onClick={() => navigate("tutor-dashboard")}
          >
            Unnati
          </button>
          <button
            type="button"
            className="min-h-11 rounded-lg px-3 text-sm font-semibold text-[#4B5563]"
            onClick={() => navigate("tutor-dashboard")}
          >
            Back to dashboard
          </button>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
        <button
          type="button"
          className="text-sm font-semibold text-[#1865F2]"
          onClick={() => navigate("tutor-dashboard")}
        >
          ← All students
        </button>
        <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-[#1865F2]">
              Student report
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827]">
              {student.name}
            </h1>
            <p className="mt-2 text-[#4B5563]">
              Class 10 · Mathematics · {attempts.length} diagnostic records
            </p>
          </div>
          <span
            className={`rounded-full px-4 py-2 text-sm font-bold ${student.needsSupport ? "bg-[#FEF3C7] text-[#C2410C]" : "bg-[#E6F4EA] text-[#008537]"}`}
          >
            {student.needsSupport ? "Needs support" : "On track"}
          </span>
        </div>
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-5">
            <p className="text-sm text-[#4B5563]">Latest overall score</p>
            <p className="mt-2 text-3xl font-bold text-[#111827]">
              {student.latestOverallScorePct}%
            </p>
          </div>
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-5">
            <p className="text-sm text-[#4B5563]">Latest accuracy</p>
            <p className="mt-2 text-3xl font-bold text-[#111827]">
              {latest?.accuracyPct || 0}%
            </p>
          </div>
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-5">
            <p className="text-sm text-[#4B5563]">Questions attempted</p>
            <p className="mt-2 text-3xl font-bold text-[#111827]">
              {attempts.reduce(
                (total, attempt) => total + attempt.scoreTotal,
                0,
              )}
            </p>
          </div>
        </section>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold text-[#111827]">
              Topic diagnosis
            </h2>
            <p className="mt-1 text-sm text-[#4B5563]">
              The latest seeded performance signals for {student.name}.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-[#E6F4EA] p-5">
                <p className="text-xs font-bold uppercase text-[#008537]">
                  Strongest topic
                </p>
                <p className="mt-2 font-bold text-[#111827]">
                  {latest?.strengthTopic}
                </p>
              </div>
              <div className="rounded-lg bg-[#FEF3C7] p-5">
                <p className="text-xs font-bold uppercase text-[#C2410C]">
                  Needs practice
                </p>
                <p className="mt-2 font-bold text-[#111827]">
                  {latest?.weakTopic}
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {attempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 text-sm"
                >
                  <span className="text-[#4B5563]">
                    {
                      db.sections.find((section) =>
                        attempt.questionSetId.startsWith(section.id),
                      )?.name
                    }{" "}
                    diagnostic
                  </span>
                  <span className="font-bold text-[#111827]">
                    {attempt.accuracyPct}%
                  </span>
                </div>
              ))}
            </div>
          </section>
          <aside className="rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-7">
            <p className="text-sm font-semibold text-[#C2410C]">
              Recommended action
            </p>
            <h2 className="mt-2 text-xl font-bold text-[#111827]">
              Assign targeted {latest?.weakTopic || "practice"} practice
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#4B5563]">
              A focused set gives {student.name} another chance to strengthen
              the flagged topic.
            </p>
            {assigned ? (
              <p className="mt-6 rounded-lg bg-[#E6F4EA] p-4 text-sm font-bold text-[#008537]">
                Targeted practice assigned to {student.name}.
              </p>
            ) : (
              <button
                type="button"
                className="mt-6 min-h-12 w-full rounded-lg bg-[#1865F2] px-5 font-semibold text-white"
                onClick={assignPractice}
              >
                Assign targeted practice
              </button>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
