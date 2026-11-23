// ======================================
// STUDENTHUB - STUDENT MANAGEMENT SYSTEM
// ======================================

const API = "backend/";

// DOM ELEMENTS
const studentForm = document.getElementById("studentForm");
const namaInput = document.getElementById("nama");
const nimInput = document.getElementById("nim");
const studentTable = document.getElementById("studentTable");
const totalStudents = document.getElementById("totalStudents");
const message = document.getElementById("message");

let editingId = null;

// ======================================
// DISPLAY NOTIFICATIONS
// ======================================

function showMessage(text, success = true) {
  message.textContent = text;

  message.style.color = success ? "#42e8a5" : "#ff6b81";
}

// ======================================
// FETCH AND DISPLAY STUDENTS
// ======================================

async function loadStudents() {
  try {
    const response = await fetch(API + "read.php");

    if (!response.ok) {
      throw new Error("Unable to retrieve student records.");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to load students.");
    }

    const students = result.data;

    studentTable.innerHTML = "";

    totalStudents.textContent = students.length;

    if (students.length === 0) {
      studentTable.innerHTML = `
                <tr>
                    <td colspan="5">
                        No student records available yet.
                    </td>
                </tr>
            `;

      return;
    }

    students.forEach((student) => {
      const row = document.createElement("tr");

      const values = [
        student.id,
        student.nama,
        student.nim,
        student.created_at,
      ];

      values.forEach((value) => {
        const cell = document.createElement("td");

        cell.textContent = value ?? "";

        row.appendChild(cell);
      });

      const actionCell = document.createElement("td");

      const editButton = document.createElement("button");

      editButton.textContent = "Edit";

      editButton.className = "edit-button";

      editButton.addEventListener("click", () => {
        editStudent(student);
      });

      const deleteButton = document.createElement("button");

      deleteButton.textContent = "Delete";

      deleteButton.className = "delete-button";

      deleteButton.addEventListener("click", () => {
        deleteStudent(student.id);
      });

      actionCell.append(editButton, deleteButton);

      row.appendChild(actionCell);

      studentTable.appendChild(row);
    });
  } catch (error) {
    console.error(error);

    showMessage(error.message, false);
  }
}

// ======================================
// CREATE AND UPDATE STUDENTS
// ======================================

studentForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nama = namaInput.value.trim();

  const nim = nimInput.value.trim();

  if (!nama || !nim) {
    showMessage("Please complete all fields.", false);

    return;
  }

  const student = {
    nama: nama,
    nim: nim,
  };

  let endpoint = "create.php";

  if (editingId !== null) {
    endpoint = "update.php";

    student.id = editingId;
  }

  try {
    const response = await fetch(API + endpoint, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error("Server request failed.");
    }

    const result = await response.json();

    if (result.success) {
      showMessage(result.message);

      studentForm.reset();

      editingId = null;

      document.querySelector(".save-button").textContent = "＋ Save Student";

      await loadStudents();
    } else {
      showMessage(result.message, false);
    }
  } catch (error) {
    console.error(error);

    showMessage(error.message, false);
  }
});

// ======================================
// EDIT STUDENT
// ======================================

function editStudent(student) {
  editingId = student.id;

  namaInput.value = student.nama;

  nimInput.value = student.nim;

  document.querySelector(".save-button").textContent = "Update Student";

  showMessage("Editing student ID: " + student.id);

  document.getElementById("registration").scrollIntoView({
    behavior: "smooth",
  });
}

// ======================================
// DELETE STUDENT
// ======================================

async function deleteStudent(id) {
  const confirmation = confirm("Are you sure you want to delete this student?");

  if (!confirmation) return;

  try {
    const response = await fetch(API + "delete.php", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      throw new Error("Server request failed.");
    }

    const result = await response.json();

    if (result.success) {
      showMessage(result.message);

      await loadStudents();
    } else {
      showMessage(result.message, false);
    }
  } catch (error) {
    console.error(error);

    showMessage(error.message, false);
  }
}

// ======================================
// LOAD STUDENTS WHEN PAGE OPENS
// ======================================

document.addEventListener("DOMContentLoaded", loadStudents);
