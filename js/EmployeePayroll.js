// EmployeePayroll Data Model
class EmployeePayrollData {

    get Empname(){
        return this._name;
    }
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
    toString(){
        const option = {year:'numeric', month:'long', day:'numeric'};
        const empDate = this.startDate?"undefined":this.startDate.toLocaleDateString("en-US",option);
        return "Empname = "+this.Empname+" Profile Pic: "+this.profilePic+" Salary: "+this.salary+
        " startDate: "+this.startDate;
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



