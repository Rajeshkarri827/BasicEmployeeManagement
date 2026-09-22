// Get employees from localStorage
let employees = JSON.parse(localStorage.getItem("employees")) || [];


// Get HTML elements
const employeeForm = document.getElementById("employeeForm");

const employeeTable = document.getElementById("employeeTable");

const searchInput = document.getElementById("searchInput");

const submitBtn = document.getElementById("submitBtn");


// Track which employee is being edited
let editIndex = null;


// Display employees
function displayEmployees(employeeList = employees) {

    employeeTable.innerHTML = "";

    employeeList.forEach((employee, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.employeeId}</td>

            <td>${employee.name}</td>

            <td>${employee.email}</td>

            <td>${employee.department}</td>

            <td>${employee.role}</td>

            <td>
                <button
                    class="edit-btn"
                    onclick="editEmployee(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteEmployee(${index})">
                    Delete
                </button>
            </td>
        `;

        employeeTable.appendChild(row);
    });
}


// Add / Update employee
employeeForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get form values
    const employeeId =
        document.getElementById("employeeId").value.trim();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const department =
        document.getElementById("department").value.trim();

    const role =
        document.getElementById("role").value.trim();


    // Create employee object
    const employee = {

        employeeId: employeeId,

        name: name,

        email: email,

        department: department,

        role: role
    };


    // Check if editing
    if (editIndex === null) {

        // CREATE
        employees.push(employee);

    } else {

        // UPDATE
        employees[editIndex] = employee;

        editIndex = null;

        submitBtn.textContent = "Add Employee";
    }


    // Save to localStorage
    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );


    // Clear form
    employeeForm.reset();


    // Display employees
    displayEmployees();

});


// Edit employee
function editEmployee(index) {

    const employee = employees[index];


    document.getElementById("employeeId").value =
        employee.employeeId;

    document.getElementById("name").value =
        employee.name;

    document.getElementById("email").value =
        employee.email;

    document.getElementById("department").value =
        employee.department;

    document.getElementById("role").value =
        employee.role;


    // Store index
    editIndex = index;


    // Change button text
    submitBtn.textContent = "Update Employee";

}


// Delete employee
function deleteEmployee(index) {

    const confirmation =
        confirm("Are you sure you want to delete this employee?");


    if (!confirmation) {
        return;
    }


    // DELETE
    employees.splice(index, 1);


    // Save updated data
    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );


    // Display updated list
    displayEmployees();

}


// Search employees
searchInput.addEventListener("input", function () {

    const searchValue =
        searchInput.value.toLowerCase();


    const filteredEmployees = employees.filter(employee => {

        return (

            employee.employeeId
                .toLowerCase()
                .includes(searchValue)

            ||

            employee.name
                .toLowerCase()
                .includes(searchValue)

            ||

            employee.email
                .toLowerCase()
                .includes(searchValue)

            ||

            employee.department
                .toLowerCase()
                .includes(searchValue)

            ||

            employee.role
                .toLowerCase()
                .includes(searchValue)
        );

    });


    displayEmployees(filteredEmployees);

});


// Display employees when page loads
displayEmployees();