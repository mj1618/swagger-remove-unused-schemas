# Swagger Remove Unused Schemas

A simple script to remove any Schemas not referenced by Paths from a swagger yaml file.

## Usage

```bash
npm install
node src/index.js {your_swagger.yaml} > {your_result.yaml}
```

## Test

```bash
node test/petstore.test.yaml
```