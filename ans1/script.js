function generateStudentMarkSheets(students, Details) {
  const studentsMarkSheets = [];

  for (const student of students) {
    const details = Details.find((detail) => detail.Roll === student.Roll);

    if (details) {
      const { subjects } = details;
      const total = Object.values(subjects).reduce(
        (acc, mark) => acc + mark,
        0
      );
      const status = total >= 200 ? "pass" : "fail";

      const markSheet = {
        name: student.name, //prabir
        Roll: student.Roll, //12
        ...subjects,
        total,
        status,
      };

      studentsMarkSheets.push(markSheet);
    }
  }

  return studentsMarkSheets;
}

// Example usage:
const students = [
  { name: "Dhishan Debnath", Roll: 1 },
  { name: "Animesh Gupta", Roll: 2 },
  { name: "Tapas Sen", Roll: 3 },
  { name: "Misti Dutta", Roll: 4 },
  { name: "Chini Misra", Roll: 5 },
];

const Details = [
  { Roll: 5, subjects: { math: 35, english: 56, chemistry: 76, computer: 68 } },
  { Roll: 3, subjects: { math: 33, chemistry: 12, computer: 50, english: 35 } },
  { Roll: 1, subjects: { math: 55, english: 75, chemistry: 76, computer: 94 } },
  { Roll: 4, subjects: { english: 12, chemistry: 85, computer: 68, math: 45 } },
  { Roll: 2, subjects: { math: 55, english: 56, computer: 48, chemistry: 12 } },
];

const studentsMarkSheets = generateStudentMarkSheets(students, Details);
console.log(studentsMarkSheets);

const tableBody = document.getElementById("markSheetsTableBody");

studentsMarkSheets.forEach((markSheet) => {
  const row = document.createElement("tr");

  const columns = [
    "name",
    "Roll",
    "math",
    "english",
    "chemistry",
    "computer",
    "total",
    "status",
  ];

  columns.forEach((column) => {
    const cell = document.createElement("td");
    cell.textContent = markSheet[column];
    row.appendChild(cell);
  });

  if (markSheet.status === "pass") {
    row.classList.add("pass");
  } else {
    row.classList.add("fail");
  }

  tableBody.appendChild(row);
});
