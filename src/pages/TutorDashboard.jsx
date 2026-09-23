import { useMemo } from "react";
import {
  getAttempts,
  getDbSnapshot,
  getPendingAssignments,
  getTutorById,
} from "../data/mockDb";

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

function Metric({ label, value, detail }) {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-5">
      <p className="text-sm font-semibold text-[#4B5563]">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-[#111827]">
        {value}
      </p>
      <p className="mt-1 text-xs text-[#4B5563]">{detail}</p>
    </div>
  );
}

export default function TutorDashboard({ navigate, tutorId }) {
  const tutor = getTutorById(tutorId);
  const db = getDbSnapshot();
  const attempts = getAttempts();
  const pendingAssignments = getPendingAssignments().filter(
    (assignment) => assignment.educatorId === tutor.id,
  );
  const averageScore = Math.round(
    db.students.reduce(
      (total, student) => total + student.latestOverallScorePct,
      0,
    ) / db.students.length,
  );
  const needsSupport = db.students.filter(
    (student) => student.needsSupport,
  ).length;
  const recentAttempts = useMemo(
    () =>
      attempts
        .filter((attempt) => attempt.studentId !== "aarav-sharma")
        .slice(-6)
        .reverse(),
    [attempts],
  );

  if (tutor.isNew) {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <header className="border-b border-[#E5E7EB] bg-white">
          <nav
            className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8"
            aria-label="Tutor navigation"
          >
            <Logo onClick={() => navigate("tutor-dashboard", { tutorId })} />
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="hidden text-sm text-[#4B5563] sm:inline">
                {tutor.name}
              </span>
              <button
                type="button"
                className="min-h-11 rounded-lg border border-[#E5E7EB] px-3 text-sm font-semibold text-[#4B5563] hover:border-[#1865F2] hover:text-[#1865F2]"
                onClick={() => navigate("landing", { role: "tutor" })}
              >
                Exit
              </button>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10">
          <p className="text-sm font-semibold text-[#1865F2]">
            Tutor dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Welcome, {tutor.name}.
          </h1>
          <p className="mt-3 text-[#4B5563]">
            Your {tutor.classLevel} {tutor.subject} learning space is ready.
          </p>

          <section
            className="mt-8 grid gap-4 sm:grid-cols-3"
            aria-label="Class metrics"
          >
            <Metric
              label="Students"
              value="0"
              detail="No students have joined yet"
            />
            <Metric
              label="Digital products"
              value="0"
              detail="No digital products uploaded yet"
            />
            <Metric
              label="Pending assignments"
              value={pendingAssignments.length}
              detail="Currently shared"
            />
          </section>

          <section className="mt-8 rounded-lg border border-dashed border-[#9CA3AF] bg-white p-8 text-center sm:p-12">
            <h2 className="text-xl font-bold text-[#111827]">
              Your educator space is empty
            </h2>
            <p className="mx-auto mt-3 max-w-lg leading-7 text-[#4B5563]">
              Invite students or upload a digital product to start building your
              learning community.
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="border-b border-[#E5E7EB] bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8"
          aria-label="Tutor navigation"
        >
          <Logo onClick={() => navigate("tutor-dashboard")} />
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden text-sm text-[#4B5563] sm:inline">
              {tutor.name}
            </span>
            <button
              type="button"
              className="min-h-11 rounded-lg border border-[#E5E7EB] px-3 text-sm font-semibold text-[#4B5563] hover:border-[#1865F2] hover:text-[#1865F2]"
              onClick={() => navigate("landing")}
            >
              Exit
            </button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-[#1865F2]">
              Tutor dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
              Good evening, {tutor.greetingName || tutor.name}.
            </h1>
            <p className="mt-3 text-[#4B5563]">
              Here&apos;s how your Class {tutor.classLevel} {tutor.subject}{" "}
              batch is progressing.
            </p>
          </div>
          <button
            type="button"
            className="min-h-12 rounded-lg bg-[#1865F2] px-5 font-semibold text-white hover:bg-[#0B58CA]"
            onClick={() => navigate("create-assignment", { tutorId: tutor.id })}
          >
            + Create assignment
          </button>
        </div>

        <section
          className="mt-8 rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-7"
          aria-labelledby="digital-products-heading"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2
                id="digital-products-heading"
                className="text-xl font-bold text-[#111827]"
              >
                My Digital Products
              </h2>
              <p className="mt-1 text-sm text-[#4B5563]">
                Resources shared with your learning community
              </p>
            </div>
          </div>
          <article className="mt-6 flex flex-col justify-between gap-5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-lg font-bold text-[#111827]">
                Class 10 Mathematics Question Bank &amp; PYQs
              </p>
              <p className="mt-2 text-sm text-[#4B5563]">
                Downloadable practice material for board exam preparation
              </p>
              <p className="mt-3 text-xs font-bold text-[#008537]">
                10 Downloads
              </p>
            </div>
            <a
              href="/Official_CBSE_question_bank_maths.pdf"
              download
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1865F2] px-5 text-sm font-semibold text-white hover:bg-[#0B58CA]"
            >
              Download PDF
            </a>
          </article>
        </section>

        <section
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Class metrics"
        >
          <Metric
            label="Students"
            value={db.students.length}
            detail="In your learning space"
          />
          <Metric
            label="Class average"
            value={`${averageScore}%`}
            detail="Across recent practice"
          />
          <Metric
            label="Needs support"
            value={needsSupport}
            detail="Students to check in with"
          />
          <Metric
            label="Assignments"
            value={pendingAssignments.length}
            detail="Currently shared"
          />
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#111827]">
                  Class performance
                </h2>
                <p className="mt-1 text-sm text-[#4B5563]">
                  Average accuracy by chapter
                </p>
              </div>
              <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-bold text-[#C2410C]">
                1 weak area
              </span>
            </div>
            <div className="mt-8 space-y-6">
              {db.sections.map((section) => (
                <div key={section.id}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold text-[#111827]">
                      {section.name}
                    </span>
                    <span
                      className={
                        section.isWeakArea
                          ? "font-bold text-[#C2410C]"
                          : "font-semibold text-[#4B5563]"
                      }
                    >
                      {section.classAveragePct}%
                    </span>
                  </div>
                  <div
                    className="h-3 rounded-full bg-[#E5E7EB]"
                    role="progressbar"
                    aria-label={`${section.name} class average`}
                    aria-valuenow={section.classAveragePct}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className={`h-3 rounded-full ${section.isWeakArea ? "bg-[#C2410C]" : "bg-[#1865F2]"}`}
                      style={{ width: `${section.classAveragePct}%` }}
                    />
                  </div>
                  {section.isWeakArea && (
                    <p className="mt-2 text-xs font-semibold text-[#C2410C]">
                      Class weak area · consider targeted practice
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold text-[#111827]">
              Live assignment
            </h2>
            <p className="mt-1 text-sm text-[#4B5563]">
              Most recent shared practice
            </p>
            {pendingAssignments.length === 0 ? (
              <p className="mt-4 text-sm text-[#4B5563]">
                No active assignments currently shared.
              </p>
            ) : (
              <div className="mt-6 space-y-3">
                {pendingAssignments.map((assignment) => (
                  <article
                    key={assignment.id}
                    className="border-l-4 border-[#1865F2] bg-[#F9FAFB] p-4"
                  >
                    <p className="font-bold text-[#111827]">
                      {assignment.chapter} practice
                    </p>
                    <p className="mt-2 text-sm text-[#4B5563]">
                      Shared with {assignment.studentName}
                    </p>
                  </article>
                ))}
              </div>
            )}
            <button
              type="button"
              className="mt-5 min-h-11 w-full rounded-lg border border-[#1865F2] px-4 font-semibold text-[#1865F2] hover:bg-[#F9FAFB]"
              onClick={() => navigate("question-bank")}
            >
              Browse question bank
            </button>
          </section>
        </div>

        <section className="mt-8 rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#111827]">
                Your students
              </h2>
              <p className="mt-1 text-sm text-[#4B5563]">
                Latest performance across the batch
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {db.students.map((student) => (
              <button
                key={student.id}
                type="button"
                className="flex min-h-20 items-center gap-3 rounded-lg border border-[#E5E7EB] p-4 text-left hover:border-[#1865F2]"
                onClick={() =>
                  navigate("student-report", { studentId: student.id })
                }
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6F4EA] text-sm font-bold text-[#008537]">
                  {student.avatarInitials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-[#111827]">
                    {student.name}
                  </span>
                  <span
                    className={`mt-1 block text-xs font-semibold ${student.needsSupport ? "text-[#C2410C]" : "text-[#008537]"}`}
                  >
                    {student.latestOverallScorePct}% ·{" "}
                    {student.needsSupport ? "Needs support" : "On track"}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {recentAttempts.length > 0 && (
          <p className="mt-6 text-xs text-[#4B5563]">
            Latest diagnostic records are up to date from 3 recent attempts.
          </p>
        )}
      </main>
    </div>
  );
}
