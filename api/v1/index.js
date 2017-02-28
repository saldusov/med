const express = require("express");
let app = module.exports = express();

let usersRouting = require("./users");
let servicesRouting = require("./services");
let personsRouting = require("./persons");

app.use("/users", usersRouting);
app.use("/services", servicesRouting);
app.use("/persons", personsRouting);