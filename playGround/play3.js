// var object = {id: 23, user: "John Doe"};
// var propertyName = "LastName";
// var value = "Burns";
// console.log(copyAndAppendComputed(object, propertyName, value));

// function copyAndAppendComputed(object, propertyName, value) {
  
//     return {...object,[propertyName]: value};
// }

var obj = {street: "Doty St.",city: "Farmersville",state: "Kuntucky",zip: "68759"};
var address = ({
    street,
    city,
    state,
    zip
}) => `${street}, ${city}, ${state} ${zip}`;

console.log(address(obj));