import { useState } from "react";
import {
  getAttemptsForStudent,
  getDbSnapshot,
  getPendingAssignments,
} from "../data/mockDb";

export default function StudentDashboard({ navigate, studentId }) {
  const db = getDbSnapshot();
  const student =
    db.students.find((item) => item.id === studentId) || db.students[0];
  const attempts = getAttemptsForStudent(student.id).sort(
    (a, b) => new Date(b.completedAt) - new Date(a.completedAt),
  );
  const pendingAssignments = getPendingAssignments().filter(
    (assignment) => assignment.studentId === student.id,
  );
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const getReviewQuestions = (attempt) => {
    const sectionId = attempt.questionSetId.split("-")[0];
    const questionSet = db.questionSets.find(
      (set) => set.id === `${sectionId}-set-1`,
    );
    return (questionSet?.questions || [])
      .slice(0, 10)
      .map((question, index) => {
        const selectedOptionIndex =
          index === 1
            ? (question.correctOptionIndex + 1) % question.options.length
            : question.correctOptionIndex;
        return { ...question, selectedOptionIndex };
      });
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
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#4B5563] sm:inline">
              {student.name}
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
          Ready to keep learning, {student.name}?
        </h1>
        <p className="mt-3 text-[#4B5563]">
          Your practice space with Kuldeep Verma · Class 10 Mathematics
        </p>
        <section className="mt-8 rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-7">
          <span className="rounded-full bg-[#E6F4EA] px-3 py-1 text-xs font-bold text-[#008537]">
            Assigned practice
          </span>
          {pendingAssignments.length === 0 ? (
            <>
              <h2 className="mt-4 text-2xl font-bold text-[#111827]">
                No pending assignments. You are all caught up!
              </h2>
              <p className="mt-2 text-[#4B5563]">
                New practice will appear here when Kuldeep Verma assigns it.
              </p>
            </>
          ) : (
            <div className="mt-5 space-y-3">
              {pendingAssignments.map((assignment) => (
                <article
                  key={assignment.id}
                  className="border-l-4 border-[#1865F2] bg-[#F9FAFB] p-4"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <h2 className="text-xl font-bold text-[#111827]">
                        {assignment.chapter} practice
                      </h2>
                      <p className="mt-2 text-sm text-[#4B5563]">
                        Assigned by your educator · Ready to start
                      </p>
                    </div>
                    <button
                      type="button"
                      className="min-h-11 shrink-0 rounded-lg bg-[#1865F2] px-5 text-sm font-semibold text-white hover:bg-[#0B58CA]"
                      onClick={() =>
                        navigate("practice", {
                          studentId: student.id,
                          assignmentId: assignment.id,
                        })
                      }
                    >
                      Start Practice
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
        <section className="mt-8 rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-7">
          <h2 className="text-xl font-bold text-[#111827]">
            My Learning Materials
          </h2>
          <article className="mt-5 flex flex-col justify-between gap-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-bold text-[#111827]">
                Class 10 Mathematics Question Bank &amp; PYQs
              </h3>
              <p className="mt-1 text-sm text-[#4B5563]">
                Board-focused questions for revision and practice.
              </p>
            </div>
            <a
              href="/Official_CBSE_question_bank_maths.pdf"
              download="Class_10_Maths_Question_Bank.pdf"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1865F2] px-5 text-sm font-semibold text-white hover:bg-[#0B58CA]"
            >
              Download PDF
            </a>
          </article>
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
              <button
                key={attempt.id}
                type="button"
                className="rounded-lg border border-[#E5E7EB] bg-white p-5 text-left hover:border-[#1865F2]"
                onClick={() => setSelectedAttempt(attempt)}
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
              </button>
            ))}
          </div>
        </section>
        {selectedAttempt && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#111827]/50 px-4 py-8">
            <section
              className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="review-title"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#1865F2]">
                    Test review
                  </p>
                  <h2
                    id="review-title"
                    className="mt-1 text-2xl font-bold text-[#111827]"
                  >
                    {
                      db.sections.find((section) =>
                        selectedAttempt.questionSetId.startsWith(section.id),
                      )?.name
                    }{" "}
                    questions
                  </h2>
                </div>
                <button
                  type="button"
                  className="text-sm font-bold text-[#4B5563]"
                  onClick={() => setSelectedAttempt(null)}
                >
                  Close
                </button>
              </div>
              <div className="mt-6 space-y-4">
                {getReviewQuestions(selectedAttempt).map((question, index) => {
                  const isCorrect =
                    question.selectedOptionIndex ===
                    question.correctOptionIndex;
                  return (
                    <div
                      key={question.id}
                      className="rounded-lg border border-[#E5E7EB] p-4"
                    >
                      <p className="font-semibold text-[#111827]">
                        {index + 1}. {question.prompt}
                      </p>
                      <p className="mt-3 text-sm text-[#4B5563]">
                        Your answer:{" "}
                        <span className="font-semibold text-[#111827]">
                          {question.options[question.selectedOptionIndex]}
                        </span>
                      </p>
                      <p
                        className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${isCorrect ? "bg-[#E6F4EA] text-[#008537]" : "bg-[#FEE2E2] text-[#B91C1C]"}`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </p>
                      {!isCorrect && (
                        <p className="mt-2 text-sm text-[#4B5563]">
                          Correct answer:{" "}
                          <span className="font-semibold text-[#111827]">
                            {question.options[question.correctOptionIndex]}
                          </span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
