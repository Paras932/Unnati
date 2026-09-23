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
import { getEducators } from "./data/mockDb";
import EducatorRegistration from "./pages/EducatorRegistration";

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

function LandingPage({ navigate, educators, initialRole }) {
  const [notice, setNotice] = useState("");
  const [selectedRole, setSelectedRole] = useState(initialRole || null);

  const selectRole = (role) => {
    setNotice("");
    setSelectedRole(role);
  };

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
          <span className="text-sm font-semibold text-[#4B5563]">
            Learning portal
          </span>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20 lg:pb-24">
          <div>
            {!selectedRole ? (
              <>
                <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-[#1865F2]">
                  Welcome to Unnati
                </p>
                <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#111827] sm:text-6xl">
                  How would you like to enter?
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#4B5563]">
                  Choose the learning space that matches your role.
                </p>
                <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="min-h-24 rounded-lg bg-[#1865F2] px-5 text-left font-bold text-white hover:bg-[#0B58CA]"
                    onClick={() => selectRole("student")}
                  >
                    <span className="block text-lg">Login as Student</span>
                    <span className="mt-1 block text-sm font-normal text-blue-100">
                      View assignments and practice
                    </span>
                  </button>
                  <button
                    type="button"
                    className="min-h-24 rounded-lg border border-[#1865F2] bg-white px-5 text-left font-bold text-[#1865F2] hover:bg-[#F9FAFB]"
                    onClick={() => selectRole("tutor")}
                  >
                    <span className="block text-lg">Login as Tutor</span>
                    <span className="mt-1 block text-sm font-normal text-[#4B5563]">
                      Manage your learning space
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="text-sm font-bold text-[#1865F2] hover:text-[#0B58CA]"
                  onClick={() => selectRole(null)}
                >
                  ← Choose a different role
                </button>
                <p className="mt-6 mb-5 text-sm font-bold uppercase tracking-[0.16em] text-[#1865F2]">
                  {selectedRole === "student" ? "Student login" : "Tutor login"}
                </p>
                <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#111827] sm:text-6xl">
                  Select your educator.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[#4B5563]">
                  Choose an educator to continue to the{" "}
                  {selectedRole === "student"
                    ? "Student Portal"
                    : "Tutor Dashboard"}
                  .
                </p>
                <div className="mt-8 grid max-w-xl gap-3">
                  {educators.map((educator) => (
                    <button
                      key={educator.id}
                      type="button"
                      className="flex min-h-20 items-center justify-between rounded-lg border border-[#1865F2] bg-white px-5 text-left hover:bg-[#F9FAFB]"
                      onClick={() =>
                        navigate(
                          selectedRole === "student"
                            ? "student-join"
                            : "tutor-login",
                          { tutorId: educator.id },
                        )
                      }
                    >
                      <span>
                        <span className="block font-bold text-[#111827]">
                          {educator.name}
                        </span>
                        <span className="mt-1 block text-sm text-[#4B5563]">
                          {educator.focus ||
                            `Class ${educator.classLevel} ${educator.subject}`}
                        </span>
                      </span>
                      <span
                        className="text-xl text-[#1865F2]"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  ))}
                  {selectedRole === "tutor" && (
                    <button
                      type="button"
                      className="min-h-12 rounded-lg border border-dashed border-[#9CA3AF] px-6 text-left font-semibold text-[#4B5563] hover:border-[#1865F2] hover:text-[#1865F2]"
                      onClick={() => navigate("educator-registration")}
                    >
                      + Register as New Educator
                    </button>
                  )}
                </div>
              </>
            )}
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
              A focused space for every educator
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
  const [educators, setEducators] = useState(() => getEducators());
  const navigate = (view, params = {}) => {
    setViewParams(params);
    setCurrentView(view);
  };

  if (currentView === "educator-registration")
    return (
      <EducatorRegistration
        navigate={navigate}
        onRegistered={(educator) =>
          setEducators((current) => [...current, educator])
        }
      />
    );
  if (currentView === "tutor-login")
    return <TutorLogin navigate={navigate} tutorId={viewParams.tutorId} />;
  if (currentView === "tutor-dashboard")
    return <TutorDashboard navigate={navigate} tutorId={viewParams.tutorId} />;
  if (currentView === "create-assignment")
    return <CreateAssignment navigate={navigate} />;
  if (currentView === "student-join")
    return <StudentJoin navigate={navigate} />;
  if (currentView === "student-dashboard")
    return (
      <StudentDashboard navigate={navigate} studentId={viewParams.studentId} />
    );
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
  return (
    <LandingPage
      navigate={navigate}
      educators={educators}
      initialRole={viewParams.role}
    />
  );
}

export default App;
