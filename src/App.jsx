import { useState } from "react";
import "./App.css";
import TutorDashboard from "./pages/TutorDashboard";
import TutorLogin from "./pages/TutorLogin";
import CreateAssignment from "./pages/CreateAssignment";
import StudentJoin from "./pages/StudentJoin";
import StudentDashboard from "./pages/StudentDashboard";
import Practice from "./pages/Practice";
import Result from "./pages/Result";
import TutorStudentReport from "./pages/TutorStudentReport";
import QuestionBankRepository from "./pages/QuestionBankRepository";

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

function LandingPage({ navigate }) {
  const [notice, setNotice] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#E5E7EB]">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8"
          aria-label="Main navigation"
        >
          <Logo
            onClick={() =>
              setNotice("You are already on the Unnati home page.")
            }
          />
          <button
            type="button"
            className="min-h-11 rounded-lg px-3 text-sm font-semibold text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#1865F2]"
            onClick={() =>
              setNotice("About Unnati is the final screen in this demo build.")
            }
          >
            How it works
          </button>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20 lg:pb-24">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-[#1865F2]">
              A better way to see learning
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#111827] sm:text-6xl">
              The practice layer for local tutors.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4B5563]">
              Unnati helps tutors assign curriculum-aligned practice, understand
              what each student needs, and keep every learner moving forward.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="min-h-12 rounded-lg bg-[#1865F2] px-6 font-semibold text-white hover:bg-[#0B58CA]"
                onClick={() => navigate("tutor-login")}
              >
                Tutor Login
              </button>
              <button
                type="button"
                className="min-h-12 rounded-lg border border-[#1865F2] px-6 font-semibold text-[#1865F2] hover:bg-[#F9FAFB]"
                onClick={() => navigate("student-join")}
              >
                Student Portal
              </button>
            </div>
            {notice && (
              <p
                className="mt-5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-sm text-[#4B5563]"
                role="status"
              >
                {notice}
              </p>
            )}
          </div>

          <div className="border-l-4 border-[#1865F2] bg-[#F9FAFB] p-6 sm:p-8">
            <p className="text-sm font-semibold text-[#4B5563]">
              For the tutor who knows every student by name
            </p>
            <p className="mt-4 text-2xl font-bold leading-snug text-[#111827]">
              Less time checking worksheets. More time helping the right
              learner.
            </p>
            <div className="mt-8 space-y-5 border-t border-[#E5E7EB] pt-6">
              <div className="flex gap-3">
                <span className="mt-1 text-[#008537]" aria-hidden="true">
                  &#10003;
                </span>
                <p className="text-sm leading-6 text-[#4B5563]">
                  Ready-to-assign practice from a shared question bank
                </p>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 text-[#008537]" aria-hidden="true">
                  &#10003;
                </span>
                <p className="text-sm leading-6 text-[#4B5563]">
                  Immediate scores and topic-level signals
                </p>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 text-[#008537]" aria-hidden="true">
                  &#10003;
                </span>
                <p className="text-sm leading-6 text-[#4B5563]">
                  A private digital space owned by the tutor
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#E5E7EB] bg-[#F9FAFB]">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-8">
            <div>
              <p className="text-3xl font-bold text-[#111827]">1:1</p>
              <p className="mt-2 text-sm text-[#4B5563]">
                Tutor-owned learning spaces
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#111827]">Auto</p>
              <p className="mt-2 text-sm text-[#4B5563]">
                Graded practice and reports
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#111827]">Local</p>
              <p className="mt-2 text-sm text-[#4B5563]">
                Simple enough for any tutor
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-sm text-[#4B5563] sm:px-8">
        Empowering local tutors. Enabling better learning.
      </footer>
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [viewParams, setViewParams] = useState({});
  const navigate = (view, params = {}) => {
    setViewParams(params);
    setCurrentView(view);
  };

  if (currentView === "tutor-login") return <TutorLogin navigate={navigate} />;
  if (currentView === "tutor-dashboard")
    return <TutorDashboard navigate={navigate} />;
  if (currentView === "create-assignment")
    return <CreateAssignment navigate={navigate} />;
  if (currentView === "student-join")
    return <StudentJoin navigate={navigate} />;
  if (currentView === "student-dashboard")
    return <StudentDashboard navigate={navigate} />;
  if (currentView === "practice") return <Practice navigate={navigate} />;
  if (currentView === "result")
    return <Result navigate={navigate} attempt={viewParams.attempt} />;
  if (currentView === "student-report")
    return (
      <TutorStudentReport
        navigate={navigate}
        studentId={viewParams.studentId}
      />
    );
  if (currentView === "question-bank")
    return <QuestionBankRepository navigate={navigate} />;
  return <LandingPage navigate={navigate} />;
}

export default App;
