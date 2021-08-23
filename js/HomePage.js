window.addEventListener("DOMContentLoaded", (event) => {
  createInnerHtml();
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
