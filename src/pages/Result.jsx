export default function Result({ navigate, attempt }) {
  const result = attempt || {
    scoreCorrect: 0,
    scoreTotal: 0,
    accuracyPct: 0,
    strengthTopic: "Practice fundamentals",
    weakTopic: "Review the full set",
  };
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="border-b border-[#E5E7EB] bg-white">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-8">
          <span className="text-xl font-bold tracking-tight text-[#1865F2]">
            Unnati
          </span>
          <span className="text-sm font-semibold text-[#4B5563]">
            Practice result
          </span>
        </nav>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
        <section className="rounded-lg border border-[#E5E7EB] bg-white p-6 text-center sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#008537]">
            Completed
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#111827]">
            Your result is ready
          </h1>
          <div className="mx-auto mt-8 flex h-32 w-32 flex-col items-center justify-center rounded-full border-8 border-[#E6F4EA]">
            <span className="text-3xl font-bold text-[#008537]">
              {result.accuracyPct}%
            </span>
            <span className="text-sm text-[#4B5563]">
              {result.scoreCorrect}/{result.scoreTotal}
            </span>
          </div>
          <p className="mt-6 text-[#4B5563]">
            Your result has been shared with your tutor.
          </p>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded-lg bg-[#E6F4EA] p-4">
              <p className="text-xs font-bold uppercase text-[#008537]">
                Strength
              </p>
              <p className="mt-2 font-bold text-[#111827]">
                {result.strengthTopic}
              </p>
            </div>
            <div className="rounded-lg bg-[#FEF3C7] p-4">
              <p className="text-xs font-bold uppercase text-[#C2410C]">
                Needs practice
              </p>
              <p className="mt-2 font-bold text-[#111827]">
                {result.weakTopic}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="mt-8 min-h-12 rounded-lg bg-[#1865F2] px-6 font-semibold text-white"
            onClick={() => navigate("student-dashboard")}
          >
            Back to student dashboard
          </button>
        </section>
      </main>
    </div>
  );
}
