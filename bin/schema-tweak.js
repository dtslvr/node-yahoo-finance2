#!/usr/bin/env node

const fs = require("fs");
const schemaWalker = require("oas-schema-walker");

const chunks = [];
process.stdin.on("readable", () => {
  let chunk;
  while (null !== (chunk = process.stdin.read())) chunks.push(chunk);
});

process.stdin.on("end", () => {
  const _schema = JSON.parse(chunks.join(""));
  const schema = {
    $schema: _schema.$schema,
    $comment:
      "DO NOT EDIT THIS FILE.  It is generated automatically " +
      "from typescript interfaces in the project.  To update, run " +
      "`yarn schema`.",
    ..._schema,
  };

  function callback(schema, parent, state) {
    if (schema.$ref === "#/definitions/TwoNumberRange") {
      const key = state.property.split("/").pop();
      parent.properties[key] = { yahooFinanceType: "TwoNumberRange" };
    } else if (schema.$ref === "#/definitions/DateInMs") {
      const key = state.property.split("/").pop();
      parent.properties[key] = { yahooFinanceType: "DateInMs" };
    } else if (Array.isArray(schema.type)) {
      if (
        schema.type.length === 2 &&
        schema.type.includes("number") &&
        schema.type.includes("null")
      ) {
        delete schema.type;
        schema.yahooFinanceType = "number|null";
      }
    } else if (schema.type === "number") {
      delete schema.type;
      schema.yahooFinanceType = "number";
    } else if (schema.type === "string" && schema.format === "date-time") {
      delete schema.format;
      delete schema.type;
      schema.yahooFinanceType = "date";
    }
  }

  for (let key of Object.keys(schema.definitions))
    schemaWalker.walkSchema(schema.definitions[key], {}, {}, callback);

  process.stdout.end(JSON.stringify(schema, null, 2) + "\n");
});
