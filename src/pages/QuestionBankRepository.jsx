import { useState } from "react";
import { getDbSnapshot } from "../data/mockDb";

export default function QuestionBankRepository({ navigate }) {
  const db = getDbSnapshot();
  const [activeSection, setActiveSection] = useState("all");
  const visibleSections =
    activeSection === "all"
      ? db.sections
      : db.sections.filter((section) => section.id === activeSection);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="border-b border-[#E5E7EB] bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8"
          aria-label="Question bank navigation"
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
            className="min-h-11 rounded-lg px-3 text-sm font-semibold text-[#4B5563] hover:text-[#1865F2]"
            onClick={() => navigate("tutor-dashboard")}
          >
            Back to dashboard
          </button>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-[#1865F2]">
              Shared curriculum library
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
              Question Bank Repository
            </h1>
            <p className="mt-3 max-w-2xl text-[#4B5563]">
              90 CBSE Class 10 Mathematics MCQs, with 30 questions each across
              Algebra, Trigonometry, and Geometry.
            </p>
          </div>
          <button
            type="button"
            className="min-h-12 rounded-lg bg-[#1865F2] px-5 font-semibold text-white hover:bg-[#0B58CA]"
            onClick={() => navigate("create-assignment")}
          >
            Create assignment
          </button>
        </div>
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Question bank chapters"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeSection === "all"}
            className={`min-h-11 rounded-full px-4 text-sm font-semibold ${activeSection === "all" ? "bg-[#1865F2] text-white" : "border border-[#E5E7EB] bg-white text-[#4B5563]"}`}
            onClick={() => setActiveSection("all")}
          >
            All chapters · {db.sections.length * 30}
          </button>
          {db.sections.map((section) => (
            <button
              key={section.id}
              type="button"
              role="tab"
              aria-selected={activeSection === section.id}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold ${activeSection === section.id ? "bg-[#1865F2] text-white" : "border border-[#E5E7EB] bg-white text-[#4B5563]"}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.name} · 30
            </button>
          ))}
        </div>
        <div className="mt-8 space-y-8">
          {visibleSections.map((section) => {
            const questionSet = db.questionSets.find(
              (set) => set.sectionId === section.id && set.questions.length > 0,
            );
            return (
              <section
                key={section.id}
                className="rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#111827]">
                      {section.name}
                    </h2>
                    <p className="mt-1 text-sm text-[#4B5563]">
                      {questionSet.title} · {questionSet.questions.length}{" "}
                      questions
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${section.isWeakArea ? "bg-[#FEF3C7] text-[#C2410C]" : "bg-[#E6F4EA] text-[#008537]"}`}
                  >
                    {section.classAveragePct}% class average
                  </span>
                </div>
                <div className="mt-6 grid gap-3 lg:grid-cols-2">
                  {questionSet.questions.map((question, index) => (
                    <article
                      key={question.id}
                      className="rounded-lg border border-[#E5E7EB] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F9FAFB] text-xs font-bold text-[#4B5563]">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="font-semibold leading-6 text-[#111827]">
                            {question.prompt}
                          </p>
                          <p className="mt-2 text-xs font-semibold text-[#1865F2]">
                            {question.topicTag}
                          </p>
                          <ol className="mt-3 grid gap-1 text-sm text-[#4B5563] sm:grid-cols-2">
                            {question.options.map((option, optionIndex) => (
                              <li key={option}>
                                <span
                                  className={
                                    optionIndex === question.correctOptionIndex
                                      ? "font-bold text-[#008537]"
                                      : ""
                                  }
                                >
                                  {String.fromCharCode(65 + optionIndex)}.{" "}
                                  {option}
                                  {optionIndex === question.correctOptionIndex
                                    ? " ✓"
                                    : ""}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
