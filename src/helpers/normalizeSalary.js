const normalizeSalary = (value, previousValue) => {
    if (!value) {
      return value
    }
    var onlyNums = value.replace(/[^\d]/g, '')
    onlyNums=onlyNums.toString();
    var lastThree = onlyNums.substring(onlyNums.length-3);
    var otherNumbers = onlyNums.substring(0,onlyNums.length-3);
    if(otherNumbers !== '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res
  }
  
  export default normalizeSalary;
  