//Title constructor function that creates a Title object

// For tracking the rows
let index = 3;

// For tracking the total rows selected
let totalcheck = 0;
let fullName = "Ashwin Nair 002647626";
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
};

var socialMedia = {
  facebook: "http://facebook.com",
  twitter: "http://twitter.com",
  flickr: "http://flickr.com",
  youtube: "http://youtube.com",
};

var t = new Title("CONNECT WITH ME!");

function displayFullName() {
  var fullnameElement = document.getElementById("fullname");
  fullnameElement.textContent = fullName;
}

// To show name when page loads
window.onload = displayFullName;

// Called when any row is selected
function toggleRowColor(checkbox) {
  // Get the parent row of the clicked checkbox
  var row = checkbox.closest("tr");

  var table = document.getElementById("myTable");

  console.log(table, "Table");
  console.log(table.querySelector("thead tr"));

  var firstRow = table.rows[0];
  header8 = firstRow.cells[8];
  header9 = firstRow.cells[9];

  // Check if the row is currently yellow 
  if (row.style.backgroundColor !== "yellow") {
    totalcheck = totalcheck + 1;
    row.insertCell(8);
    row.insertCell(9);
    var deleteTd = row.cells[8];
    var editTd = row.cells[9];

    // Create a button
    var delbutton = document.createElement("button");
    delbutton.innerHTML = "delete";

    var editbutton = document.createElement("button");
    editbutton.innerHTML = "edit";
   
    // Add a click event listener to the Delete button
    delbutton.addEventListener("click", function () {
      deleteRow(delbutton);
    });

    editbutton.addEventListener("click", function () {
      editRow(editbutton);
    });

    // Append the button to the 8th cell
    deleteTd.appendChild(delbutton);
    editTd.appendChild(editbutton);
    row.style.backgroundColor = "yellow";
    header8.style.display = "";
    header9.style.display = "";
  } else {
    totalcheck = totalcheck - 1;
    // Change it back to the default background color
    row.style.backgroundColor = "white";
    var deleteTd = row.cells[8];
    var editTd = row.cells[9];
    deleteTd.remove();
    editTd.remove();
    header8.style.display = "";
    header9.style.display = "";
  }

  // Changing the color of submit button
  var submitButton = document.getElementById("button");
  if (totalcheck === 0) {
    table.rows[0].cells[8].style.display='none';
    table.rows[0].cells[9].style.display='none';

    submitButton.style.backgroundColor = "grey";
    submitButton.removeEventListener("click", handleSubmit);
    submitButton.style.cursor = "auto";
  } else {
    submitButton.style.backgroundColor = "orange";
    submitButton.addEventListener("click", handleSubmit);
    submitButton.style.cursor = "pointer";
  }
}

function addNewStudentRow() {
  try {
    
    var table = document.getElementById("myTable");

    // Create a new row
    var newRow = table.insertRow(-1); 

    // Data for the new row
    index = index + 1;
    var randomNumber = Math.floor(Math.random() * 90000) + 10000;
    var rowData = [
      '<input type="checkbox" onclick="toggleRowColor(this)"><br /><br /><img src="down.png" width="25px" onclick="toggleDropDown(this)"/>',
      "Student" + index,
      "Teacher" + index,
      "Approved",
      "Fall",
      "TA",
      randomNumber,
      "100%",
    ];

  
    for (var i = 0; i < rowData.length; i++) {
      var cell = newRow.insertCell(i);

      cell.innerHTML = rowData[i];
      if (i === 8 || i === 9) {
        cell.style.display = "none";
      }
    }

    // Check if the tbody exists, and create it if it doesn't
    var tbody = table.querySelector("tbody");
    if (!tbody) {
      tbody = document.createElement("tbody");
      table.appendChild(tbody);
    }

    // Create a new table row for additional info
    var additionalInfoId = "additionalInfo" + index; 
    var additionalInfoRow = document.createElement("tr");

    // Set the class and style attributes for the new row
    additionalInfoRow.className = "dropDownTextArea";
    additionalInfoRow.style.display = "none";
    additionalInfoRow.id = additionalInfoId; 

    // Create a table cell with colspan of 8
    var cell = document.createElement("td");
    cell.colSpan = 8;

    // Add the content to the cell
    cell.innerHTML = `
    Advisor:<br><br>
    Award Details<br>
    Summer 1-2014(TA)<br>
    Budget Number: <br>
    Tuition Number: <br>
    Comments:<br><br><br>
    Award Status:<br><br><br>
  `;

    // Append the cell to the new row
    additionalInfoRow.appendChild(cell);

    // Append the new row to the tbody
    tbody.appendChild(additionalInfoRow);
    alert("Added new record for student:" + index);
  } catch {
    alert("Record addition failed for student:" + index);
  }
}

// Function called to show AdditionalInfo
function toggleDropDown(imgElement) {
  // Get the parent row of the clicked image
  var row = imgElement.closest("tr"); 
  console.log(row, "ROWWW");

  // Get the next sibling 
  var additionalInfo = row.nextElementSibling; 
  console.log(additionalInfo, "ADD");

  if (
    additionalInfo.style.display === "none" ||
    additionalInfo.style.display === ""
  ) {
    additionalInfo.style.display = "table-row"; // Show the additional info
  } else {
    additionalInfo.style.display = "none"; // Hide the additional info
  }
}

// Function to delete row
function deleteRow(deletebutton) {
  var userResponse = confirm("Are you sure you want to proceed?");
  if (userResponse) {
    var row = deletebutton.closest("tr");
    let rowIndex = row.rowIndex;
    let rowData = row.cells[1].innerHTML;
    let studentIndex = rowData.charAt(rowData.length - 1);

    var table = document.getElementById("myTable");

    table.deleteRow(rowIndex);
    table.deleteRow(rowIndex);

    totalcheck = totalcheck - 1;

    table.rows[0].cells[8].style.display = "none";
    table.rows[0].cells[9].style.display = "none";
    alert("Successfuly deleted student:" + studentIndex);

    var submitButton = document.getElementById("button");
    if (totalcheck === 0) {
      submitButton.style.backgroundColor = "grey";
      submitButton.removeEventListener("click", handleSubmit);
      submitButton.style.cursor = "auto";
    } else {
      console.log("RRR");
      submitButton.style.backgroundColor = "orange";
      submitButton.addEventListener("click", handleSubmit);
      submitButton.style.cursor = "pointer";
    }
  }
}

// Function to edit row
function editRow(editbutton) {
  var row = editbutton.closest("tr");

  let rowData = row.cells[1].innerHTML;
  let studentIndex = rowData.charAt(rowData.length - 1);
  for (let i = 2; i < 8; i++) {
    rowData = rowData + " " + row.cells[i].innerHTML;
  }

  console.log(rowData, "FF");
  let userInput = prompt(
    `Edit details of Student:` + studentIndex + "\n\n" + rowData
  );

  if (userInput) {
    alert("Data updated successfully for student:" + studentIndex);
  }
}

// Called when submit button is clicked
function handleSubmit() {
  alert("Submit Clicked!");
}
