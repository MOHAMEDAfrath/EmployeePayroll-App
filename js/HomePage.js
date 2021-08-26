let empList;
window.addEventListener("DOMContentLoaded", (event) => {
  //createInnerHtml();
  if(site_properties.use_local.match("true"))
  getEmployeePayrollFromLocalStorage();
  else
  getEmployeePayrollFromServer();
  
});

//UC 18  Ability to view Employee Payroll details in a Tabular Format from JS File using Template Literals.
const createInnerHtml = () => {
  const CreateHeaderhtml =
    "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
  const innerHTML = `${CreateHeaderhtml} 
    <tr>
              <td><img src="../assets/profile-images/Ellipse -1.png" alt="" class="profile"></td>
              <td>RamKumar</td>
              <td>Male</td>
              <td><div class="dept-label">HR</div>
                <div class="dept-label">Finance</div></td>
                <td>300000</td>
              <td>1 Nov 2019</td>
              <td>
                <img src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon">
                <img src="../assets/icons/create-black-18dp.svg" alt="create" id="icon">  
              </td>
            </tr>
            <tr>
              <td><img src="../assets/profile-images/Ellipse -2.png" alt="" class="profile"></td>
              <td>Dhanush</td>
              <td>Male</td>
              <td><div class="dept-label">Engineer</div>
                <div class="dept-label">Sales</div></td>
                <td>450000</td>
              <td>1 Dec 2019</td>
              <td>
                <img src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon">
                <img src="../assets/icons/create-black-18dp.svg" alt="create" id="icon">  
              </td>
            </tr>
    `;
  document.querySelector("#display-table").innerHTML = innerHTML;
};
const processResponse = () =>{
  document.querySelector(".emp-count").textContent = empList.length;
  createInnerHtmlUsingJSON();
  localStorage.removeItem('editEmp');
}
//UC-20 gets from local storage
const getEmployeePayrollFromLocalStorage=()=>
{
    empList = localStorage.getItem("EmployeePayrollList") ? JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
    processResponse();

}
//UC25_promise call to perform get operation
const getEmployeePayrollFromServer=()=>{
    makePromiseCall("GET",site_properties.server_url,true).
    then(responseText=>{
      empList = JSON.parse(responseText);
      processResponse();
    }).catch(error=>{
      console.log("Get error Status: "+JSON.stringify(error));
      empList=[];
      processResponse();
    })
}
// UC19 Populate using JSON Object
const createInnerHtmlUsingJSON = () => {
    const CreateHeaderhtml =
      "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
      if(empList.length == 0)return;
      let innerHTML = `${CreateHeaderhtml}`;
      empList.forEach(items=>{
          innerHTML = `${innerHTML} 
      <tr>
                <td><img src="${items._profilePic}" alt="" class="profile"></td>
                <td>${items._fullname}</td>
                <td>${items._gender}</td>
                <td>${getDeptHtml(items._dept)}</td>
                  <td>${items._salary}</td>
                <td>${stringifyDate(items._startDate)}</td>
                <td>
                  <img id="${items.id}" src="../assets/icons/delete-black-18dp.svg" alt="delete" id="icon" onclick="remove(this)">
                  <img id="${items.id}" src="../assets/icons/create-black-18dp.svg" alt="create" id="icon" onclick="update(this)">  
                </td>
              </tr>
              
      `;
      });
    document.querySelector("#display-table").innerHTML = innerHTML;
  };
  //Returns a list of JSON Object
const createEmployeePayrollJSON = () => {
    let empPayrollList = [
        {
            _name: 'RamKumar',
            _gender: 'Male',
            _department: ['HR','Sales'],
            _salary: 400000,
            _startDate: '21 Dec 2020',
            _note: '',
            id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -2.png'
        },
        {
            _name: 'Dhanush',
            _gender: 'Male',
            _department: ['Engineering', 'Sales'],
            _salary:350000,
            _startDate: '10 Aug 2021',
            _note: '',
            id: new Date().getTime()+1,
            _profilePic: '../assets/profile-images/Ellipse -3.png'
        }
    ];
    return empPayrollList;
}
//Iterates the dept to populate dept column 
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}
// removes the element once a click is made on the delete icon
const remove= (node) =>
{
  let employeePayrollData=empList.find(empData => empData.id == node.id);
  if(!employeePayrollData) return ;
  const index= empList.map(empData => empData._fullname)
  .indexOf(employeePayrollData._fullname);
  empList.splice(index,1);
  localStorage.setItem("EmployeePayrollList",JSON.stringify(empList));
  document.querySelector(".emp-count").textContent=empList.length;
  createInnerHtmlUsingJSON();
}
const update=(node)=>{
  let empPayrollData = empList.find(empData=>empData.id==node.id);
  if(!empPayrollData)return;
  localStorage.setItem('editEmp',JSON.stringify(empPayrollData));
  window.location.replace(site_properties.add_page);
}
