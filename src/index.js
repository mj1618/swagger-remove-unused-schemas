
const flatten = require("./flatten").default;
const fs = require('fs');

if(process.argv.length < 3){
    console.error("First cli argument should be the swagger yaml file");
    process.exit(1);
}

const file = fs.readFileSync(process.argv[2], 'utf8')

const resultObject = flatten(file);
const resultYaml = resultObject.resultYaml;
delete resultObject["resultYaml"];
console.error(resultObject);

console.log(resultYaml);