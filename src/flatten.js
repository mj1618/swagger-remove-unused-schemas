const YAML = require('yaml')
exports.default = (yamlString) => {
    const yaml = YAML.parse(yamlString);

    const returnObject ={
        originalSchemaLength: Object.keys(yaml.components.schemas).length,
        newSchemaLength: null,
        removedSchemas:[],
        resultYaml: "",
    };

    // console.error("schema lengtxh: "+);

    const include = {};
    const q = [];

    // find all refs in paths
    for(const path of Object.keys(yaml.paths)) {
        allDescendants(yaml.paths[path], node => {
            if(node.hasOwnProperty('$ref')){
                const key = node['$ref'].split("#/components/schemas/")[1];
                include[key] = true;
                q.push(key);
            }
        });
    }

    function allDescendants (node, fn) {
        if(typeof node !== "object") {
            return;
        }
        for (const key of Object.keys(node)) {
            const child = node[key];
            allDescendants(child, fn);
            fn(child);
        }
    }

    // find all refs descendant from paths
    while(q.length > 0) {
        allDescendants(yaml.components.schemas[q.pop()], node => {
            // console.log(node)
            if(node.hasOwnProperty('$ref')){
                const key = node['$ref'].split("#/components/schemas/")[1];
                include[key] = true;
                q.push(key);
            }
        });
    }

    const dontInclude = {};

    // find all refs not descendant from paths
    for(const key of Object.keys(yaml.components.schemas)) {
        if(include[key]===true){}
        else {
            dontInclude[key] = true;
        }
    }

    // remove unused schemas
    for(const key of Object.keys(dontInclude)) {
        returnObject.removedSchemas.push(key);
        delete yaml.components.schemas[key];
    }

    returnObject.newSchemaLength = Object.keys(yaml.components.schemas).length;

    returnObject.resultYaml = YAML.stringify(yaml);

    return returnObject;
}