// Define the default list of students
const defaultStudents = [
  ["Alice Johnson", 15, 3.8],
  ["Bob Smith", 12, 3.4],
  ["Catherine Lee", 18, 3.9],
  ["David Brown", 9, 2.8],
  ["Eva Green", 16, 3.6],
];

// Try to get data from LocalStorage. If it doesn't exist, use the default list.
// We use JSON.parse to convert the stored string back into an array.
let studentData = JSON.parse(localStorage.getItem("studentData")) || defaultStudents;

// Helper Functions
// Function to calculate eligibility (Logic only)
function checkEligibility(creditHours, gpa) {
  return (creditHours >= 12 && gpa >= 3.5) ? "Eligible" : "Not Eligible";
}

// Function to save current data to LocalStorage
function saveData() {
  localStorage.setItem("studentData", JSON.stringify(studentData));
}

// Function to render the list to the DOM
function renderStudents() {
  // Create or clear the container
  let container = document.querySelector(".output-box");
  
  // If container doesn't exist yet, create it
  if (!container) {
    container = document.createElement("div");
    container.className = "output-box";
    document.body.appendChild(container);
  }
  
  // Reset the HTML content
  container.innerHTML = "<h2>Section 03 Result</h2>";

  // Loop through data and build HTML
  studentData.forEach((student) => {
    // Destructure array for clearer variable names
    const [name, creditHours, gpa] = student; 
    const status = checkEligibility(creditHours, gpa);

    const studentDiv = document.createElement("div");
    
    // Set color class based on status
    const statusClass = status === "Eligible" ? "eligible" : "not-eligible";

    studentDiv.innerHTML = `
      <b>Name:</b> ${name}<br>
      <b>Credit Hours:</b> ${creditHours}<br>
      <b>Current GPA:</b> ${gpa}<br>
      <b>Status:</b> <span class='${statusClass}'>${status}</span>
      <hr style='border-top: 1px dotted #ccc;'>
    `;
    container.appendChild(studentDiv);
  });
}

// ==========================================
// 3. MODAL & FORM HANDLING
// ==========================================

const modal = document.getElementById("myModal");
const modalButton = document.getElementById("myBtn");
const modalSpan = document.getElementsByClassName("close")[0];
const addStudentForm = document.getElementById("addStudentForm");

// Open Modal
if (modalButton) {
  modalButton.onclick = function () {
    modal.style.display = "block";
  };
}

// Close Modal (X button)
if (modalSpan) {
  modalSpan.onclick = function () {
    modal.style.display = "none";
  };
}

// Close Modal (Click outside)
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Function to handle adding a new student
function addStudent() {
  // 1. Get values from the form inputs
  const nameInput = document.getElementById("name").value;
  const credInput = document.getElementById("cred_hours").value;
  const gpaInput = document.getElementById("curr_gpa").value;

  // 2. validation: Ensure fields aren't empty
  if(nameInput === "" || credInput === "" || gpaInput === "") {
    alert("Please fill in all fields");
    return;
  }

  // 3. Convert numbers
  const cred_hours = parseInt(credInput);
  const curr_gpa = parseFloat(gpaInput);

  // 4. Update the Data Array
  // Note: We don't need to push "Eligible" string into the array here.
  // We calculate that dynamically in renderStudents() to keep data clean.
  studentData.push([nameInput, cred_hours, curr_gpa]);

  // 5. Save to LocalStorage (This persists the data!)
  saveData();

  // 6. Refresh the display
  renderStudents();

  // 7. Cleanup
  modal.style.display = "none";
  addStudentForm.reset();
  
}

renderStudents();