// EmployeePayroll Data Model
class EmployeePayrollData {
    // Added properties like gender,prfoile pic,notes,department
    get Empname(){
        return this._name;
    }
    //Validation for name using regex
    set Empname(value){
        let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
        if(nameRegex.test(value)){
        this._name=value;
        }else{
            throw "Invalid Name";
        }
    }
    get profilePic(){
        return this._profilePic;
    }
    set profilePic(value){
        this._profilePic=value;
    }
    get salary(){
        return this._salary;
    }
    set salary(value){
        this._salary=value;
    }
    get startDate(){
        return this._startDate;
    }
    set startDate(value){
        this._startDate=value;
    }
    get Gender(){
        return this._gender;
    }
    set Gender(value){
        this._gender= value;
    }
    get EmployeeNotes(){
        return this._notes;
    }
    set EmployeeNotes(values){
        this._notes=value;
        
    }
    get Department(){
        return this._dept;
    }
    set Department(value){
        this._dept=value;
    } 
    toString(){
        const option = {year:'numeric', month:'long', day:'numeric'};
        const empDate = this.startDate?"undefined":this.startDate.toLocaleDateString("en-US",option);
        return "Empname = "+this.Empname+" Gender: "+this.Gender+" Profile Pic: "+this.profilePic+" Department: "+this.Department+" Salary: "+this.salary+
        " startDate: "+this.startDate+" Note: "+this.EmployeeNotes;
    }
}
//onSubmit validates
const onSubmit=()=>{
    let employee = new EmployeePayrollData();
    try{
    employee.Empname= document.getElementById("name").value;
    employee.profilePic=getSelectedValues('[name = profile]').pop();
    employee.salary = document.getElementById("salary").value;
    employee.startDate=document.getElementById("day").value+" "+document.getElementById("month").value+" "+document.getElementById("year").value;
    alert(employee.toString());
        
}catch(e){
        alert(e);
        console.log(employee.Empname);
    }
   
};
//selects value for radio buttons
const getSelectedValues = (values)=>{
    let items = document.querySelectorAll(values);
    let selectedItem = [];
    items.forEach(item=>{
        if(item.checked)
        selectedItem.push(item.value);
    });
    return selectedItem;
}



