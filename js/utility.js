const stringifyDate = (date)=>{
    const option = { year: "numeric", month: "long", day: "numeric" };
    const newDate = !date?"undefined":new Date(Date.parse(date)).toLocaleDateString('en-GB',option);
    return newDate;
}
const checkName = (name)=>{
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}([\\s]{0,1}[A-Za-z]{1,})*$");
    if(!nameRegex.test(name))throw 'Invalid Name';
  }
  const checkStartDate = (startDate)=>{
    if (startDate > new Date()) throw "Start Date is a future date";
        var diff = Math.abs(new Date().getTime() - startDate.getTime());
        if (diff / (1000 * 60 * 60 * 24) > 30) throw "Start Date is Beyond 30 days";
  
  }