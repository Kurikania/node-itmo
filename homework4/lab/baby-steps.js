
let arr = process.argv.slice(2).map(element => parseInt(element)).reduce(function(previousValue, currentValue) {
    return previousValue + currentValue;
  });

console.log(arr)