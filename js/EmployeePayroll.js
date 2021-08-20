//first loads the contents in the web page then validates
window.addEventListener("DOMContentLoaded", (event) => {
  const name = document.querySelector("#name");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      setTextValue("#errName", "");
      return;
    }
    try {
      new EmployeePayrollData().Empname = name.value;
      setTextValue("#errName", "");
    } catch (e) {
      setTextValue("#errName", e);
    }
  });
  // salary range setter
  const salary = document.querySelector("#salary");
  const output = document.querySelector(".salary-output");
  output.textContent = salary.value;
  salary.addEventListener("input", function () {
    output.textContent = salary.value;
  });
  //validates the date
  const date = document.querySelector("#date");
  date.addEventListener("input", function () {
    let startDate =
      getInputValue("day") +
      " " +
      getInputValue("month") +
      " " +
      getInputValue("year");
    try {
      new EmployeePayrollData().startDate = new Date(Date.parse(startDate));
      setTextValue(".errDate", "");
    } catch (e) {
      setTextValue(".errDate", e);
    }
  });
});

// EmployeePayroll Data Model
class EmployeePayrollData {
  // Added properties like gender,prfoile pic,notes,department
  get Empname() {
    return this._name;
  }
  //Validation for name using regex
  set Empname(value) {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
    if (nameRegex.test(value)) {
      this._name = value;
    } else {
      throw "Invalid Name";
    }
  }
  get profilePic() {
    return this._profilePic;
  }
  set profilePic(value) {
    this._profilePic = value;
  }
  get salary() {
    return this._salary;
  }
  set salary(value) {
    this._salary = value;
  }
  get startDate() {
    return this._startDate;
  }
  set startDate(value) {
    if (value > new Date()) throw "Start Date is a future date";
    var diff = Math.abs(new Date().getTime() - value.getTime());
    if (diff / (1000 * 60 * 60 * 24) > 30) throw "Start Date is Beyond 30 days";
    this._startDate = value;
  }
  get Gender() {
    return this._gender;
  }
  set Gender(value) {
    this._gender = value;
  }
  get EmployeeNotes() {
    return this._notes;
  }
  set EmployeeNotes(value) {
    this._notes = value;
  }
  get Department() {
    return this._dept;
  }
  set Department(value) {
    this._dept = value;
  }
  toString() {
    const option = { year: "numeric", month: "long", day: "numeric" };
    const empDate = !this.startDate
      ? "undefined"
      : this.startDate.toLocaleDateString("en-US", option);
    return (
      "Empname = " +
      this.Empname +
      " Gender: " +
      this.Gender +
      " Profile Pic: " +
      this.profilePic +
      " Department: " +
      this.Department +
      " Salary: " +
      this.salary +
      " startDate: " +
      empDate +
      " Note: " +
      this.EmployeeNotes
    );
  }
}
//save create and save payroll object
const save = () => {
  try {
    let employeePayrollData = createEmployeePayroll();
    createorUpdateLocal(employeePayrollData);
  } catch (e) {
    return;
  }
};
//onSubmit validates this function
const createEmployeePayroll = () => {
  let employee = new EmployeePayrollData();
  try {
    employee.Empname = getInputValue("name");
    employee.profilePic = getSelectedValues("[name = profile]").pop();
    employee.salary = getInputValue("salary");
    let date =
      getInputValue("day") +
      " " +
      getInputValue("month") +
      " " +
      getInputValue("year");
    employee.Gender = getSelectedValues("[name = gender]").pop();
    employee.Department = getSelectedValues("[name = department]");
    employee.EmployeeNotes = getInputValue("notes");

    employee.startDate = new Date(date);
    try {
      employee.startDate = new Date(Date.parse(date));
    } catch (e) {
      setTextValue(".errDate", e);
      throw e;
    }
    return employee;
  } catch (e) {
    alert(e);
  }
};
//selects value for radio buttons
const getSelectedValues = (values) => {
  let items = document.querySelectorAll(values);
  let selectedItem = [];
  items.forEach((item) => {
    if (item.checked) selectedItem.push(item.value);
  });
  return selectedItem;
};
// sets to the attribute
const setTextValue = (id, value) => {
  const attribute = document.querySelector(id);
  attribute.textContent = value;
};
//gets from the attribute
const getInputValue = (id) => {
  let value = document.getElementById(id).value;
  return value;
};
// create or update local storage
const createorUpdateLocal = (employeePayrollData) => {
  alert(employeePayrollData.toString());
  //JSON Object
  let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if (employeeList != undefined) {
    employeeList.push(employeePayrollData);
  } else {
    employeeList = [employeePayrollData];
  }
  //JSON to String
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeeList));
};
const resetForm=()=>{
    setValue('#name','');
    unsetSelected('[name=profile]');
    unsetSelected('[name=gender]');
    unsetSelected('[name=department]');
    document.querySelector('#salary').value='';
    document.querySelector('#notes').value='';
    document.querySelector('#day').value='1';
    document.querySelector('#month').value='January';
    document.querySelector('#year').value='2021';
    setTextValue(".errDate", "");
    setTextValue("#errName", "");
    alert("Reseted!");
}
const setValue=(id,value)=>{
    const element = document.querySelector(id);
    element.value=value;
}
const unsetSelected=(property)=>{
    let allItems = document.querySelectorAll(property);
    allItems.forEach(item=>{
        item.checked=false;
    });
}
