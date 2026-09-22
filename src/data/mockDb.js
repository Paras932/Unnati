import seedData from "./seedData";

const STORAGE_KEY = "unnati-demo-db-v2";

const clone = (value) => JSON.parse(JSON.stringify(value));

const readDb = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  const initialData = clone(seedData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

const writeDb = (db) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  return db;
};

const createId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const getDbSnapshot = () => clone(readDb());
export const getTutor = () => getDbSnapshot().tutor;
export const getStudents = () => getDbSnapshot().students;
export const getStudent = (studentId) =>
  getStudents().find((student) => student.id === studentId);
export const getSections = () => getDbSnapshot().sections;
export const getSubjects = () => getDbSnapshot().subjects;
export const getQuestionSets = () => getDbSnapshot().questionSets;
export const getQuestionSet = (questionSetId) =>
  getQuestionSets().find((questionSet) => questionSet.id === questionSetId);
export const getAssignments = () => getDbSnapshot().assignments;
export const getAttempts = () => getDbSnapshot().attempts;

export const resetDemoData = () => {
  localStorage.removeItem(STORAGE_KEY);
  return getDbSnapshot();
};

export const createAssignment = ({ questionSetId, tutorId, studentIds }) => {
  const db = readDb();
  const assignment = {
    id: createId("assignment"),
    questionSetId,
    tutorId,
    studentIds,
    assignedAt: new Date().toISOString(),
  };
  db.assignments.push(assignment);
  writeDb(db);
  return clone(assignment);
};

export const getAssignmentsForStudent = (studentId) => {
  const db = readDb();
  return db.assignments
    .filter((assignment) => assignment.studentIds.includes(studentId))
    .map((assignment) => ({
      ...assignment,
      questionSet: db.questionSets.find(
        (set) => set.id === assignment.questionSetId,
      ),
    }));
};

export const getAttemptsForStudent = (studentId) =>
  readDb().attempts.filter((attempt) => attempt.studentId === studentId);

export const getLatestAttemptForStudent = (studentId) => {
  const attempts = getAttemptsForStudent(studentId);
  return (
    attempts.sort(
      (a, b) => new Date(b.completedAt) - new Date(a.completedAt),
    )[0] || null
  );
};

export const submitAttempt = (attempt) => {
  const db = readDb();
  const nextAttempt = {
    ...attempt,
    id: createId("attempt"),
    completedAt: new Date().toISOString(),
  };
  db.attempts.push(nextAttempt);
  writeDb(db);
  return clone(nextAttempt);
};

export const assignTargetedPractice = ({
  tutorId,
  studentId,
  questionSetId,
}) => {
  const db = readDb();
  const assignment = {
    id: createId("assignment"),
    questionSetId,
    tutorId,
    studentIds: [studentId],
    assignedAt: new Date().toISOString(),
    targeted: true,
  };
  db.assignments.push(assignment);
  writeDb(db);
  return clone(assignment);
};
