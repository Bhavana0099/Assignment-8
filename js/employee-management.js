/*eslint-env browser*/
/*jslint-env browser*/

var employees = [['Sally Smith', 'Quality Assurance', 3423],['Mark Martin', 'VP Sales', 3346],
                 ['John Johnson', 'Marketing', 3232],['Alex Martin', 'Accountant', 2345],['Bob Bobby', 'CEO', 1234]];

var $ = function (id) {
    "use strict";
    return document.getElementById(id);
};

//Function to display number of employees
function displayText() {
    "use strict";
    var show = $("displayinfo");
    var show_text = "Showing " + employees.length + " Employees";
    show.innerHTML = show_text;
}

//function to display the list of employees
function displayTable() {
    "use strict";
    employees.forEach(employee => {
        addEmployee(employee);
    });
}

//funtion to add an employee to the existing 2D array
function addEmployee(rowList) {
    "use strict";
    var tableBody , row, cell, text, button;

    tableBody = document.getElementsByTagName("tbody").item(0);
    row = document.createElement("tr");

    rowList.forEach(element => {
        cell = document.createElement("td");
        text = document.createTextNode(element);
        cell.appendChild(text);
        row.appendChild(cell);
    });

    cell = document.createElement("td");
    button = document.createElement("BUTTON")
    text = document.createTextNode("Delete")
    button.classList.add("button");
    button.appendChild(text);
    cell.appendChild(button);
    row.appendChild(cell);
    button.setAttribute('onclick', 'deleteRow(this)');
    tableBody.appendChild(row);
}

//function to delete an employee for the list
function deleteRow(clickButton) {
    "use strict";
    var tableBody = document.getElementsByTagName("tbody").item(0);
    var rowIndex = clickButton.parentNode.parentNode.rowIndex - 1;
    tableBody.deleteRow(rowIndex);
    employees.splice(rowIndex, 1);
    displayText();
}

//function that validates the values entered into text boxes
function validate() {
    "use strict";
    var name, title, ext, required, requiredFields;
    name = $("name").value;
    title = $("title").value;
    ext = $("ext").value;
    requiredFields = true;
    required = "<span>Required field</span>";
    if(name == "" || title == "" || ext == "") {
        requiredFields = false;
    }
    if(name == "") {
        $("errorname").innerHTML = required;
    }
    else{
        $("errorname").innerHTML = "";
    }

    if(title == "") {
        $("errortitle").innerHTML = required;
    }
    else{
        $("errortitle").innerHTML = "";
    }

    if(ext == "") {
        $("errorext").innerHTML = required;
    }
    else{
        $("errorext").innerHTML = "";
    }

    return requiredFields;
}

//function that displays the values from the array
function getFormValues() {
    "use strict";
    var name, title, ext;

    name = $("name").value;
    title = $("title").value;
    ext = $("ext").value;

    return [name, title, ext];
}

//function that clears the values from text boxes
function clearForm() {
    "use strict";
    $("name").value = "";
    $("title").value = "";
    $("ext").value = "";
}

window.addEventListener("load", function() {
    "use strict";
    displayText();
    displayTable();
    $("name").focus();
    $("add").addEventListener("click", function() {
        if(validate()) {
            var new_employee = getFormValues();
            employees.push(new_employee);
            addEmployee(new_employee);
            displayText();
            clearForm();
        }
    });
});