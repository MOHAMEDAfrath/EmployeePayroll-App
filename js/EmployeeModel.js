// EmployeePayroll Data Model
class EmployeePayrollData {
    // Added properties like gender,prfoile pic,notes,department
    get id(){
        return this._id;
    }
    set id(value){
        this._id=value;
    }
    get Empname() {
      return this._name;
    }
    //Validation for name using regex
    set Empname(value) {
      let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}([\\s]{0,1}[A-Za-z]{1,})*$");
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