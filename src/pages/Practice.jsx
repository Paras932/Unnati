import { useState } from "react";
import {
  getDbSnapshot,
  getPendingAssignment,
  getPendingAssignments,
  removePendingAssignment,
  submitAttempt,
} from "../data/mockDb";

export default function Practice({ navigate, studentId, assignmentId }) {
  const db = getDbSnapshot();
  const assignment =
    getPendingAssignment(assignmentId) ||
    getPendingAssignments().find((item) => item.studentId === studentId);
  const questionSet = db.questionSets.find(
    (set) =>
      set.sectionId === assignment?.questionSetId?.split("-")[0] &&
      set.questions.length > 0,
  );
  const questions = (questionSet?.questions || []).slice(0, 10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const question = questions[currentIndex];
  const selectAnswer = (index) =>
    setAnswers((current) => ({ ...current, [question.id]: index }));
  const finish = () => {
    const answerRows = questions.map((item) => ({
      questionId: item.id,
      selectedOptionIndex: answers[item.id] ?? -1,
    }));
    const scoreCorrect = answerRows.filter(
      (answer, index) =>
        answer.selectedOptionIndex === questions[index].correctOptionIndex,
    ).length;
    const topicStats = {};
    questions.forEach((item, index) => {
      if (!topicStats[item.topicTag])
        topicStats[item.topicTag] = { correct: 0, total: 0 };
      topicStats[item.topicTag].total += 1;
      if (answerRows[index].selectedOptionIndex === item.correctOptionIndex)
        topicStats[item.topicTag].correct += 1;
    });
    const topics = Object.entries(topicStats).sort(
      (a, b) => b[1].correct / b[1].total - a[1].correct / a[1].total,
    );
    submitAttempt({
      assignmentId: assignment.id,
      studentId: assignment.studentId,
      questionSetId: questionSet.id,
      answers: answerRows,
      scoreCorrect,
      scoreTotal: questions.length,
      accuracyPct: Math.round((scoreCorrect / questions.length) * 100),
      strengthTopic: topics[0]?.[0] || "Practice fundamentals",
      weakTopic: topics.at(-1)?.[0] || "Review the full set",
      reportSharedWithTutor: true,
    });
    removePendingAssignment(assignment.id);
    navigate("student-dashboard", { studentId: assignment.studentId });
  };
  if (!question)
    return <div className="p-8">No playable assignment found.</div>;
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="border-b border-[#E5E7EB] bg-white">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-8">
          <span className="text-xl font-bold tracking-tight text-[#1865F2]">
            Unnati
          </span>
          <span className="text-sm font-semibold text-[#4B5563]">
            {assignment.chapter} Practice
          </span>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="flex items-center justify-between text-sm font-semibold text-[#4B5563]">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span>{Object.keys(answers).length} answered</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-[#E5E7EB]">
          <div
            className="h-2 rounded-full bg-[#1865F2]"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <section className="mt-8 rounded-lg border border-[#E5E7EB] bg-white p-5 sm:p-8">
          <p className="text-sm font-semibold text-[#1865F2]">
            {question.topicTag}
          </p>
          <h1 className="mt-4 text-2xl font-bold leading-snug text-[#111827]">
            {question.prompt}
          </h1>
          <div className="mt-8 space-y-3">
            {question.options.map((option, index) => (
              <button
                key={option}
                type="button"
                className={`flex min-h-14 w-full items-center gap-4 rounded-lg border px-4 text-left font-semibold ${answers[question.id] === index ? "border-[#1865F2] bg-[#E6F4EA] text-[#111827]" : "border-[#E5E7EB] text-[#4B5563] hover:border-[#1865F2]"}`}
                onClick={() => selectAnswer(index)}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F9FAFB] text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </section>
        <div className="mt-6 flex justify-between gap-3">
          <button
            type="button"
            className="min-h-12 rounded-lg border border-[#1865F2] px-5 font-semibold text-[#1865F2] disabled:opacity-40"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((index) => index - 1)}
          >
            Previous
          </button>
          {currentIndex === questions.length - 1 ? (
            <button
              type="button"
              className="min-h-12 rounded-lg bg-[#1865F2] px-5 font-semibold text-white hover:bg-[#0B58CA]"
              onClick={finish}
            >
              Submit practice
            </button>
          ) : (
            <button
              type="button"
              className="min-h-12 rounded-lg bg-[#1865F2] px-5 font-semibold text-white hover:bg-[#0B58CA]"
              onClick={() => setCurrentIndex((index) => index + 1)}
            >
              Next
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
