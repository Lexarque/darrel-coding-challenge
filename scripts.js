// 1. Define Multi-Dimensional Array studentData)
// Format: [Name (String), Credit Hour (Number), Current GPA (Number)]
var studentData = [
  ["Alice Johnson", 15, 3.8],
  ["Bob Smith", 12, 3.4],
  ["Catherine Lee", 18, 3.9],
  ["David Brown", 9, 2.8],
  ["Eva Green", 16, 3.6],
];

// 2. Create function to measure dean list eligibility using conditional statement

studentData.forEach((e) => {
  if (e[1] >= 12 && e[2] >= 3.5) {
    e.push("Eligible");
  } else {
    e.push("Not Eligible");
  }
});

const container = document.createElement("div");
container.className = "output-box";
container.innerHTML = "<h2>Section 03 Result</h2>";

studentData.forEach((student) => {
  const studentDiv = document.createElement("div");
  studentDiv.innerHTML = `
    <b>Name:</b> ${student[0]}<br>
    <b>Credit Hours:</b> ${student[1]}<br>
    <b>Current GPA:</b> ${student[2]}<br>
    <b>Status:</b> <span class='${
      student[3] === "Eligible" ? "eligible" : "not-eligible"
    }'>${student[3]}</span>
    <hr style='border-top: 1px dotted #ccc;'>
  `;
  container.appendChild(studentDiv);
});

document.body.appendChild(container);
