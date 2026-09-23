const tutor = {
  id: "tutor-kuldeep",
  name: "Kuldeep Verma",
  focus: "All Subjects",
  subject: "Mathematics",
  classLevel: 10,
  tutorCode: "KULDEEP10",
  greetingName: "kuldeep ji",
};

const students = [
  ["aarav-sharma", "Aarav Sharma", "AS", 63, true],
  ["priya-singh", "Priya Singh", "PS", 84, false],
  ["rohan-verma", "Rohan Verma", "RV", 71, false],
  ["neha-gupta", "Neha Gupta", "NG", 58, true],
  ["vikram-patel", "Vikram Patel", "VP", 76, false],
  ["ananya-das", "Ananya Das", "AD", 89, false],
  ["kabir-mehta", "Kabir Mehta", "KM", 63, true],
  ["sneha-rao", "Sneha Rao", "SR", 74, false],
  ["aditya-joshi", "Aditya Joshi", "AJ", 81, false],
  ["pooja-nair", "Pooja Nair", "PN", 69, false],
].map(([id, name, avatarInitials, latestOverallScorePct, needsSupport]) => ({
  id,
  name,
  avatarInitials,
  classLevel: 10,
  joinedTutorId: tutor.id,
  latestOverallScorePct,
  needsSupport,
}));

const sections = [
  { id: "algebra", name: "Algebra", classAveragePct: 78, isWeakArea: false },
  {
    id: "trigonometry",
    name: "Trigonometry",
    classAveragePct: 56,
    isWeakArea: true,
  },
  { id: "geometry", name: "Geometry", classAveragePct: 72, isWeakArea: false },
];
const subjects = [{ id: "mathematics", name: "Mathematics" }];

const makeQuestions = (sectionId, rows) =>
  rows.map(([id, prompt, options, correctOptionIndex, topicTag]) => ({
    id: `${sectionId}-${id}`,
    prompt,
    options,
    correctOptionIndex,
    topicTag,
  }));

const questionsBySection = {
  algebra: makeQuestions("algebra", [
    [
      "q1",
      "If the zeroes of x² - 5x + 6 are alpha and beta, what is alpha + beta?",
      ["2", "5", "6", "-5"],
      1,
      "Polynomials",
    ],
    [
      "q2",
      "The pair of equations 2x + 3y = 7 and 4x + 6y = 14 has:",
      [
        "No solution",
        "A unique solution",
        "Infinitely many solutions",
        "Two solutions",
      ],
      2,
      "Pair of Linear Equations",
    ],
    [
      "q3",
      "The 10th term of the arithmetic progression 3, 7, 11, ... is:",
      ["35", "39", "43", "47"],
      1,
      "Arithmetic Progressions",
    ],
    [
      "q4",
      "The discriminant of 2x² - 4x + 3 is:",
      ["-8", "8", "4", "-4"],
      0,
      "Quadratic Equations",
    ],
    [
      "q5",
      "If two similar triangles have corresponding sides in the ratio 2:3, their areas are in the ratio:",
      ["2:3", "4:9", "8:27", "3:2"],
      1,
      "Triangles",
    ],
    [
      "q6",
      "The distance between (2, 3) and (5, 7) is:",
      ["4", "5", "6", "7"],
      1,
      "Coordinate Geometry",
    ],
    [
      "q7",
      "If the HCF of 96 and 404 is 4, their LCM is:",
      ["9696", "969", "96", "404"],
      0,
      "Real Numbers",
    ],
    [
      "q8",
      "The 5th term from the end of the AP 3, 8, 13, ..., 253 is:",
      ["228", "233", "238", "243"],
      1,
      "Arithmetic Progressions",
    ],
    [
      "q9",
      "For ax² + bx + c = 0, equal roots occur when:",
      ["b² - 4ac = 0", "b² + 4ac = 0", "a + b + c = 0", "a = 0"],
      0,
      "Quadratic Equations",
    ],
    [
      "q10",
      "The graph of a linear equation in two variables is a:",
      ["Circle", "Parabola", "Straight line", "Point"],
      2,
      "Pair of Linear Equations",
    ],
  ]),
  trigonometry: makeQuestions("trigonometry", [
    [
      "q1",
      "In a right-angled triangle, if the opposite side is 3 cm and the hypotenuse is 5 cm, what is sin(theta)?",
      ["3/5", "4/5", "5/3", "3/4"],
      0,
      "Basic Trigonometric Ratios",
    ],
    [
      "q2",
      "What is the value of tan(45 degrees)?",
      ["0", "1", "sqrt(3)", "Undefined"],
      1,
      "Basic Trigonometric Ratios",
    ],
    [
      "q3",
      "A ladder 10 m long reaches a window 8 m above the ground. How far is its foot from the wall?",
      ["2 m", "4 m", "6 m", "8 m"],
      2,
      "Applications of Trigonometry",
    ],
    [
      "q4",
      "If cos(theta) = 12/13 for an acute angle, what is sin(theta)?",
      ["5/13", "12/13", "13/5", "1/13"],
      0,
      "Basic Trigonometric Ratios",
    ],
    [
      "q5",
      "The angle of elevation of a tower is 30 degrees. Which ratio finds its height using the distance to its base?",
      [
        "sin(30 degrees)",
        "cos(30 degrees)",
        "tan(30 degrees)",
        "sec(30 degrees)",
      ],
      2,
      "Applications of Trigonometry",
    ],
    [
      "q6",
      "The value of sin²(30 degrees) + cos²(30 degrees) is:",
      ["0", "1/2", "1", "2"],
      2,
      "Trigonometric Identities",
    ],
    [
      "q7",
      "If tan(A) = 1/sqrt(3), where A is acute, then A equals:",
      ["30 degrees", "45 degrees", "60 degrees", "90 degrees"],
      0,
      "Trigonometric Ratios",
    ],
    [
      "q8",
      "From a point 20 m from a tower, the angle of elevation is 45 degrees. The tower height is:",
      ["10 m", "20 m", "20sqrt(3) m", "40 m"],
      1,
      "Applications of Trigonometry",
    ],
    [
      "q9",
      "The value of cosec(90 degrees) is:",
      ["0", "1", "-1", "Undefined"],
      1,
      "Trigonometric Ratios",
    ],
    [
      "q10",
      "If sec(theta) = 13/12, then tan(theta) for an acute theta is:",
      ["5/12", "12/5", "13/5", "5/13"],
      0,
      "Trigonometric Identities",
    ],
  ]),
  geometry: makeQuestions("geometry", [
    [
      "q1",
      "The tangent to a circle is perpendicular to the:",
      ["Radius through contact point", "Diameter only", "Chord", "Secant"],
      0,
      "Circles",
    ],
    [
      "q2",
      "The probability of an impossible event is:",
      ["0", "1/2", "1", "-1"],
      0,
      "Probability",
    ],
    [
      "q3",
      "The volume of a cylinder with radius 7 cm and height 10 cm is:",
      ["490pi cm³", "140pi cm³", "70pi cm³", "980pi cm³"],
      0,
      "Surface Areas and Volumes",
    ],
    [
      "q4",
      "The midpoint of the line segment joining (2, 4) and (6, 8) is:",
      ["(4, 6)", "(2, 2)", "(8, 12)", "(3, 4)"],
      0,
      "Coordinate Geometry",
    ],
    [
      "q5",
      "The area of a sector of angle 90 degrees and radius 14 cm is:",
      ["49pi cm²", "98pi cm²", "196pi cm²", "28pi cm²"],
      0,
      "Areas Related to Circles",
    ],
    [
      "q6",
      "A cone has radius 3 cm and height 4 cm. Its slant height is:",
      ["3 cm", "4 cm", "5 cm", "7 cm"],
      2,
      "Surface Areas and Volumes",
    ],
    [
      "q7",
      "If P(E) = 0.35, then P(not E) is:",
      ["0.35", "0.55", "0.65", "1.35"],
      2,
      "Probability",
    ],
    [
      "q8",
      "The angle between a radius and tangent at the point of contact is:",
      ["30 degrees", "45 degrees", "60 degrees", "90 degrees"],
      3,
      "Circles",
    ],
    [
      "q9",
      "The area of a circle of radius 7 cm is:",
      ["14pi cm²", "28pi cm²", "49pi cm²", "98pi cm²"],
      2,
      "Areas Related to Circles",
    ],
    [
      "q10",
      "The sum of the first 10 odd natural numbers is:",
      ["50", "90", "100", "110"],
      2,
      "Statistics",
    ],
  ]),
};

const expandQuestions = (questions) =>
  Array.from({ length: 30 }, (_, index) => {
    const source = questions[index % questions.length];
    const variation = Math.floor(index / questions.length);
    return {
      ...source,
      id: `${source.id}-library-${index + 1}`,
      prompt:
        variation === 0
          ? source.prompt
          : `${source.prompt} (Practice variation ${variation + 1})`,
    };
  });

Object.keys(questionsBySection).forEach((sectionId) => {
  questionsBySection[sectionId] = expandQuestions(
    questionsBySection[sectionId],
  );
});

const makeQuestionSet = (section, index) => ({
  id: `${section.id}-set-${index}`,
  sectionId: section.id,
  title: `${section.name} Practice Set ${index}`,
  classLevel: 10,
  subjectId: "mathematics",
  questionCount: questionsBySection[section.id].length,
  durationMinutes: 25,
  questions: index === 1 ? questionsBySection[section.id] : [],
  createdAt: `2026-08-${String(index + 1).padStart(2, "0")}`,
});
const questionSets = sections.flatMap((section) =>
  Array.from({ length: 10 }, (_, index) => makeQuestionSet(section, index + 1)),
);

const assignments = [
  {
    id: "assignment-trig-live",
    questionSetId: "trigonometry-set-1",
    tutorId: tutor.id,
    studentIds: ["aarav-sharma"],
    assignedAt: "2026-09-18T16:00:00.000Z",
  },
];

const baselineData = {
  "aarav-sharma": {
    scores: [72, 55, 61],
    strengths: ["Polynomials", "Basic Trigonometric Ratios", "Circles"],
    weaks: [
      "Quadratic Equations",
      "Applications of Trigonometry",
      "Surface Areas and Volumes",
    ],
  },
  "priya-singh": {
    scores: [88, 82, 86],
    strengths: [
      "Pair of Linear Equations",
      "Trigonometric Identities",
      "Areas Related to Circles",
    ],
    weaks: [
      "Arithmetic Progressions",
      "Applications of Trigonometry",
      "Probability",
    ],
  },
  "rohan-verma": {
    scores: [75, 59, 78],
    strengths: [
      "Coordinate Geometry",
      "Basic Trigonometric Ratios",
      "Probability",
    ],
    weaks: [
      "Quadratic Equations",
      "Applications of Trigonometry",
      "Statistics",
    ],
  },
  "neha-gupta": {
    scores: [68, 48, 58],
    strengths: ["Real Numbers", "Basic Trigonometric Ratios", "Circles"],
    weaks: [
      "Quadratic Equations",
      "Applications of Trigonometry",
      "Surface Areas and Volumes",
    ],
  },
  "vikram-patel": {
    scores: [84, 57, 78],
    strengths: [
      "Arithmetic Progressions",
      "Trigonometric Ratios",
      "Coordinate Geometry",
    ],
    weaks: ["Triangles", "Applications of Trigonometry", "Probability"],
  },
  "ananya-das": {
    scores: [92, 66, 90],
    strengths: [
      "Polynomials",
      "Trigonometric Identities",
      "Areas Related to Circles",
    ],
    weaks: [
      "Pair of Linear Equations",
      "Applications of Trigonometry",
      "Statistics",
    ],
  },
  "kabir-mehta": {
    scores: [70, 45, 63],
    strengths: ["Real Numbers", "Basic Trigonometric Ratios", "Circles"],
    weaks: [
      "Arithmetic Progressions",
      "Applications of Trigonometry",
      "Surface Areas and Volumes",
    ],
  },
  "sneha-rao": {
    scores: [78, 54, 80],
    strengths: ["Quadratic Equations", "Trigonometric Ratios", "Probability"],
    weaks: [
      "Coordinate Geometry",
      "Applications of Trigonometry",
      "Statistics",
    ],
  },
  "aditya-joshi": {
    scores: [89, 62, 85],
    strengths: [
      "Triangles",
      "Trigonometric Identities",
      "Areas Related to Circles",
    ],
    weaks: [
      "Real Numbers",
      "Applications of Trigonometry",
      "Surface Areas and Volumes",
    ],
  },
  "pooja-nair": {
    scores: [73, 50, 76],
    strengths: [
      "Pair of Linear Equations",
      "Basic Trigonometric Ratios",
      "Circles",
    ],
    weaks: [
      "Coordinate Geometry",
      "Applications of Trigonometry",
      "Probability",
    ],
  },
};
const historicalAttempts = Object.entries(baselineData).flatMap(
  ([studentId, profile], studentIndex) =>
    sections.map((section, sectionIndex) => ({
      id: `history-${studentId}-${section.id}`,
      assignmentId: `history-assignment-${section.id}`,
      studentId,
      questionSetId: `${section.id}-set-${studentIndex + 2}`,
      answers: [],
      scoreCorrect: Math.round(profile.scores[sectionIndex] / 10),
      scoreTotal: 10,
      accuracyPct: profile.scores[sectionIndex],
      strengthTopic: profile.strengths[sectionIndex],
      weakTopic: profile.weaks[sectionIndex],
      completedAt: `2026-09-${String(4 + studentIndex).padStart(2, "0")}T10:00:00.000Z`,
      reportSharedWithTutor: true,
    })),
);

export const seedData = {
  tutor,
  students,
  subjects,
  sections,
  questionSets,
  assignments,
  attempts: historicalAttempts,
};
export default seedData;
