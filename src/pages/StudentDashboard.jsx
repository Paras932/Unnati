import {
  getAssignmentsForStudent,
  getAttemptsForStudent,
  getDbSnapshot,
} from "../data/mockDb";

export default function StudentDashboard({ navigate }) {
  const db = getDbSnapshot();
  const student = db.students[0];
  const assignments = getAssignmentsForStudent(student.id);
  const attempts = getAttemptsForStudent(student.id).sort(
    (a, b) => new Date(b.completedAt) - new Date(a.completedAt),
  );
  const playableAssignments = assignments.filter(
    (assignment) => assignment.questionSet?.questions.length > 0,
  );
  const startAssignment = playableAssignments[playableAssignments.length - 1];
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
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#4B5563] sm:inline">
              Aarav Sharma
            </span>
            <button
              type="button"
              className="min-h-11 rounded-lg border border-[#E5E7EB] px-3 text-sm font-semibold text-[#4B5563]"
              onClick={() => navigate("landing")}
            >
              Exit
            </button>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
        <p className="text-sm font-semibold text-[#1865F2]">
          Student dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827]">
          Ready to keep learning, Aarav?
        </h1>
        <p className="mt-3 text-[#4B5563]">
          Your practice space with Kuldeep Verma · Class 10 Mathematics
        </p>
        <section className="mt-8 rounded-lg border border-[#1865F2] bg-white p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-bold text-[#C2410C]">
                Assigned practice
              </span>
              <h2 className="mt-4 text-2xl font-bold text-[#111827]">
                {startAssignment?.questionSet?.title ||
                  "Trigonometry Practice Set 1"}
              </h2>
              <p className="mt-2 text-[#4B5563]">
                {startAssignment?.questionSet?.questions.length || 10} questions
                · {startAssignment?.questionSet?.durationMinutes || 25} minutes
                · {startAssignment?.questionSet?.sectionId || "trigonometry"}
              </p>
            </div>
            <button
              type="button"
              className="min-h-12 rounded-lg bg-[#1865F2] px-6 font-semibold text-white hover:bg-[#0B58CA]"
              onClick={() => startAssignment && navigate("practice")}
            >
              Start practice
            </button>
          </div>
        </section>
        <section className="mt-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#111827]">
                Completed practice
              </h2>
              <p className="mt-1 text-sm text-[#4B5563]">
                Your latest results and topic signals
              </p>
            </div>
            <span className="text-sm font-semibold text-[#4B5563]">
              {attempts.length} records
            </span>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {attempts.map((attempt) => (
              <article
                key={attempt.id}
                className="rounded-lg border border-[#E5E7EB] bg-white p-5"
              >
                <p className="text-sm font-semibold text-[#4B5563]">
                  {db.sections.find((section) =>
                    attempt.questionSetId.startsWith(section.id),
                  )?.name || "Mathematics"}
                </p>
                <h3 className="mt-2 font-bold text-[#111827]">
                  Practice completed
                </h3>
                <p className="mt-4 text-2xl font-bold text-[#008537]">
                  {attempt.accuracyPct}%
                </p>
                <p className="mt-1 text-sm text-[#4B5563]">
                  {attempt.scoreCorrect}/{attempt.scoreTotal} correct
                </p>
                <p className="mt-4 text-xs font-semibold text-[#C2410C]">
                  Needs practice: {attempt.weakTopic}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
