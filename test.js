const Err = require("./index").HttpError;

const test = new Err("internal", "This is an internal error without details");
console.log(test.toJSON());
