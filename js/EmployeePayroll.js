//first loads the contents in the web page then validates
let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener("DOMContentLoaded", (event) => {
  const name = document.querySelector("#name");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      setTextValue("#errName", "");
      return;
    }
    try {
      checkName(name.value);
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
     checkStartDate(new Date(Date.parse(startDate)));
      setTextValue(".errDate", "");
    } catch (e) {
      setTextValue(".errDate", e);
    }
  });
  document.querySelector('.cancelButton').href=site_properties.home_page;
  checkForUpdate();
});
//save create and save payroll object
const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try {
    setEmployeePayrollObject();
    if(site_properties.use_local.match("true")){
    createorUpdateLocal();
    resetForm();
    window.location.replace(site_properties.home_page);
    }else{
      createorUpdateServer();
    }
  } catch (e) {
    alert(e);
    return;
  }
};
//UC-26: creates or updates the server
const createorUpdateServer=()=>{
  let postUrl = site_properties.server_url;
  let methodType = "POST";
  if(isUpdate){
    methodType = "PUT";
    postUrl = postUrl+employeePayrollObj.id.toString();
  }
  makePromiseCall(methodType,postUrl,true,employeePayrollObj).then
  (responseText=>{
    resetForm();
    window.location.replace(site_properties.home_page);
  }).catch(error=>{
    throw error;
  })
}
const setEmployeePayrollObject=()=>{
  if(!isUpdate && site_properties.use_local.match("true"))employeePayrollObj.id = createNewEmployeeId();
  employeePayrollObj._fullname=getInputValue('name');
  employeePayrollObj._profilePic = getSelectedValues("[name = profile]").pop();
  employeePayrollObj._salary = getInputValue("salary");
    let date =
      getInputValue("day") +
      " " +
      getInputValue("month") +
      " " +
      getInputValue("year");
      employeePayrollObj._startDate=date;
      employeePayrollObj._gender = getSelectedValues("[name = gender]").pop();
      employeePayrollObj._dept = getSelectedValues("[name = department]");
      employeePayrollObj._notes = getInputValue("notes");
}
// create or update local storage
const createorUpdateLocal = () => {
  //JSON Object
  let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeeList){
    let empPayData = employeeList.find(empData=>empData.id == employeePayrollObj.id);
    if(!empPayData){
      employeeList.push(employeePayrollObj);
    }else{
      const index = employeeList.map(empData=>empData.id).indexOf(empPayData.id);
      employeeList.splice(index,1,employeePayrollObj);
    }
  }else{
    employeeList = [employeePayrollObj];
  }
  //JSON to String
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeeList));
};
//Create with Id
const createNewEmployeePayroll=(id)=>{
  let empPayData = new EmployeePayrollData();
  if(!id)empPayData.id = createNewEmployeeId();
  else empPayData.id = id;
  setEmployeePayroll(empPayData);
  return empPayData;
}
//allocates ID
const createNewEmployeeId=()=>{
  let empId = localStorage.getItem("EmployeeId");
  empId = !empId?1:(parseInt(empId)+1).toString();
  localStorage.setItem("EmployeeId",empId);
  return empId;
}
//sets value to employee model for validation
const setEmployeePayroll = (employee)=>{
  try{
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
//resets form
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
    const salary = document.querySelector("#salary");
  const output = document.querySelector(".salary-output");
  output.textContent = 400000;
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
const setSelectedValue=(property,value)=>{
  let allItems = document.querySelectorAll(property);
  allItems.forEach(items=>{
    if(Array.isArray(value)){
      if(value.includes(items.value)){
        items.checked=true;
      }
    }else if(items.value==value){
        items.checked=true;
    }
  });
}
//checks whether the page comes for update
const checkForUpdate=()=>{
  const empPayrollJSON = localStorage.getItem('editEmp');
  isUpdate=empPayrollJSON?true:false;
  if(!isUpdate)return;
  employeePayrollObj=JSON.parse(empPayrollJSON);
  setForm();
}
//set form for updation
const setForm=()=>{
  setValue('#name',employeePayrollObj._fullname);
  setSelectedValue('[name=profile]',employeePayrollObj._profilePic);
      setSelectedValue('[name=gender]',employeePayrollObj._gender);
      setSelectedValue('[name=department]',employeePayrollObj._dept);
      setValue('#salary',employeePayrollObj._salary);
      setValue('#notes',employeePayrollObj._notes);
      let date= stringifyDate(employeePayrollObj._startDate).split(" ");
      setValue('#day',date[0]);
      setValue('#month',date[1]);
      setValue('#year',date[2]);
}