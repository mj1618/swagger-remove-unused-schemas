const assert = require('assert');

const flatten = require("../src/flatten").default;
const fs = require('fs');

const file = fs.readFileSync(__dirname+"/petstore.test.yaml", 'utf8')

const resultObject = flatten(file);
const resultYaml = resultObject.resultYaml;
delete resultObject["resultYaml"];
console.log(resultObject);

assert(resultObject.removedSchemas.indexOf("Customer")!==-1, "did not remove customer")
assert(resultObject.removedSchemas.indexOf("Address")!==-1, "did not remove address")
assert(resultObject.originalSchemaLength===8, "original schema length is not 8")
assert(resultObject.newSchemaLength===6, "new schema length is not 6")

console.log("All tests passed");